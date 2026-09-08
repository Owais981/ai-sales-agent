#!/usr/bin/env python3
"""Post-deploy verification for novulabs.net. Run against the LIVE site.

    python scripts/verify-deploy.py                      # https://www.novulabs.net
    python scripts/verify-deploy.py --base http://localhost:3100
    python scripts/verify-deploy.py --json out.json

Checks, in the order they matter:

  1 apex redirect      novulabs.net must 301 to www. A 200 means the entire site
                       is duplicated on the apex domain (CLIENT-ACTIONS.md item 2).
  2 route health       every route in the sitemap returns 200
  3 sitemap integrity  sitemap URLs resolve and match the indexable set
  4 robots / llms.txt  both serve, robots does not block the site
  5 404 behaviour      an unknown path actually returns 404, not 200
  6 canonical sanity   no page canonicalises to a different page's URL
  7 security headers   HSTS, X-Content-Type-Options, Referrer-Policy

Exit code is the number of failed checks, so this is CI-safe.
"""
import argparse, json, re, sys, urllib.error, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor

UA = "Mozilla/5.0 (compatible; novulabs-deploy-check/1.0)"
DEFAULT_BASE = "https://www.novulabs.net"

results = []


def check(name, ok, detail=""):
    results.append({"check": name, "ok": bool(ok), "detail": str(detail)[:300]})
    print("  [%s] %-38s %s" % ("PASS" if ok else "FAIL", name, str(detail)[:90]))
    return ok


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None


def fetch(url, follow=True, timeout=25):
    """Return (status, headers, body). Never raises on HTTP status."""
    op = urllib.request.build_opener(*( [] if follow else [NoRedirect] ))
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with op.open(req, timeout=timeout) as r:
            return r.status, dict(r.headers), r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        try:
            body = e.read().decode("utf-8", "replace")
        except Exception:
            body = ""
        return e.code, dict(e.headers or {}), body
    except Exception as e:
        return 0, {}, str(e)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default=DEFAULT_BASE)
    ap.add_argument("--json")
    ap.add_argument("--skip-apex", action="store_true",
                    help="skip the apex check (use for localhost)")
    a = ap.parse_args()
    base = a.base.rstrip("/")
    local = "localhost" in base or "127.0.0.1" in base
    parts = urllib.parse.urlparse(base)

    print("\nPost-deploy verification: %s\n" % base)

    # 1 -------------------------------------------------------------- apex
    print("apex redirect")
    if a.skip_apex or local:
        print("  [SKIP] localhost or --skip-apex")
    else:
        apex = "%s://%s" % (parts.scheme, parts.netloc.replace("www.", ""))
        st, hd, _ = fetch(apex + "/", follow=False)
        loc = hd.get("Location", hd.get("location", ""))
        check("apex returns 301/308", st in (301, 308),
              "got %s%s" % (st, " -> " + loc if loc else ""))
        check("apex redirects to www", "www." in loc, loc or "no Location header")

    # 2/3 ------------------------------------------------------- sitemap
    print("\nsitemap and routes")
    st, _, body = fetch(base + "/sitemap.xml")
    check("sitemap.xml serves 200", st == 200, "status %s" % st)
    urls = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", body) if st == 200 else []
    check("sitemap lists URLs", len(urls) > 0, "%d URLs" % len(urls))

    paths = []
    for u in urls:
        p = urllib.parse.urlparse(u).path or "/"
        if p not in paths:
            paths.append(p)
    if not paths:
        paths = ["/", "/about", "/services", "/solutions", "/portfolio", "/contact", "/blog"]

    def probe(p):
        st, hd, _ = fetch(base + p, follow=False)
        return p, st, hd.get("Location", hd.get("location", ""))

    with ThreadPoolExecutor(max_workers=8) as ex:
        probed = list(ex.map(probe, paths))

    bad = [(p, s, l) for p, s, l in probed if s != 200]
    check("every sitemap route returns 200", not bad,
          "; ".join("%s=%s%s" % (p, s, "->" + l if l else "") for p, s, l in bad[:5])
          or "%d routes" % len(probed))

    # 4 ------------------------------------------------------------ robots
    print("\nrobots and llms.txt")
    st, _, robots = fetch(base + "/robots.txt")
    check("robots.txt serves 200", st == 200, "status %s" % st)
    if st == 200:
        blocks_all = re.search(r"^\s*Disallow:\s*/\s*$", robots, re.M | re.I)
        check("robots.txt does not block the site", not blocks_all,
              "found blanket 'Disallow: /'" if blocks_all else "ok")
        check("robots.txt references sitemap", "sitemap" in robots.lower(),
              "no Sitemap: line" if "sitemap" not in robots.lower() else "ok")
    st, _, _ = fetch(base + "/llms.txt")
    check("llms.txt serves 200", st == 200, "status %s" % st)

    # 5 --------------------------------------------------------------- 404
    print("\n404 behaviour")
    st, _, _ = fetch(base + "/this-route-does-not-exist-" + "x" * 12, follow=False)
    check("unknown path returns 404", st == 404, "got %s" % st)

    # 6 --------------------------------------------------------- canonicals
    print("\ncanonical sanity")
    sample = paths[:12]

    def canon(p):
        st, _, html = fetch(base + p)
        m = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]*>', html, re.I)
        href = ""
        if m:
            h = re.search(r'href=["\']([^"\']+)', m.group(0))
            href = h.group(1) if h else ""
        return p, href

    with ThreadPoolExecutor(max_workers=6) as ex:
        canons = list(ex.map(canon, sample))

    missing = [p for p, h in canons if not h]
    check("every sampled page has a canonical", not missing, ", ".join(missing[:5]))

    mismatched = []
    for p, h in canons:
        if not h:
            continue
        cp = urllib.parse.urlparse(h).path.rstrip("/") or "/"
        if cp != (p.rstrip("/") or "/"):
            mismatched.append("%s -> %s" % (p, cp))
    check("no page canonicalises elsewhere", not mismatched, "; ".join(mismatched[:5]))

    seen = {}
    for p, h in canons:
        if h:
            seen.setdefault(h, []).append(p)
    dupes = {h: ps for h, ps in seen.items() if len(ps) > 1}
    check("no shared canonical targets", not dupes,
          "; ".join("%s <- %s" % (h, ps) for h, ps in list(dupes.items())[:3]))

    # 7 --------------------------------------------------- security headers
    print("\nsecurity headers")
    st, hd, _ = fetch(base + "/")
    low = {k.lower(): v for k, v in hd.items()}
    if not local:
        check("Strict-Transport-Security present", "strict-transport-security" in low,
              low.get("strict-transport-security", "missing"))
    check("X-Content-Type-Options: nosniff",
          low.get("x-content-type-options", "").lower() == "nosniff",
          low.get("x-content-type-options", "missing"))
    check("Referrer-Policy present", "referrer-policy" in low,
          low.get("referrer-policy", "missing"))

    # ------------------------------------------------------------- summary
    failed = [r for r in results if not r["ok"]]
    print("\n%d/%d checks passed" % (len(results) - len(failed), len(results)))
    if failed:
        print("\nFailures:")
        for f in failed:
            print("  - %s: %s" % (f["check"], f["detail"]))

    if a.json:
        json.dump({"base": base, "passed": len(results) - len(failed),
                   "total": len(results), "results": results},
                  open(a.json, "w", encoding="utf-8"), indent=2)
        print("\nwrote %s" % a.json)

    return len(failed)


if __name__ == "__main__":
    sys.exit(main())

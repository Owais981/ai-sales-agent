#!/usr/bin/env python3
"""Verify every claim in PR-BODY-SEO-CHANGELOG.md against the BUILT output.

Reads .next/server/app/**/*.html — the prerendered HTML actually served — not
the source. Run `npx next build` first.

    python scripts/verify-seo-claims.py
"""
import json, os, re, sys
from collections import Counter, defaultdict
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = os.path.join(ROOT, ".next", "server", "app")
SITE = "novulabs.net"


class Doc(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title, self._t, self._svg = None, False, 0
        self.canonical, self.robots = "", ""
        self.headings, self._h, self._htxt = [], None, []
        self.imgs, self.hrefs, self.jsonld = [], [], []
        self._ld, self._inld = [], False

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "svg":
            self._svg += 1
        elif tag == "title":
            if not self._svg and self.title is None:
                self._t = True
        elif tag == "script" and (d.get("type") or "").lower() == "application/ld+json":
            self._inld, self._ld = True, []
        elif tag == "link" and "canonical" in (d.get("rel") or ""):
            self.canonical = d.get("href", "")
        elif tag == "meta" and (d.get("name") or "").lower() == "robots":
            self.robots = d.get("content", "")
        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self._h, self._htxt = int(tag[1]), []
        elif tag == "img":
            self.imgs.append(d.get("alt"))
        elif tag == "a":
            self.hrefs.append(d.get("href", ""))

    def handle_endtag(self, tag):
        if tag == "svg":
            self._svg = max(0, self._svg - 1)
        elif tag == "title":
            self._t = False
        elif tag == "script" and self._inld:
            self._inld = False
            try:
                self.jsonld.append(json.loads("".join(self._ld)))
            except Exception:
                pass
        elif tag and tag[0] == "h" and tag[1:].isdigit() and self._h:
            self.headings.append((self._h, " ".join("".join(self._htxt).split())))
            self._h = None

    def handle_data(self, data):
        if self._inld:
            self._ld.append(data); return
        if self._t:
            self.title = (self.title or "") + data
        if self._h:
            self._htxt.append(data)


def ld_types(obj, out):
    if isinstance(obj, dict):
        t = obj.get("@type")
        if isinstance(t, list):
            out.extend(map(str, t))
        elif t:
            out.append(str(t))
        for v in obj.values():
            ld_types(v, out)
    elif isinstance(obj, list):
        for v in obj:
            ld_types(v, out)
    return out


def route_of(path):
    r = os.path.relpath(path, BUILD).replace("\\", "/")[:-5]
    return "/" if r == "index" else "/" + r


def main():
    if not os.path.isdir(BUILD):
        sys.exit("no build output at %s — run `npx next build` first" % BUILD)

    docs = {}
    for dirpath, _, files in os.walk(BUILD):
        for f in files:
            if f.endswith(".html"):
                p = os.path.join(dirpath, f)
                d = Doc()
                try:
                    d.feed(open(p, encoding="utf-8", errors="replace").read())
                except Exception as e:
                    print("  ! parse failed %s: %s" % (p, e))
                    continue
                docs[route_of(p)] = d

    results = []

    def check(label, claimed, actual, ok, detail=""):
        results.append((label, claimed, actual, ok, detail))

    # This was pinned to the literal 33 from the original PR body, so it went
    # red every time a page was added — reporting growth as a regression. The
    # invariant worth checking is not a count, it is that /_not-found is the
    # ONLY route carrying noindex: any other noindex route means a real page
    # was accidentally de-indexed.
    indexable = {r: d for r, d in docs.items() if "noindex" not in (d.robots or "").lower()}
    noindexed = sorted(set(docs) - set(indexable))
    check("Only /_not-found is noindex", "['/_not-found']", str(noindexed),
          noindexed == ["/_not-found"],
          "%d indexable routes" % len(indexable))

    blog = {r: d for r, d in docs.items() if r.startswith("/blog/")}
    bad_canon = [r for r, d in blog.items()
                 if d.canonical and d.canonical.rstrip("/").endswith(SITE)]
    check("Blog posts canonicalising to homepage", "0", str(len(bad_canon)),
          not bad_canon, "of %d posts; %s" % (len(blog), bad_canon or "none"))

    titles = {r: " ".join((d.title or "").split()) for r, d in indexable.items()}
    long_t = {r: len(t) for r, t in titles.items() if len(t) > 60}
    check("Titles over 60 chars", "0", str(len(long_t)), not long_t,
          "; ".join("%s=%d" % (r, n) for r, n in sorted(long_t.items(), key=lambda x: -x[1])[:6]))

    dupe_suffix = [r for r, t in titles.items() if t.count("| NovuLabs") > 1]
    check("Duplicate '| NovuLabs' suffixes", "0", str(len(dupe_suffix)), not dupe_suffix,
          ", ".join(dupe_suffix[:5]))

    tc = Counter(t for t in titles.values() if t)
    dupes = {t: n for t, n in tc.items() if n > 1}
    check("Duplicate titles across site", "0", str(len(dupes)), not dupes,
          "; ".join("%dx %s" % (n, t[:50]) for t, n in list(dupes.items())[:4]))

    dead = sum(h.count("#") for d in docs.values() for h in d.hrefs if h.strip() == "#")
    dead_pages = [r for r, d in docs.items() if any(h.strip() == "#" for h in d.hrefs)]
    check("Dead href='#' links", "0", str(dead), not dead, ", ".join(dead_pages[:5]))

    routes = set(docs)
    broken = defaultdict(list)
    for r, d in docs.items():
        for h in d.hrefs:
            if not h or h.startswith(("http://", "https://", "#", "mailto:", "tel:")):
                continue
            tgt = h.split("#")[0].split("?")[0].rstrip("/") or "/"
            if tgt.startswith("/") and tgt not in routes and tgt + "/index" not in routes:
                if not re.search(r"\.(xml|txt|ico|png|jpg|svg|webp|pdf)$", tgt):
                    broken[tgt].append(r)
    check("Broken internal links", "0", str(len(broken)), not broken,
          "; ".join("%s (from %s)" % (t, p[0]) for t, p in list(broken.items())[:5]))

    skips = {}
    for r, d in docs.items():
        lv = [l for l, _ in d.headings]
        for a, b in zip(lv, lv[1:]):
            if b > a + 1:
                skips.setdefault(r, []).append("H%d->H%d" % (a, b))
    check("Heading-level skips", "0", str(len(skips)), not skips,
          "; ".join("%s %s" % (r, v[:2]) for r, v in list(skips.items())[:5]))

    multi_h1 = {r: sum(1 for l, _ in d.headings if l == 1) for r, d in docs.items()}
    bad_h1 = {r: n for r, n in multi_h1.items() if n > 1}
    no_h1 = [r for r, n in multi_h1.items() if n == 0]
    check("Pages with more than one H1", "0", str(len(bad_h1)), not bad_h1,
          "; ".join("%s=%d" % (r, n) for r, n in list(bad_h1.items())[:5]))
    check("Pages with no H1", "0", str(len(no_h1)), not no_h1, ", ".join(no_h1[:5]))

    total_img = sum(len(d.imgs) for d in docs.values())
    no_alt = sum(1 for d in docs.values() for a in d.imgs if a is None)
    check("<img> without alt", "0 of 129", "%d of %d" % (no_alt, total_img), no_alt == 0)

    all_types = set()
    for d in docs.values():
        for b in d.jsonld:
            all_types.update(ld_types(b, []))
    check("Structured data types", "11", str(len(all_types)), len(all_types) >= 11,
          ", ".join(sorted(all_types)))

    ext = defaultdict(int)
    for r, d in docs.items():
        for h in d.hrefs:
            m = re.match(r"https?://([^/]+)", h or "")
            if m and SITE not in m.group(1):
                ext[m.group(1)] += 1

    w = max(len(x[0]) for x in results) + 2
    print("\nVerifying PR-BODY-SEO-CHANGELOG.md claims against .next/server/app")
    print("%d prerendered routes parsed\n" % len(docs))
    print("%-*s %-12s %-14s %s" % (w, "CLAIM", "CLAIMED", "ACTUAL", ""))
    print("-" * (w + 40))
    passed = 0
    for label, claimed, actual, ok, detail in results:
        print("%-*s %-12s %-14s %s" % (w, label, claimed, actual, "PASS" if ok else "FAIL"))
        if detail and not ok:
            print("%-*s   %s" % (w, "", detail[:150]))
        passed += bool(ok)
    print("\n%d/%d claims reproduce" % (passed, len(results)))
    if ext:
        print("\nExternal link hosts referenced:")
        for h, n in sorted(ext.items(), key=lambda x: -x[1])[:10]:
            print("  %-40s %d" % (h, n))
    return 0 if passed == len(results) else 1


if __name__ == "__main__":
    sys.exit(main())

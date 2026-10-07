import logging
import os
from pathlib import Path
from urllib.parse import urlsplit

from django.core.exceptions import ImproperlyConfigured
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


class RedactSecretsFilter(logging.Filter):
    """Best-effort filter so secrets never make it into log output, even if a
    caller accidentally interpolates a settings object or dict containing one.
    """

    _REDACT_KEYS = ("access_token", "api_key", "password", "secret", "token", "authorization")

    def filter(self, record: logging.LogRecord) -> bool:
        msg = record.getMessage()
        lowered = msg.lower()
        if any(key in lowered for key in self._REDACT_KEYS) and ("=" in msg or ":" in msg):
            record.msg = "[log message redacted: potential secret content]"
            record.args = ()
        return True


def _env_bool(name: str, default: bool) -> bool:
    value = os.environ.get(name)
    return default if value is None else value.strip().lower() in ("1", "true", "yes")


def _database_config(url: str) -> dict:
    parts = urlsplit(url)
    scheme = parts.scheme.split("+")[0]  # sqlite+aiosqlite -> sqlite, postgresql+asyncpg -> postgresql

    if scheme == "sqlite":
        db_path = parts.path.lstrip("/")
        name = ":memory:" if db_path in ("", ":memory:") else str(BASE_DIR / db_path)
        return {"ENGINE": "django.db.backends.sqlite3", "NAME": name}

    if scheme in ("postgres", "postgresql"):
        return {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": parts.path.lstrip("/"),
            "USER": parts.username or "",
            "PASSWORD": parts.password or "",
            "HOST": parts.hostname or "",
            "PORT": str(parts.port or ""),
        }

    raise ValueError(f"Unsupported DATABASE_URL scheme: {scheme!r}")


# ---- App ----
APP_NAME = os.environ.get("APP_NAME", "AI Sales & Lead Agent")
ENVIRONMENT = os.environ.get("ENVIRONMENT", "development")
DEBUG = _env_bool("DEBUG", True)
SECRET_KEY = os.environ.get("SECRET_KEY", "change-me-in-production")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES", 60 * 12))
ALGORITHM = os.environ.get("ALGORITHM", "HS256")
CORS_ORIGINS = [
    o.strip()
    for o in os.environ.get(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3001,http://127.0.0.1:3001",
    ).split(",")
    if o.strip()
]

# Comma-separated in production (e.g. "example.com,www.example.com"); "*" (the
# default, fine for local dev) is deliberately rejected once DEBUG is off -
# Django only enforces ALLOWED_HOSTS to begin with as a Host-header-spoofing
# guard, so leaving it wildcarded in production defeats the point.
_allowed_hosts_env = os.environ.get("ALLOWED_HOSTS", "*")
ALLOWED_HOSTS = [h.strip() for h in _allowed_hosts_env.split(",") if h.strip()]

if not DEBUG and (not ALLOWED_HOSTS or ALLOWED_HOSTS == ["*"]):
    raise ImproperlyConfigured(
        "ALLOWED_HOSTS must be set to your real domain(s) (e.g. ALLOWED_HOSTS=example.com) "
        "when DEBUG=False - wildcarding it in production defeats Django's Host-header check."
    )

# ---- Database ----
DATABASES = {"default": _database_config(os.environ.get("DATABASE_URL", "sqlite:///./dev.db"))}

# ---- WhatsApp Business API (Cloud API) ----
WHATSAPP_ACCESS_TOKEN = os.environ.get("WHATSAPP_ACCESS_TOKEN", "")
WHATSAPP_PHONE_NUMBER_ID = os.environ.get("WHATSAPP_PHONE_NUMBER_ID", "")
WHATSAPP_VERIFY_TOKEN = os.environ.get("WHATSAPP_VERIFY_TOKEN", "verify-me")
WHATSAPP_API_VERSION = os.environ.get("WHATSAPP_API_VERSION", "v21.0")
WHATSAPP_APP_SECRET = os.environ.get("WHATSAPP_APP_SECRET", "")

# ---- Web Push (VAPID) ----
VAPID_PUBLIC_KEY = os.environ.get("VAPID_PUBLIC_KEY", "")
VAPID_PRIVATE_KEY = os.environ.get("VAPID_PRIVATE_KEY", "")
VAPID_CONTACT_EMAIL = os.environ.get("VAPID_CONTACT_EMAIL", "")

# ---- LLM (Google Gemini) ----
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
GEMINI_CHAT_MODEL = os.environ.get("GEMINI_CHAT_MODEL", "gemini-3.6-flash")
GEMINI_EMBEDDING_MODEL = os.environ.get("GEMINI_EMBEDDING_MODEL", "gemini-embedding-001")
EMBEDDING_DIMENSIONS = int(os.environ.get("EMBEDDING_DIMENSIONS", 3072))

# ---- Sales Manager notification ----
SALES_MANAGER_WHATSAPP_NUMBER = os.environ.get("SALES_MANAGER_WHATSAPP_NUMBER", "")
SALES_MANAGER_EMAIL = os.environ.get("SALES_MANAGER_EMAIL", "")
NOTIFICATION_CHANNEL = os.environ.get("NOTIFICATION_CHANNEL", "log")  # log | whatsapp | email

# ---- Website knowledge source ----
WEBSITE_URL = os.environ.get("WEBSITE_URL", "")

# ---- RAG ----
RAG_TOP_K = int(os.environ.get("RAG_TOP_K", 10))
CHUNK_SIZE = int(os.environ.get("CHUNK_SIZE", 800))
CHUNK_OVERLAP = int(os.environ.get("CHUNK_OVERLAP", 120))
CONVERSATION_HISTORY_LIMIT = int(os.environ.get("CONVERSATION_HISTORY_LIMIT", 20))

# ---- First admin/dashboard user (bootstrap only) ----
FIRST_ADMIN_EMAIL = os.environ.get("FIRST_ADMIN_EMAIL", "admin@example.com")
FIRST_ADMIN_PASSWORD = os.environ.get("FIRST_ADMIN_PASSWORD", "change-me-please")

# ---- Django ----
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "app",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {"BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"},
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ---- Production hardening (no-ops under DEBUG=True) ----
# Gunicorn sits behind a reverse proxy (nginx) that terminates TLS and talks
# to it over plain HTTP on the internal network - without this header, Django
# would see every request as insecure and redirect-loop or reject secure
# cookies even when the browser's connection genuinely is HTTPS.
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG
SECURE_SSL_REDIRECT = _env_bool("SECURE_SSL_REDIRECT", not DEBUG)

CORS_ALLOWED_ORIGINS = CORS_ORIGINS
CORS_ALLOW_CREDENTIALS = True

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": ["app.models.JWTAuthentication"],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
    "EXCEPTION_HANDLER": "app.views.custom_exception_handler",
}

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": {
        "redact_secrets": {"()": "config.settings.RedactSecretsFilter"},
    },
    "formatters": {
        "default": {"format": "%(asctime)s | %(levelname)s | %(name)s | %(message)s"},
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "default",
            "filters": ["redact_secrets"],
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "DEBUG" if DEBUG else "INFO",
    },
}

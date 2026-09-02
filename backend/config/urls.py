from django.contrib import admin
from django.urls import include, path

from app.views import health

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/health", health),
    path("api/", include("app.urls")),
]

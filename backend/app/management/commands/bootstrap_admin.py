"""One-time setup: creates the first admin/Sales Manager dashboard user from
FIRST_ADMIN_EMAIL / FIRST_ADMIN_PASSWORD if it doesn't already exist.

Usage: python manage.py bootstrap_admin
"""

import logging

from django.conf import settings
from django.core.management.base import BaseCommand

from app.models import User, hash_password

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Creates the first admin/Sales Manager dashboard user from FIRST_ADMIN_EMAIL/PASSWORD"

    def handle(self, *args, **options):
        if User.objects.filter(email=settings.FIRST_ADMIN_EMAIL).exists():
            logger.info("Admin user %s already exists; skipping", settings.FIRST_ADMIN_EMAIL)
            return

        User.objects.create(
            email=settings.FIRST_ADMIN_EMAIL,
            name="Sales Manager",
            hashed_password=hash_password(settings.FIRST_ADMIN_PASSWORD),
            is_admin=True,
        )
        logger.info("Created first admin user: %s", settings.FIRST_ADMIN_EMAIL)

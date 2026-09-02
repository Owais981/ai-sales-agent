"""Sends Web Push notifications to website-chat visitors who granted
notification permission, so a sales manager's reply can reach them even
after they've closed the tab - the closest browser-native equivalent to
WhatsApp's own push delivery.
"""

import json

from django.conf import settings
from pywebpush import WebPushException, webpush

import logging
from app.models import Customer, PushSubscription

logger = logging.getLogger(__name__)


class PushService:
    @property
    def is_configured(self) -> bool:
        return bool(settings.VAPID_PRIVATE_KEY and settings.VAPID_PUBLIC_KEY)

    def save_subscription(self, customer: Customer, endpoint: str, p256dh: str, auth: str) -> None:
        PushSubscription.objects.update_or_create(
            endpoint=endpoint, defaults={"customer": customer, "p256dh": p256dh, "auth": auth}
        )

    def notify_customer(self, customer: Customer, title: str, body: str) -> None:
        if not self.is_configured:
            return
        for sub in customer.push_subscriptions.all():
            try:
                webpush(
                    subscription_info={
                        "endpoint": sub.endpoint,
                        "keys": {"p256dh": sub.p256dh, "auth": sub.auth},
                    },
                    data=json.dumps({"title": title, "body": body}),
                    vapid_private_key=settings.VAPID_PRIVATE_KEY,
                    vapid_claims={"sub": f"mailto:{settings.VAPID_CONTACT_EMAIL}"},
                )
            except WebPushException as exc:
                # A push failure must never break the manager's reply flow -
                # the message is already saved and visible in the CRM regardless.
                status = exc.response.status_code if exc.response is not None else None
                if status in (404, 410):
                    # Subscription expired or was revoked by the browser - stale, remove it.
                    sub.delete()
                else:
                    logger.error("Push send failed for customer %s: %s", customer.id, exc)
            except Exception as exc:  # noqa: BLE001
                # pywebpush can also raise plain errors (e.g. malformed/corrupted
                # subscription keys failing base64 decoding) before it even gets
                # to building a WebPushException - same rule applies, never break
                # the caller over a bad subscription row.
                logger.error("Unexpected error sending push to customer %s: %s", customer.id, exc)


push_service = PushService()

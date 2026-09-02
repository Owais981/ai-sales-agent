from django.urls import path

from app import views

urlpatterns = [
    path("auth/login", views.login),
    path("auth/me", views.me),
    path("conversations/", views.conversation_list),
    path("conversations/<uuid:conversation_id>", views.conversation_detail),
    path("conversations/<uuid:conversation_id>/takeover", views.conversation_takeover),
    path("conversations/<uuid:conversation_id>/release", views.conversation_release),
    path("conversations/<uuid:conversation_id>/messages", views.conversation_send_message),
    path("dashboard/stats", views.dashboard_stats),
    path("knowledge/", views.knowledge_list),
    path("knowledge/ingest", views.knowledge_ingest),
    path("knowledge/upload", views.knowledge_upload),
    path("knowledge/reindex", views.knowledge_reindex),
    path("knowledge/<uuid:document_id>", views.knowledge_delete),
    path("leads/", views.lead_list),
    path("leads/<uuid:lead_id>", views.lead_detail),
    path("test-chat/<str:session_id>", views.test_chat_get),
    path("test-chat/<str:session_id>/messages", views.test_chat_send_message),
    path("website-chat/push/vapid-public-key", views.vapid_public_key),
    path("website-chat/<str:session_id>", views.website_chat_get),
    path("website-chat/<str:session_id>/messages", views.website_chat_send_message),
    path("website-chat/<str:session_id>/push-subscribe", views.push_subscribe),
    path("whatsapp/webhook", views.whatsapp_webhook),
]

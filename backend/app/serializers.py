from rest_framework import serializers

from app.models import LeadStatus


# ---- Auth ----
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class TokenSerializer(serializers.Serializer):
    access_token = serializers.CharField()
    token_type = serializers.CharField(default="bearer")


class CurrentUserSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    email = serializers.EmailField()
    name = serializers.CharField()
    is_admin = serializers.BooleanField()


# ---- Conversations ----
class CustomerSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    name = serializers.CharField(allow_null=True)
    phone_number = serializers.CharField()
    email = serializers.CharField(allow_null=True)
    captured_phone = serializers.CharField(allow_null=True)


class MessageSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    conversation_id = serializers.UUIDField()
    sender_type = serializers.CharField()
    content = serializers.CharField()
    direction = serializers.CharField()
    external_message_id = serializers.CharField(allow_null=True)
    created_at = serializers.DateTimeField()


class ConversationListItemSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    customer = CustomerSerializer()
    status = serializers.CharField()
    last_message_preview = serializers.CharField(allow_null=True)
    last_message_at = serializers.DateTimeField()
    assigned_sales_manager_id = serializers.UUIDField(allow_null=True)


class ConversationDetailSerializer(ConversationListItemSerializer):
    started_at = serializers.DateTimeField()
    messages = MessageSerializer(many=True)


class SendMessageSerializer(serializers.Serializer):
    content = serializers.CharField()


# ---- Leads ----
class LeadSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    customer = CustomerSerializer()
    conversation_id = serializers.UUIDField()
    interested_in = serializers.CharField()
    summary = serializers.CharField()
    status = serializers.CharField()
    source = serializers.CharField()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()


class LeadUpdateSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=LeadStatus.choices)


# ---- Dashboard ----
class DashboardStatsSerializer(serializers.Serializer):
    total_leads = serializers.IntegerField()
    new_leads = serializers.IntegerField()
    active_conversations = serializers.IntegerField()
    human_handovers = serializers.IntegerField()
    recent_leads = LeadSerializer(many=True)


# ---- Knowledge ----
class IngestSerializer(serializers.Serializer):
    url = serializers.URLField()


class KnowledgeDocumentSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    source_url = serializers.CharField()
    title = serializers.CharField(allow_null=True)
    status = serializers.CharField()
    last_indexed_at = serializers.CharField(allow_null=True)
    error_message = serializers.CharField(allow_null=True)
    chunk_count = serializers.IntegerField(default=0)


class ReindexSerializer(serializers.Serializer):
    document_id = serializers.UUIDField(required=False, allow_null=True)

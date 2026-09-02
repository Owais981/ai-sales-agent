from django.contrib import admin

from app.models import Conversation, Customer, KnowledgeChunk, KnowledgeDocument, Lead, Message, User

admin.site.register(User)
admin.site.register(Customer)
admin.site.register(Conversation)
admin.site.register(Message)
admin.site.register(Lead)
admin.site.register(KnowledgeDocument)
admin.site.register(KnowledgeChunk)

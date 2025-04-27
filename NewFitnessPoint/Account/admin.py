from django.contrib import admin
from . import models

admin.site.site_header= "New Fitness Point GYM"


from django.contrib import admin
from django.db.models.functions import TruncDay
from django.db.models import Count
from django.core.serializers.json import DjangoJSONEncoder
import json

# Register your models here.
class MemberAdmin(admin.ModelAdmin):
    readonly_fields = ('subscription_end_date',)
    def changelist_view(self, request, extra_context=None):
        chart_data = (
            models.Member.objects.annotate(date=TruncDay("joining_date"))
            .values("date")
            .annotate(y=Count("member_id"))
            .order_by("-date")
        )
        subscription_data = (
            models.Member.objects.values("subscription_plan")
            .annotate(count=Count("member_id"))
            .order_by("subscription_plan")
        )
        as_json = json.dumps(list(chart_data), cls=DjangoJSONEncoder)
        subscription_json = json.dumps(list(subscription_data), cls=DjangoJSONEncoder)

        extra_context = extra_context or {
            "chart_data": as_json,
            "subscription_data": subscription_json,
        }

        return super().changelist_view(request, extra_context=extra_context)

admin.site.register(models.Member, MemberAdmin)

@admin.register(models.Owner)
class OwnerAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Allow add only if no Owner exists
        if models.Owner.objects.exists():
            return False
        return True

admin.site.register(models.MemberMedicalDetails)
admin.site.register(models.Trainer)
admin.site.register(models.Gallery)
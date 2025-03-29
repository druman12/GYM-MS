from django.contrib import admin
from . import models
from django.db.models import Count
import json
from django.core.serializers.json import DjangoJSONEncoder


class BatchMembershipAdmin(admin.ModelAdmin):
    change_list_template = "admin/BatchGraphs/change_list.html"

    def changelist_view(self, request, extra_context=None):
        # Prepare batch data for the pie chart
        batch_data = (
            models.BatchMembership.objects.values('batch__name')
            .annotate(member_count=Count('member'))
            .order_by('-member_count')
        )

        # Serialize data for the chart
        batch_chart_data = json.dumps(list(batch_data), cls=DjangoJSONEncoder)

        # Add chart data to context
        extra_context = extra_context or {}
        extra_context["batch_chart_data"] = batch_chart_data

        return super().changelist_view(request, extra_context=extra_context)

admin.site.register(models.BatchMembership, BatchMembershipAdmin)

admin.site.register(models.Batch)

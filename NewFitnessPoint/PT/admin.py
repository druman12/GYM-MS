from django.contrib import admin
from . import models
from django.db.models import Count
import json
from django.core.serializers.json import DjangoJSONEncoder


class PTAdmin(admin.ModelAdmin):
    change_list_template = "admin/PTGraphs/change_list.html"

    def changelist_view(self, request, extra_context=None):
        PT_data = (
            models.Personal_training.objects.values('trainer__name')
            .annotate(member_count=Count('members'))
            .order_by('-member_count')
        )

        PT_chart_data = json.dumps(list(PT_data), cls=DjangoJSONEncoder)

        extra_context = extra_context or {}
        extra_context["PT_chart_data"] = PT_chart_data

        return super().changelist_view(request, extra_context=extra_context)

admin.site.register(models.Personal_training, PTAdmin)
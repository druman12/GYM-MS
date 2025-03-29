from django.contrib import admin
from django.db.models import Count, Q
from django.core.serializers.json import DjangoJSONEncoder
import json
from .models import MemberAttendance, AllMemberAttendance

class AllMemberAttendanceInline(admin.TabularInline):  # or admin.StackedInline
    model = AllMemberAttendance
    extra = 1  # Number of empty forms to display

@admin.register(MemberAttendance)
class MemberAttendanceAdmin(admin.ModelAdmin):
    list_display = ('date',)
    inlines = [AllMemberAttendanceInline]

    change_list_template = "admin/AttendanceGraphs/DayWiseAttendaceGraph/change_list.html"

    def changelist_view(self, request, extra_context=None):
        # Fetch attendance grouped by date
        datewise_attendance = (
            AllMemberAttendance.objects.values('date__date')  # Correct relation to MemberAttendance.date
            .annotate(
                present_count=Count('attendance', filter=Q(attendance='present')),
                absent_count=Count('attendance', filter=Q(attendance='absent'))
            )
            .order_by('date__date')
        )

        # Serialize the attendance data for the chart
        attendance_chart_data = json.dumps(list(datewise_attendance), cls=DjangoJSONEncoder)

        # Add the chart data to the context
        extra_context = extra_context or {}
        extra_context["datewise_chart_data"] = attendance_chart_data

        return super().changelist_view(request, extra_context=extra_context)



class AllMemberAttendanceAdmin(admin.ModelAdmin):
    list_display = ('date', 'member','trainer' , 'attendance')
    list_filter = ('attendance', 'date', 'member')

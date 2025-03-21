from django.contrib import admin
from .models import MemberAttendance, AllMemberAttendance

class AllMemberAttendanceInline(admin.TabularInline):  # or admin.StackedInline
    model = AllMemberAttendance
    extra = 1  # Number of empty forms to display

@admin.register(MemberAttendance)
class MemberAttendanceAdmin(admin.ModelAdmin):
    list_display = ('date',)
    inlines = [AllMemberAttendanceInline]


class AllMemberAttendanceAdmin(admin.ModelAdmin):
    list_display = ('date', 'member','trainer' , 'attendance')
    list_filter = ('attendance', 'date', 'member')

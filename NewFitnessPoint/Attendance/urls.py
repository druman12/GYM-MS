from django.urls import path
from . import views

urlpatterns = [
    path('<int:member_id>/', views.get_member_attendance, name='member-attendance'),
    path('make/', views.mark_member_attendance, name='mark-member-attendance'),
]
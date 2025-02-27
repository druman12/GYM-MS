from django.urls import path
from . import views

urlpatterns = [
    path('<int:member_id>/', views.get_member_attendance, name='member-attendance'),
]
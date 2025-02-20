from django.urls import path
from . import views

urlpatterns = [
    path('<int:trainer_id>/',views.get_trainer_members , name='pt details'),
]
from django.urls import path
from . import views

urlpatterns = [
    path('trainer/<int:trainer_id>/', views.trainer_batches, name='trainer-batches'),
]
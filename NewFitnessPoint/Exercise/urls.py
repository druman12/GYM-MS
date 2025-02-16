from django.urls import path
from . import views

urlpatterns = [
    path('member/<int:member_id>/workoutplan/', views.get_member_workout_plans, name='member-workout-plans'),
    path('member/<int:member_id>/workoutplan/<int:workout_plan_id>/day/<int:day>/',views.get_member_day_exercises,  name='member-day-exercises'),
    # path('workout-plans/<int:workout_plan_id>/focus-areas/', views.get_workout_focus_areas, name='workout-focus-areas'),
]
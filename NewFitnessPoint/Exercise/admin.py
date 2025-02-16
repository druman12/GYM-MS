from django.contrib import admin
from .models import Exercise, WorkoutPlan, WorkoutExercise
from Account.models import Member

@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ("exercise_name", "description")
    search_fields = ("exercise_name",)

class WorkoutExerciseInline(admin.TabularInline):
    model = WorkoutExercise
    extra = 1  # Allows adding multiple exercises per day in the admin panel

@admin.register(WorkoutPlan)
class WorkoutPlanAdmin(admin.ModelAdmin):
    list_display = ("member", "title")
    search_fields = ("title", "member__name")
    list_filter = ("member",)
    inlines = [WorkoutExerciseInline]  # Allows adding WorkoutExercises within the WorkoutPlan


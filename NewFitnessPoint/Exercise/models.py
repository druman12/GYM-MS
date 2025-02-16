from django.db import models
from Account.models import Member

class Exercise(models.Model):
    exercise_id=models.AutoField(primary_key=True)
    exercise_name = models.CharField(max_length=100)
    focus_area = models.CharField(max_length=50)
    description = models.TextField()
    
    def __str__(self):
        return f"{self.exercise_name}({self.focus_area})"
    
class WorkoutPlan(models.Model):
    workoutplan_id=models.AutoField(primary_key=True)
    member = models.ForeignKey(Member, on_delete=models.CASCADE , to_field='member_id', related_name="workout_plans")
    title = models.CharField(max_length=200)

    # Day-wise focus areas
    day1_focus_area = models.CharField(max_length=100 , help_text='like chest,back etc.', blank=True, null=True)
    day2_focus_area = models.CharField(max_length=100 , help_text='like chest,back etc.', blank=True, null=True)
    day3_focus_area = models.CharField(max_length=100 , help_text='like chest,back etc.', blank=True, null=True)
    day4_focus_area = models.CharField(max_length=100 , help_text='like chest,back etc.', blank=True, null=True)
    day5_focus_area = models.CharField(max_length=100 , help_text='like chest,back etc.', blank=True, null=True)
    day6_focus_area = models.CharField(max_length=100 , help_text='like chest,back etc.', blank=True, null=True)

    def __str__(self):
        return f"{self.member.name} - {self.title}"

class WorkoutExercise(models.Model):
    workoutexercise_id=models.AutoField(primary_key=True) 
    workoutplan = models.ForeignKey(WorkoutPlan, on_delete=models.CASCADE,to_field='workoutplan_id', related_name="workout_exercises")
    day = models.IntegerField(choices=[(1, "Day 1"), (2, "Day 2"), (3, "Day 3"), (4, "Day 4"), (5, "Day 5"), (6, "Day 6")])
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    sets = models.IntegerField(default=3)
    reps = models.IntegerField(default=10)

    def __str__(self):
        return f"{self.workoutplan.title} - {self.exercise.exercise_name} (Day {self.day})"
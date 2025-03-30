from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Exercise , WorkoutExercise , WorkoutPlan

# @require_http_methods(["GET"])
# def get_member_workout_plans(request, member_id):
#     with connection.cursor() as cursor:
#         cursor.execute("""
#             SELECT 
#                 wp.workoutplan_id,
#                 wp.title,
#                 wp.day1_focus_area,
#                 wp.day2_focus_area,
#                 wp.day3_focus_area,
#                 wp.day4_focus_area,
#                 wp.day5_focus_area,
#                 wp.day6_focus_area
#             FROM exercise_workoutplan wp
#             WHERE wp.member_id = %s
#         """, [member_id])
        
#         columns = [col[0] for col in cursor.description]
#         workout_plans = []
        
#         for row in cursor.fetchall():
#             plan_dict = dict(zip(columns, row))
#             workout_plans.append({
#                 'workoutplan_id': plan_dict['workoutplan_id'],
#                 'title': plan_dict['title'],
#                 'focus_areas': {
#                     'day1': plan_dict['day1_focus_area'],
#                     'day2': plan_dict['day2_focus_area'],
#                     'day3': plan_dict['day3_focus_area'],
#                     'day4': plan_dict['day4_focus_area'],
#                     'day5': plan_dict['day5_focus_area'],
#                     'day6': plan_dict['day6_focus_area']
#                 }
#             })
        
#         return JsonResponse({
#             'member_id': member_id,
#             'workout_plans': workout_plans
#         })
    
@require_http_methods(["GET"])
def get_member_workout_plans(request, member_id):
    workout_plans = WorkoutPlan.objects.filter(member_id=member_id)

    workout_plans_data = []
    for plan in workout_plans:
        workout_plans_data.append({
            'workoutplan_id': plan.workoutplan_id,
            'title': plan.title,
            'focus_areas': {
                'day1': plan.day1_focus_area,
                'day2': plan.day2_focus_area,
                'day3': plan.day3_focus_area,
                'day4': plan.day4_focus_area,
                'day5': plan.day5_focus_area,
                'day6': plan.day6_focus_area
            }
        })

    # Return the response as JSON
    return JsonResponse({
        'member_id': member_id,
        'workout_plans': workout_plans_data
    })

@require_http_methods(["GET"])
def get_member_day_exercises(request, member_id, day):
    # Fetch the most recent workout plan for the member
    workout_plan = WorkoutPlan.objects.filter(member_id=member_id).order_by('-workoutplan_id').first()

    if not workout_plan:
        return JsonResponse({
            'error': 'No workout plan found for this member'
        }, status=404)

    # Get the focus area for the specified day
    day_focus_area_field = f'day{day}_focus_area'
    focus_area = getattr(workout_plan, day_focus_area_field, None)

    if not focus_area:
        return JsonResponse({
            'error': f'No focus area found for day {day}'
        }, status=404)


    exercises = WorkoutExercise.objects.filter(
        workoutplan=workout_plan,
        day=day
    ).select_related('exercise')

    exercises_list = []
    for exercise in exercises:
        exercises_list.append({
            'workoutexercise_id': exercise.workoutexercise_id,
            'exercise_name': exercise.exercise.exercise_name,
            'focus_area': exercise.exercise.focus_area,
            'sets': exercise.sets,
            'reps': exercise.reps
        })

    return JsonResponse({
        'member_id': member_id,
        'workoutplan_id': workout_plan.workoutplan_id,
        'plan_title': workout_plan.title,
        'day': day,
        'focus_area': focus_area,
        'exercises': exercises_list
    })
from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET"])
def get_member_workout_plans(request, member_id):
    with connection.cursor() as cursor:
        # Query to get all workout plans for a member
        cursor.execute("""
            SELECT 
                wp.workoutplan_id,
                wp.title,
                wp.day1_focus_area,
                wp.day2_focus_area,
                wp.day3_focus_area,
                wp.day4_focus_area,
                wp.day5_focus_area,
                wp.day6_focus_area
            FROM exercise_workoutplan wp
            WHERE wp.member_id = %s
        """, [member_id])
        
        columns = [col[0] for col in cursor.description]
        workout_plans = []
        
        for row in cursor.fetchall():
            plan_dict = dict(zip(columns, row))
            workout_plans.append({
                'workoutplan_id': plan_dict['workoutplan_id'],
                'title': plan_dict['title'],
                'focus_areas': {
                    'day1': plan_dict['day1_focus_area'],
                    'day2': plan_dict['day2_focus_area'],
                    'day3': plan_dict['day3_focus_area'],
                    'day4': plan_dict['day4_focus_area'],
                    'day5': plan_dict['day5_focus_area'],
                    'day6': plan_dict['day6_focus_area']
                }
            })
        
        return JsonResponse({
            'member_id': member_id,
            'workout_plans': workout_plans
        })

@require_http_methods(["GET"])
def get_member_day_exercises(request, member_id, day):
    with connection.cursor() as cursor:
        # First fetch the most recent workout plan for the member
        cursor.execute("""
            SELECT workoutplan_id 
            FROM exercise_workoutplan
            WHERE member_id = %s
        """, [member_id])
        
        result = cursor.fetchone()
        if not result:
            return JsonResponse({
                'error': 'No workout plan found for this member'
            }, status=404)
        
        workout_plan_id = result[0]
        
        # Get the workout plan details
        cursor.execute("""
            SELECT title, day1_focus_area, day2_focus_area, day3_focus_area,
                   day4_focus_area, day5_focus_area, day6_focus_area
            FROM exercise_workoutplan
            WHERE workoutplan_id = %s AND member_id = %s
        """, [workout_plan_id, member_id])
        
        workout_plan = cursor.fetchone()
        if not workout_plan:
            return JsonResponse({
                'error': 'Workout plan not found or does not belong to this member'
            }, status=404)
        
        # Get the focus area for the specified day
        # Convert day string to index (e.g., 'day1' -> 1, 'day2' -> 2)
        try:
            day_num = day
            focus_area = workout_plan[day_num]  # day1_focus_area is at index 1, day2 at 2, etc.
        except (ValueError, IndexError):
            return JsonResponse({
                'error': f'Invalid day format: {day}. Expected format: day1, day2, etc.'
            }, status=400)
        
        # Query to get exercises for the specific day
        cursor.execute("""
            SELECT 
                we.workoutexercise_id,
                e.exercise_name,
                e.focus_area,
                we.sets,
                we.reps
            FROM exercise_workoutexercise we
            JOIN exercise_exercise e ON we.exercise_id = e.exercise_id
            WHERE we.workoutplan_id = %s AND we.day = %s
            ORDER BY we.workoutexercise_id
        """, [workout_plan_id, day])
        
        columns = [col[0] for col in cursor.description]
        exercises = []
        
        for row in cursor.fetchall():
            exercise_dict = dict(zip(columns, row))
            exercises.append({
                'workoutexercise_id': exercise_dict['workoutexercise_id'],
                'exercise_name': exercise_dict['exercise_name'],
                'focus_area': exercise_dict['focus_area'],
                'sets': exercise_dict['sets'],
                'reps': exercise_dict['reps']
            })
        
        return JsonResponse({
            'member_id': member_id,
            'workoutplan_id': workout_plan_id,
            'plan_title': workout_plan[0],  # title is at index 0
            'day': day,
            'focus_area': focus_area,
            'exercises': exercises
        })

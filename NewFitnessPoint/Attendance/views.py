# import MySQLdb
from rest_framework import status
from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from datetime import date
from Account.models import Member, Trainer
from .models import MemberAttendance, AllMemberAttendance

@csrf_exempt
def get_member_attendance(request, member_id):
    # Fetch joining_date and subscription_end_date from Member model
    try:
        member = Member.objects.get(member_id=member_id)
        joining_date = member.joining_date
        subscription_end_date = member.subscription_end_date
    except Member.DoesNotExist:
        return JsonResponse({"error": "Member not found"}, status=404)

    # Fetch attendance records
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT ma.date, ama.attendance
            FROM Attendance_memberattendance ma
            JOIN Attendance_allmemberattendance ama ON ma.id = ama.date_id
            WHERE ama.member_id = %s
            ORDER BY ma.date ASC
        """, [member_id])
        
        results = cursor.fetchall()

    attendance_list = [
        {"date": str(row[0]), "attendance": row[1]} for row in results
    ]

    # Return response with joining_date and subscription_end_date
    return JsonResponse({
        "member_id": member_id,
        "joining_date": str(joining_date),
        "subscription_end_date": str(subscription_end_date),
        "attendance": attendance_list
    })

@csrf_exempt
def mark_member_attendance(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests allowed'}, status=405)
    import json
    data = json.loads(request.body)
    member_id = data.get('member_id')
    trainer_id = data.get('trainer_id')
    attendance_status = data.get('attendance', 'present')
    today = date.today()
    
    try:
        member = Member.objects.get(member_id=member_id)
        trainer = Trainer.objects.get(trainer_id=trainer_id)
        
        # Get or create today's attendance record
        attendance_date, created = MemberAttendance.objects.get_or_create(
            date=today
        )
        
        # Get or create the specific member's attendance for today
        member_attendance, created = AllMemberAttendance.objects.get_or_create(
            date=attendance_date,
            member=member,
            trainer=trainer,
            defaults={'attendance': attendance_status}
        )
        
        # If the record already exists, update it
        if not created:
            member_attendance.attendance = attendance_status
            member_attendance.save()
        
        return JsonResponse({
            'success': True,
            'message': f'Attendance marked as {attendance_status} for {member.name}',
            'attendance': attendance_status
        }, status=status.HTTP_200_OK)
    
    except Member.DoesNotExist:
        return JsonResponse({'error': 'Member not found'}, status=status.HTTP_404_NOT_FOUND)
    except Trainer.DoesNotExist:
        return JsonResponse({'error': 'Trainer not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
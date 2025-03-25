# import MySQLdb
from rest_framework import status
from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from datetime import date
from django.utils.timezone import now
from Account.models import Member, Trainer
from .models import MemberAttendance, AllMemberAttendance

@csrf_exempt
def get_member_attendance(request, member_id):
    if member_id:
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
        

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import date
import json
from .models import MemberAttendance, AllMemberAttendance
from Account.models import Member, Trainer
from rest_framework import status

@csrf_exempt
def mark_member_attendance(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests allowed'}, status=405)
    
    try:
        data = json.loads(request.body)
        member_id = data.get('member_id')
        trainer_id = data.get('trainer_id')
        attendance_status = data.get('attendance', 'present')
        today = date.today()

        # Fetch member and trainer
        member = Member.objects.get(member_id=member_id)
        trainer = Trainer.objects.get(trainer_id=trainer_id)

        # Get or create the attendance date
        attendance_date, _ = MemberAttendance.objects.get_or_create(date=today)

        # Check if a record exists for the member on this date (ignoring trainer)
        member_attendance, created = AllMemberAttendance.objects.get_or_create(
            date=attendance_date,
            member=member,
            defaults={'attendance': attendance_status, 'trainer': trainer}
        )

        # If attendance exists, update the status and trainer if changed
        if not created:
            member_attendance.attendance = attendance_status
            member_attendance.trainer = trainer  # Update trainer if needed
            member_attendance.save()

        return JsonResponse({
            'success': True,
            'message': f'Attendance updated to {attendance_status} for {member.name}',
            'attendance': member_attendance.attendance
        }, status=status.HTTP_200_OK)

    except Member.DoesNotExist:
        return JsonResponse({'error': 'Member not found'}, status=status.HTTP_404_NOT_FOUND)
    except Trainer.DoesNotExist:
        return JsonResponse({'error': 'Trainer not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
from django.utils.timezone import now
from .models import Member

@csrf_exempt
def get_today_attendance(request):
    # Get today's date in YYYY-MM-DD format
    today_date = now().date()

    # Fetch all members' details
    members = Member.objects.all()

    member_data = []

    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT ama.member_id, ma.date, ama.attendance
            FROM Attendance_memberattendance ma
            JOIN Attendance_allmemberattendance ama ON ma.id = ama.date_id
            WHERE ma.date = %s
        """, [today_date])

        attendance_records = cursor.fetchall()

    # Map attendance by member_id
    attendance_by_member = {row[0]: row[2] for row in attendance_records}

    # Build the response
    for member in members:
        member_data.append({
            "member_id": member.member_id,
            "name": member.name,
            "joining_date": str(member.joining_date),
            "subscription_end_date": str(member.subscription_end_date),
            "today_attendance": attendance_by_member.get(member.member_id, "absent")
        })

    return JsonResponse({"date": str(today_date), "members": member_data})

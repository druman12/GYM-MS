import MySQLdb
from django.http import JsonResponse
from django.db import connection

def get_member_attendance(request, member_id):
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

    return JsonResponse({"member_id": member_id, "attendance": attendance_list})

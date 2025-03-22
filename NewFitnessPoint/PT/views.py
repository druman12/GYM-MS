from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def get_trainer_members(request, trainer_id):
        if request.method == 'GET':
            with connection.cursor() as cursor:
                # Fetch members under a specific trainer
                cursor.execute("""
                    SELECT m.member_id , m.name, m.subscription_plan, m.joining_date
                    FROM Account_member m
                    INNER JOIN pt_personal_training_members ptm ON m.member_id = ptm.member_id
                    INNER JOIN pt_personal_training pt ON ptm.personal_training_id = pt.id
                    WHERE pt.trainer_id = %s
                """, [trainer_id])

                # Fetch all results
                members = cursor.fetchall()

            # If no members found, return empty list with count 0
            if not members:
                return JsonResponse({"trainer_id": trainer_id, "members": [], "PT_count": 0}, status=200)

            # Format the response
            member_list = [
                {"member_id":member[0] ,"name": member[1], "subscription_plan": member[2], "joining_date": str(member[3])}
                for member in members
            ]
            
            # Count the total members
            total_members = len(member_list)
            
            return JsonResponse({
                "trainer_id": trainer_id, 
                "members": member_list, 
                "PT_count": total_members
            }, status=200)
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from django.db import connection
from . import models


@csrf_exempt
def memberapi(request , id=0):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            if id != 0:
                # Fetch a specific member by ID (all columns)
                cursor.execute("SELECT * FROM account_member WHERE member_id = %s", [id])
                row = cursor.fetchone()
                if row:
                    columns = [col[0] for col in cursor.description]  # Get column names
                    member = dict(zip(columns, row))  # Map column names to values
                    return JsonResponse(member, safe=False)
                else:
                    return JsonResponse({'message': 'Member not found'}, status=404)
            else:
                # Fetch all members (all columns)
                cursor.execute("SELECT * FROM account_member")
                rows = cursor.fetchall()
                columns = [col[0] for col in cursor.description]  # Get column names
                members = [dict(zip(columns, row)) for row in rows]  # Convert to list of dicts
                return JsonResponse(members, safe=False)
    
@csrf_exempt
def membermedicaldetailsapi(request , id=0):
    if request.method=='GET':
        with connection.cursor() as cursor:
            if id != 0:
                # Fetch a specific member by ID (all columns)
                cursor.execute("SELECT * FROM account_membermedicaldetails WHERE member_id = %s", [id])
                row = cursor.fetchone()
                if row:
                    columns = [col[0] for col in cursor.description]  # Get column names
                    memberMD = dict(zip(columns, row))  # Map column names to values
                    return JsonResponse(memberMD, safe=False)
            else:
                # Fetch all members (all columns)
                cursor.execute("SELECT * FROM account_membermedicaldetails")
                rows = cursor.fetchall()
                columns = [col[0] for col in cursor.description]  # Get column names
                membersMD = [dict(zip(columns, row)) for row in rows]  # Convert to list of dicts
                return JsonResponse(membersMD, safe=False)


@csrf_exempt
def Authenticate(request):
    if request.method == 'POST':
        try:
            import json
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')  # Assuming password is stored as plaintext date of birth
            # Fetch user from MySQL database

            trainer = models.Trainer.objects.filter(email=email).first()  # Using `.filter().first()` to avoid exceptions
            
            if trainer:
                db_date = str(trainer.dateofbirth)  # Ensure date format matches stored format
                if db_date == password:
                    return JsonResponse({'success': True, 'trainer_id': trainer.trainer_id})
                else:
                    return JsonResponse({'success': False, 'error': 'Invalid credentials'}, status=401)
            else:
                user=models.Member.objects.filter(email=email).first()
                if user:
                    db_date = str(user.dateofbirth)  # Ensure date format matches stored format
                    if db_date == password:
                        return JsonResponse({'success': True, 'member_id': user.member_id})
                    else:
                        return JsonResponse({'success': False, 'error': 'Invalid credentials'}, status=401)

                
        
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid JSON format'}, status=400)
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid method'}, status=405)


@csrf_exempt
def OwnerDetailsapi(request):
    if request.method=='GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM account_owner")
            row=cursor.fetchone()
            if row:
                columns = [col[0] for col in cursor.description]  # Get column names
                owner = dict(zip(columns, row))  # Map column names to values
                return JsonResponse(owner, safe=False)
            

@csrf_exempt
def trainerapi(request , id=0):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            if id != 0:
                # Fetch a specific member by ID (all columns)
                cursor.execute("SELECT * FROM account_trainer WHERE trainer_id = %s", [id])
                row = cursor.fetchone()
                if row:
                    columns = [col[0] for col in cursor.description]  # Get column names
                    trainer = dict(zip(columns, row))  # Map column names to values
                    return JsonResponse(trainer, safe=False)
                else:
                    return JsonResponse({'message': 'trainer not found'}, status=404)

@csrf_exempt
def getGalleryImages(request):
    if request.method=='GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM account_gallery")
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]  # Get column names
            images = [dict(zip(columns, row)) for row in rows]  # Convert to list of dicts
            return JsonResponse(images, safe=False)
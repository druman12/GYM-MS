from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from django.db import connection
from . import models
import cloudinary.utils

CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dbsokdyz0/"


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
    
# @csrf_exempt
# def membermedicaldetailsapi(request , id=0):
#     if request.method=='GET':
#         with connection.cursor() as cursor:
#             if id != 0:
#                 # Fetch a specific member by ID (all columns)
#                 cursor.execute("SELECT * FROM account_membermedicaldetails WHERE member_id = %s", [id])
#                 row = cursor.fetchone()
#                 if row:
#                     columns = [col[0] for col in cursor.description]  # Get column names
#                     memberMD = dict(zip(columns, row))  # Map column names to values
#                     return JsonResponse(memberMD, safe=False)
#             else:
#                 # Fetch all members (all columns)
#                 cursor.execute("SELECT * FROM account_membermedicaldetails")
#                 rows = cursor.fetchall()
#                 columns = [col[0] for col in cursor.description]  # Get column names
#                 membersMD = [dict(zip(columns, row)) for row in rows]  # Convert to list of dicts
#                 return JsonResponse(membersMD, safe=False)


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
            print(trainer)
            if trainer:
                db_date = str(trainer.dateofbirth)  # Ensure date format matches stored format
                if db_date == password:
                    
                    return JsonResponse({'status': True, 'trainer_id': trainer.trainer_id , 'user_type':'trainer'})
                else:
                    return JsonResponse({'status': False, 'error': 'Invalid credentials'}, status=401)
            else:
                user=models.Member.objects.filter(email=email).first()
                print(user)
                if user:
                    db_date = str(user.dateofbirth)  # Ensure date format matches stored format
                    print(db_date)
                    print(user)
                    if db_date == password:
                        return JsonResponse({'status': True, 'member_id': user.member_id , 'user_type':'member'})
                    else:
                        return JsonResponse({'status': False, 'error': 'Invalid credentials'}, status=401)
                else:
                    return JsonResponse({'status': False, 'error': 'User not found'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'status': False, 'error': 'Invalid JSON format'}, status=400)
        except Exception as e:
            return JsonResponse({'status': False, 'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid method'}, status=405)


@csrf_exempt
def OwnerDetailsapi(request):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM account_owner")
            row = cursor.fetchone()
            
            if row:
                columns = [col[0] for col in cursor.description]  # Get column names
                owner = dict(zip(columns, row))  # Convert to dictionary
                
                # Convert image fields to Cloudinary URLs
                if "profile_photo" in owner and owner["profile_photo"]:
                    owner["profile_photo"] = f"https://res.cloudinary.com/dbsokdyz0/{owner['profile_photo']}"
                
                if "AboutUs_photo" in owner and owner["AboutUs_photo"]:
                    owner["AboutUs_photo"] = f"https://res.cloudinary.com/dbsokdyz0/{owner['AboutUs_photo']}"
                    
                if "heroimage" in owner and owner["heroimage"]:
                    owner["heroimage"]=f"https://res.cloudinary.com/dbsokdyz0/{owner['heroimage']}"

                return JsonResponse(owner, safe=False)
            else:
                return JsonResponse({"message": "Owner details not found"}, status=404)
          

@csrf_exempt
def membermedicaldetailsapi(request, id=0):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            if id != 0:
                # Fetch a specific member by ID
                cursor.execute("SELECT * FROM account_membermedicaldetails WHERE member_id = %s", [id])
                row = cursor.fetchone()
                if row:
                    columns = [col[0] for col in cursor.description]  # Get column names
                    memberMD = dict(zip(columns, row))  # Map column names to values
                    
                    # Append Cloudinary base URL to image fields
                    if memberMD.get("bmi_report_image"):
                        memberMD["bmi_report_image"] = CLOUDINARY_BASE_URL + memberMD["bmi_report_image"]
                    if memberMD.get("diet_chart_image"):
                        memberMD["diet_chart_image"] = CLOUDINARY_BASE_URL + memberMD["diet_chart_image"]

                    return JsonResponse(memberMD, safe=False)
            else:
                # Fetch all members
                cursor.execute("SELECT * FROM account_membermedicaldetails")
                rows = cursor.fetchall()
                columns = [col[0] for col in cursor.description]  # Get column names
                membersMD = [dict(zip(columns, row)) for row in rows]  # Convert to list of dicts
                
                # Append Cloudinary base URL to image fields for all records
                for memberMD in membersMD:
                    if memberMD.get("bmi_report_image"):
                        memberMD["bmi_report_image"] = CLOUDINARY_BASE_URL + memberMD["bmi_report_image"]
                    if memberMD.get("diet_chart_image"):
                        memberMD["diet_chart_image"] = CLOUDINARY_BASE_URL + memberMD["diet_chart_image"]

                return JsonResponse(membersMD, safe=False)


@csrf_exempt
def trainerapi(request, id=0):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            if id != 0:
                # Fetch specific trainer details
                cursor.execute("""
                    SELECT name, experience, trainer_profile_photo, trainer_info 
                    FROM account_trainer 
                    WHERE trainer_id = %s
                """, [id])
                row = cursor.fetchone()

                if row:
                    name, experience, profile_photo, trainer_info = row

                    # Construct Cloudinary URL
                    image_url = f"https://res.cloudinary.com/dbsokdyz0/{profile_photo}" if profile_photo else None
                    
                    return JsonResponse({
                        "name": name,
                        "experience": experience,
                        "trainer_profile_photo": image_url,
                        "trainer_info": trainer_info
                    })
                else:
                    return JsonResponse({'message': 'Trainer not found'}, status=404)
            else:
                # Fetch all trainers
                cursor.execute("""
                    SELECT name, experience, trainer_profile_photo, trainer_info 
                    FROM account_trainer
                """)
                rows = cursor.fetchall()

                trainers = [{
                    "name": row[0],
                    "experience": row[1],
                    "trainer_profile_photo": f"https://res.cloudinary.com/dbsokdyz0/{row[2]}" if row[2] else None,
                    "trainer_info": row[3]
                } for row in rows]

                return JsonResponse(trainers, safe=False)

@csrf_exempt    
def getGalleryImages(request):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM account_gallery")
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]  # Get column names

            images = []
            for row in rows:
                image_data = dict(zip(columns, row))  # Convert row to dictionary
                
                # Assuming "image" is the column storing the Cloudinary path
                if "image" in image_data and image_data["image"]:
                    image_data["image_url"] = CLOUDINARY_BASE_URL + image_data["image"]  # Add full URL
                
                images.append(image_data)
                
            return JsonResponse(images, safe=False)
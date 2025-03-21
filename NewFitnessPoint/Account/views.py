from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from django.db import connection
from . import models
import cloudinary.utils
import bcrypt
import json
import random
from django.conf import settings
from datetime import datetime, timedelta
from django.utils.timezone import make_aware, now
from django.core.mail import send_mail, EmailMessage
from django.utils.html import format_html

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
            
@csrf_exempt
def Authenticate(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')  # ✅ Plain-text password from request

            # 🔹 Check Trainer table first
            trainer = models.Trainer.objects.filter(email=email).first()
            if trainer:
                stored_hashed_password = trainer.password  # Already hashed
                if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password.encode('utf-8')):  
                    return JsonResponse({'status': True, 'trainer_id': trainer.trainer_id, 'user_type': 'trainer'})
                else:
                    return JsonResponse({'status': False, 'error': 'Invalid credentials'}, status=401)

            # 🔹 Check Member table
            user = models.Member.objects.filter(email=email).first()
            if user:
                stored_hashed_password = user.password
                if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password.encode('utf-8')):  
                    return JsonResponse({'status': True, 'member_id': user.member_id, 'user_type': 'member'})
                else:
                    return JsonResponse({'status': False, 'error': 'Invalid credentials'}, status=401)

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
        

@csrf_exempt
def send_otp_email(email, otp):
    subject = "Your Password Reset OTP"
    message = format_html(
        """
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
            <h2 style="color: #333;">Password Reset OTP</h2>
            <p style="font-size: 16px; color: #555;">
                You requested a password reset. Use the following OTP to proceed:
            </p>
            <p style="font-size: 20px; font-weight: bold; color: #d9534f;">
                {otp}
            </p>
            <p style="font-size: 14px; color: #777;">
                If you didn’t request this, please ignore this email.
            </p>
            <p style="font-size: 14px; color: #777;">Regards, <br><strong>New Fitness Point GYM</strong></p>
        </div>
        """,
        otp=otp
    )
    
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]

    email_message = EmailMessage(subject, message, email_from, recipient_list)
    email_message.content_subtype = "html"  # Set email format to HTML
    email_message.send()


@csrf_exempt
def send_otp(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")

        # Check if the email belongs to a Member or Trainer
        user_exists = models.Member.objects.filter(email=email).exists() or models.Trainer.objects.filter(email=email).exists()
        
        if not user_exists:
            return JsonResponse({"error": "Email not found in records."}, status=400)

        otp = str(random.randint(100000, 999999))  # Generate 6-digit OTP

        # Delete any existing OTP for this email
        models.OTPVerification.objects.filter(email=email).delete()

        # Save the new OTP
        models.OTPVerification.objects.create(email=email, otp=otp)

        # Send OTP via email
        send_otp_email(email, otp)

        return JsonResponse({"message": "OTP sent to your email."})

@csrf_exempt
def verify_otp(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        otp = data.get("otp")

        otp_record = models.OTPVerification.objects.filter(email=email).last()

        if not otp_record:
            return JsonResponse({"error": "No OTP found. Please request a new one."}, status=400)

        # Use timezone-aware datetime
        otp_valid_time = otp_record.created_at + timedelta(minutes=5)

        if now() > otp_valid_time:  # timezone.now() ensures correct comparison
            return JsonResponse({"error": "OTP expired. Request a new one."}, status=400)

        if otp_record.otp != otp:
            return JsonResponse({"error": "Invalid OTP."}, status=400)

        # OTP is correct, delete it
        otp_record.delete()
        return JsonResponse({"message": "OTP verified. Proceed to reset password."})
    
@csrf_exempt
def reset_password(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        new_password = data.get("password")

        print(email , new_password)

        # Check if the email exists in Member or Trainer
        user = None
        if models.Member.objects.filter(email=email).exists():
            user = models.Member.objects.get(email=email)
        elif models.Trainer.objects.filter(email=email).exists():
            user = models.Trainer.objects.get(email=email)

        if not user:
            return JsonResponse({"error": "User not found."}, status=400)
        
        print(user)

        # Hash and update the password
        hashed_password = bcrypt.hashpw(new_password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        user.password = hashed_password
        user.save()

        return JsonResponse({"message": "Password reset successful. You can now log in."})
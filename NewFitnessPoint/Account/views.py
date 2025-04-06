from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from . import models
import cloudinary.utils
import bcrypt
import json
import random
import cloudinary.utils
from django.conf import settings
from datetime import datetime, timedelta , date
from django.utils.timezone import now
from django.core.mail import send_mail, EmailMessage
from django.utils.html import format_html

CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dbsokdyz0/"


@csrf_exempt
def memberapi(request, id=0):
    if request.method == 'GET':
        if id != 0:
            # Fetch a specific member by ID
            try:
                member = models.Member.objects.get(member_id=id)
                if member.subscription_end_date < date.today():
                    return JsonResponse({'message': 'Subscription expired'}, status=403)    
                return JsonResponse(member.to_dict(), safe=False)
            except models.Member.DoesNotExist:
                return JsonResponse({'message': 'Member not found'}, status=404)
        else:
            # Fetch all members
            members = models.Member.objects.filter(subscription_end_date__gte=date.today())

            member_list = [member.to_dict() for member in members]
            return JsonResponse(member_list, safe=False)

            
@csrf_exempt
def Authenticate(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password') 

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
                    if user.subscription_end_date < date.today():
                        return JsonResponse({'status': False, 'error': 'Subscription expired'}, status=403)  
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
        try:
            owner = models.Owner.objects.first()  # Get the first record
            if owner:
                # Get all fields from the model
                owner_data = {}
                
                # Get all fields dynamically
                for field in owner._meta.fields:
                    field_name = field.name
                    field_value = getattr(owner, field_name)
                    
                    # Handle CloudinaryField specially
                    if isinstance(field, cloudinary.models.CloudinaryField) and field_value:
                        owner_data[field_name] = cloudinary.utils.cloudinary_url(field_value.public_id)[0]
                    # Handle other field types as needed
                    elif isinstance(field_value, (int, str, bool, float)) or field_value is None:
                        owner_data[field_name] = field_value
                    elif hasattr(field_value, 'isoformat'):  # For date/datetime fields
                        owner_data[field_name] = field_value.isoformat()
                    else:
                        # Convert other objects to string representation
                        owner_data[field_name] = str(field_value)
                
                return JsonResponse(owner_data, safe=False)
            else:
                return JsonResponse({"message": "Owner details not found"}, status=404)
        except models.Owner.DoesNotExist:
            return JsonResponse({"message": "Owner details not found"}, status=404)


@csrf_exempt
def membermedicaldetailsapi(request, id=0):
    if request.method == 'GET':
        if id != 0:
            # Fetch a specific member by ID
            try:
                memberMD = models.MemberMedicalDetails.objects.get(member_id=id)
                memberMD_data = {
                    "mmd_id": memberMD.mmd_id,
                    "member_id": memberMD.member_id,
                    "bmi_report_image": cloudinary.utils.cloudinary_url(memberMD.bmi_report_image.public_id)[0] if memberMD.bmi_report_image else None,
                    "diet_chart_image": cloudinary.utils.cloudinary_url(memberMD.diet_chart_image.public_id)[0] if memberMD.diet_chart_image else None,
                }
                return JsonResponse(memberMD_data, safe=False)
            except models.MemberMedicalDetails.DoesNotExist:
                return JsonResponse({"message": "Member medical details not found"}, status=404)
        else:
            # Fetch all members
            membersMD = models.MemberMedicalDetails.objects.all()
            membersMD_data = []
            for memberMD in membersMD:
                memberMD_data = {
                    "mmd_id": memberMD.mmd_id,
                    "member_id": memberMD.member_id,
                    "bmi_report_image": cloudinary.utils.cloudinary_url(memberMD.bmi_report_image.public_id)[0] if memberMD.bmi_report_image else None,
                    "diet_chart_image": cloudinary.utils.cloudinary_url(memberMD.diet_chart_image.public_id)[0] if memberMD.diet_chart_image else None,
                }
                membersMD_data.append(memberMD_data)
            return JsonResponse(membersMD_data, safe=False)
        
@csrf_exempt
def trainerapi(request, id=0):
    if request.method == 'GET':
        if id != 0:
            # Fetch specific trainer details
            try:
                trainer = models.Trainer.objects.get(trainer_id=id)
                trainer_data = {
                    "name": trainer.name,
                    "experience": trainer.experience,
                    "trainer_profile_photo": cloudinary.utils.cloudinary_url(trainer.trainer_profile_photo.public_id)[0] if trainer.trainer_profile_photo else None,
                    "trainer_info": trainer.trainer_info
                }
                return JsonResponse(trainer_data)
            except models.Trainer.DoesNotExist:
                return JsonResponse({'message': 'Trainer not found'}, status=404)
        else:
            # Fetch all trainers
            trainers = models.Trainer.objects.all()
            trainers_data = []
            for trainer in trainers:
                trainer_data = {
                    "name": trainer.name,
                    "experience": trainer.experience,
                    "trainer_profile_photo": cloudinary.utils.cloudinary_url(trainer.trainer_profile_photo.public_id)[0] if trainer.trainer_profile_photo else None,
                    "trainer_info": trainer.trainer_info
                }
                trainers_data.append(trainer_data)
            return JsonResponse(trainers_data, safe=False)

@csrf_exempt
def getGalleryImages(request):
    if request.method == 'GET':
        # Fetch all gallery images
        images = models.Gallery.objects.all()
        images_data = []
        for image in images:
            image_data = {
                "gallery_id": image.gallery_id,
                "image_url": cloudinary.utils.cloudinary_url(image.image.public_id)[0] if image.image else None
            }
            images_data.append(image_data)
        return JsonResponse(images_data, safe=False)
        

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
    email_message.content_subtype = "html"  
    email_message.send()

@csrf_exempt
def notify_reset_pass(email):
    subject = "Your Password Has Been Reset - New Fitness Point GYM"
    message = format_html(
        """
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
            <h2 style="color: #333;">Password Successfully Reset</h2>
            <p style="font-size: 16px; color: #555;">
                We have successfully processed your password reset request. You can now log in using your new password.
            </p>
            <p style="font-size: 14px; color: #777;">
                If you did not request this change, please contact <strong>New Fitness Point GYM</strong> immediately.
            </p>
            <p style="font-size: 14px; color: #777;">
                For assistance, you can reach us via email or visit our front desk.
            </p>
            <p style="font-size: 14px; color: #777;">
                Regards, <br><strong>New Fitness Point GYM Team</strong>
            </p>
        </div>
        """
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

        

        # Check if the email exists in Member or Trainer
        user = None
        if models.Member.objects.filter(email=email).exists():
            user = models.Member.objects.get(email=email)
        elif models.Trainer.objects.filter(email=email).exists():
            user = models.Trainer.objects.get(email=email)

        if not user:
            return JsonResponse({"error": "User not found."}, status=400)

        # Hash and update the password
        hashed_password = bcrypt.hashpw(new_password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        user.password = hashed_password
        user.save()
        notify_reset_pass(email)
        return JsonResponse({"message": "Password reset successful. You can now log in."})
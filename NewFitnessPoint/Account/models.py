from django.db import models
from datetime import datetime, timedelta , date
from django.utils import timezone  # type: ignore 
import cloudinary
import cloudinary.models

# Create your models here.
class Member(models.Model):
    member_id=models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)
    password=models.CharField(max_length=255,blank=True, null=True , default="None")
    dateofbirth=models.DateField(default='2000-01-01')
    gender = models.CharField(max_length=10,choices=[('Male', 'Male'),('Female', 'Female')],default='Male')
    occupation=models.CharField(max_length=120)
    age = models.IntegerField()
    weight = models.FloatField()  
    height = models.FloatField()  
    address = models.TextField() 
    pincode = models.CharField(max_length=6 , default='387001')  
    mobile_no = models.CharField(max_length=10)
    email= models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    SUBSCRIPTION_CHOICES = [
        ('1M', '1 Month'),
        ('3M', '3 Months'),
        ('6M', '6 Months'),
        ('1Y', '1 Year'),
    ]
    def get_default_end_date():
        return timezone.now() + timedelta(days=90)
    def get_tomorrow():
        return timezone.now() + timedelta(days=1)

    subscription_plan = models.CharField(max_length=2, choices=SUBSCRIPTION_CHOICES, default='3M')
    joining_date = models.DateField(default=get_tomorrow)
    subscription_end_date = models.DateField(editable=False , default=get_default_end_date)
    is_active = models.BooleanField(editable=False , default=True)
    def save(self, *args, **kwargs):
        # Calculate subscription end date based on joining date and plan
        if self.joining_date:
            if self.subscription_plan == '1M':
                days = 30
            elif self.subscription_plan == '3M':
                days = 90
            elif self.subscription_plan == '6M':
                days = 180
            elif self.subscription_plan == '1Y':
                days = 365
                
            self.subscription_end_date = self.joining_date + timedelta(days=days)
            self.is_active = self.subscription_end_date >= date.today()

        super().save(*args, **kwargs)

    def to_dict(self):
        return {
            'member_id': self.member_id,
            'name': self.name,
            'dateofbirth': self.dateofbirth,
            'email': self.email,
            'joining_date': self.joining_date,
            'subscription_end_date': self.subscription_end_date,
            'subscription_plan': self.subscription_plan,
            'weight':self.weight,
            'height':self.height,
            'occupation':self.occupation,
        }

    def __str__(self):
        return f"{self.member_id}-{self.name}"


class MemberMedicalDetails(models.Model):
    mmd_id=models.AutoField(primary_key=True)
    member = models.ForeignKey('Member', on_delete=models.CASCADE , to_field='member_id')  # ForeignKey linking to MemberModel
    blood_group = models.CharField(max_length=3)  # To store blood group like 'A+', 'O-', etc.
    heart_conditions = models.TextField(null=True, blank=True)  # To store heart-related conditions (can be empty)
    orthopedic_conditions = models.TextField(null=True, blank=True)  # To store orthopedic-related conditions
    other_conditions = models.TextField(null=True, blank=True)  # To store any other medical conditions
    
    bmi_report_image =cloudinary.models.CloudinaryField(
        'bmi_reports',
        folder="images/MemberSection/BMIs",  # Directory for uploaded BMI images
        null=True,
        blank=True,
        help_text="Upload a BMI report image (optional)."
    )
    diet_chart_image =cloudinary.models.CloudinaryField(
        'diet_charts',  # Directory for uploaded diet chart images
        folder="images/MemberSection/DietCharts",
        null=True,
        blank=True,
        help_text="Upload a diet chart image (optional)."
    )
    
    created_at = models.DateTimeField(auto_now_add=True)  # Auto-generated creation timestamp
    updated_at = models.DateTimeField(auto_now=True)  # Auto-generated last update timestamp

    def __str__(self):
        return f"{self.member.name}"

class Owner(models.Model):
    id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=220)
    description=models.TextField()
    profile_photo=cloudinary.models.CloudinaryField(
        'owner photo', 
        folder="images/OwnerData",
        help_text="Upload a profile photo"
    )
    aboutUsdescription=models.TextField()
    AboutUs_photo=cloudinary.models.CloudinaryField(
        'owner AboutUs image',
        folder="images/OwnerData", 
        help_text="Upload a AboutUs photo"
    )
    mission=models.TextField()
    vision=models.TextField()
    Goals=models.TextField()
    heroimage=cloudinary.models.CloudinaryField(
        'hero_section Image', 
        folder="images/OwnerData",
        help_text="Upload a Hero Image"
    )
    hero_content1=models.TextField()
    hero_content2=models.TextField()

    Address=models.TextField()
    officeMobileNo=models.CharField(max_length=10)
    officeEmail=models.EmailField(max_length=120)

    facebookLink=models.CharField(max_length=120)
    instagramLink=models.CharField(max_length=120)
    twitterLink=models.CharField(max_length=120)

    def save(self, *args, **kwargs):
        if not self.pk and Owner.objects.exists():
            raise ValueError("Only one Owner instance is allowed.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}"
    
class Trainer(models.Model):
    trainer_id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=120)
    password=models.CharField(max_length=255,blank=True, null=True , default="None")
    email= models.CharField(max_length=150)
    dateofbirth=models.DateField(default='2000-01-01')
    experience=models.PositiveIntegerField(default=1)
    trainer_info=models.TextField()
    trainer_profile_photo=cloudinary.models.CloudinaryField(
        'trainer profile photo', 
        folder="images/TrainerProfile",
        help_text="Upload a profile photo"
    )

    def __str__(self):
        return f"{self.trainer_id}_{self.name}"
    
class Gallery(models.Model):
    gallery_id=models.AutoField(primary_key=True)
    image = cloudinary.models.CloudinaryField('image',folder="images/Gallery", help_text="Upload a gallery image")
    def __str__(self):
        return f"{self.gallery_id}"
    

class OTPVerification(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"OTP for {self.email}"
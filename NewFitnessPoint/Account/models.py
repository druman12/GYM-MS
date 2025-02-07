from django.db import models
from datetime import datetime, timedelta
from django.utils import timezone  # type: ignore 

# Create your models here.
class Member(models.Model):
    name = models.CharField(max_length=150)
    dateofbirth=models.DateField(default='2023-01-01')
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

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}"


class MemberMedicalDetails(models.Model):
    member = models.ForeignKey('Member', on_delete=models.CASCADE)  # ForeignKey linking to MemberModel
    blood_group = models.CharField(max_length=3)  # To store blood group like 'A+', 'O-', etc.
    heart_conditions = models.TextField(null=True, blank=True)  # To store heart-related conditions (can be empty)
    orthopedic_conditions = models.TextField(null=True, blank=True)  # To store orthopedic-related conditions
    other_conditions = models.TextField(null=True, blank=True)  # To store any other medical conditions
    
    bmi_report_image = models.ImageField(
        upload_to='bmi_reports/',  # Directory for uploaded BMI images
        null=True,
        blank=True,
        help_text="Upload a BMI report image (optional)."
    )
    diet_chart_image = models.ImageField(
        upload_to='diet_charts/',  # Directory for uploaded diet chart images
        null=True,
        blank=True,
        help_text="Upload a diet chart image (optional)."
    )
    
    created_at = models.DateTimeField(auto_now_add=True)  # Auto-generated creation timestamp
    updated_at = models.DateTimeField(auto_now=True)  # Auto-generated last update timestamp

    def __str__(self):
        return f"{self.member.name}"

class Owner(models.Model):
    name=models.CharField(max_length=220)
    description=models.TextField()
    profile_photo=models.ImageField(
        upload_to='ownerphoto/', 
        help_text="Upload a profile photo"
    )
    aboutUsdescription=models.TextField()
    AboutUs_photo=models.ImageField(
        upload_to='ownerphoto/aboutUS_img', 
        help_text="Upload a AboutUs photo"
    )
    mission=models.TextField()
    vision=models.TextField()
    Goals=models.TextField()
    heroimage=models.ImageField(
        upload_to='ownerphoto/hero_section', 
        help_text="Upload a Hero Image"
    )
    hero_content1=models.TextField()
    hero_content2=models.TextField()

    Address=models.TextField()
    officeMobileNo=models.CharField(max_length=10)
    officeEmail=models.EmailField(max_length=120)

    def save(self, *args, **kwargs):
        if not self.pk and Owner.objects.exists():
            raise ValueError("Only one Owner instance is allowed.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}"
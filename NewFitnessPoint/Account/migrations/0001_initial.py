# Generated by Django 5.1.6 on 2025-03-28 10:24

import Account.models
import cloudinary.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Gallery',
            fields=[
                ('gallery_id', models.AutoField(primary_key=True, serialize=False)),
                ('image', cloudinary.models.CloudinaryField(help_text='Upload a gallery image', max_length=255, verbose_name='image')),
            ],
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('member_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=150)),
                ('password', models.CharField(blank=True, default='None', max_length=255, null=True)),
                ('dateofbirth', models.DateField(default='2000-01-01')),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], default='Male', max_length=10)),
                ('occupation', models.CharField(max_length=120)),
                ('age', models.IntegerField()),
                ('weight', models.FloatField()),
                ('height', models.FloatField()),
                ('address', models.TextField()),
                ('pincode', models.CharField(default='387001', max_length=6)),
                ('mobile_no', models.CharField(max_length=10)),
                ('email', models.CharField(max_length=150)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('subscription_plan', models.CharField(choices=[('1M', '1 Month'), ('3M', '3 Months'), ('6M', '6 Months'), ('1Y', '1 Year')], default='3M', max_length=2)),
                ('joining_date', models.DateField(default=Account.models.Member.get_tomorrow)),
                ('subscription_end_date', models.DateField(default=Account.models.Member.get_default_end_date, editable=False)),
                ('is_active', models.BooleanField(default=True, editable=False)),
            ],
        ),
        migrations.CreateModel(
            name='OTPVerification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('otp', models.CharField(max_length=6)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Owner',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=220)),
                ('description', models.TextField()),
                ('profile_photo', cloudinary.models.CloudinaryField(help_text='Upload a profile photo', max_length=255, verbose_name='owner photo')),
                ('aboutUsdescription', models.TextField()),
                ('AboutUs_photo', cloudinary.models.CloudinaryField(help_text='Upload a AboutUs photo', max_length=255, verbose_name='owner AboutUs image')),
                ('mission', models.TextField()),
                ('vision', models.TextField()),
                ('Goals', models.TextField()),
                ('heroimage', cloudinary.models.CloudinaryField(help_text='Upload a Hero Image', max_length=255, verbose_name='hero_section Image')),
                ('hero_content1', models.TextField()),
                ('hero_content2', models.TextField()),
                ('Address', models.TextField()),
                ('officeMobileNo', models.CharField(max_length=10)),
                ('officeEmail', models.EmailField(max_length=120)),
                ('facebookLink', models.CharField(max_length=120)),
                ('instagramLink', models.CharField(max_length=120)),
                ('twitterLink', models.CharField(max_length=120)),
            ],
        ),
        migrations.CreateModel(
            name='Trainer',
            fields=[
                ('trainer_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=120)),
                ('password', models.CharField(blank=True, default='None', max_length=255, null=True)),
                ('email', models.CharField(max_length=150)),
                ('dateofbirth', models.DateField(default='2000-01-01')),
                ('experience', models.PositiveIntegerField(default=1)),
                ('trainer_info', models.TextField()),
                ('trainer_profile_photo', cloudinary.models.CloudinaryField(help_text='Upload a profile photo', max_length=255, verbose_name='trainer profile photo')),
            ],
        ),
        migrations.CreateModel(
            name='MemberMedicalDetails',
            fields=[
                ('mmd_id', models.AutoField(primary_key=True, serialize=False)),
                ('blood_group', models.CharField(max_length=3)),
                ('heart_conditions', models.TextField(blank=True, null=True)),
                ('orthopedic_conditions', models.TextField(blank=True, null=True)),
                ('other_conditions', models.TextField(blank=True, null=True)),
                ('bmi_report_image', cloudinary.models.CloudinaryField(blank=True, help_text='Upload a BMI report image (optional).', max_length=255, null=True, verbose_name='bmi_reports')),
                ('diet_chart_image', cloudinary.models.CloudinaryField(blank=True, help_text='Upload a diet chart image (optional).', max_length=255, null=True, verbose_name='diet_charts')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Account.member')),
            ],
        ),
    ]

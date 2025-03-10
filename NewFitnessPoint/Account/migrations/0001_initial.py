# Generated by Django 3.2.25 on 2025-02-15 11:22

import Account.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Member',
            fields=[
                ('member_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=150)),
                ('dateofbirth', models.DateField(default='2023-01-01')),
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
            ],
        ),
        migrations.CreateModel(
            name='Owner',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=220)),
                ('description', models.TextField()),
                ('profile_photo', models.ImageField(help_text='Upload a profile photo', upload_to='ownerphoto/')),
                ('aboutUsdescription', models.TextField()),
                ('AboutUs_photo', models.ImageField(help_text='Upload a AboutUs photo', upload_to='ownerphoto/aboutUS_img')),
                ('mission', models.TextField()),
                ('vision', models.TextField()),
                ('Goals', models.TextField()),
                ('heroimage', models.ImageField(help_text='Upload a Hero Image', upload_to='ownerphoto/hero_section')),
                ('hero_content1', models.TextField()),
                ('hero_content2', models.TextField()),
                ('Address', models.TextField()),
                ('officeMobileNo', models.CharField(max_length=10)),
                ('officeEmail', models.EmailField(max_length=120)),
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
                ('bmi_report_image', models.ImageField(blank=True, help_text='Upload a BMI report image (optional).', null=True, upload_to='bmi_reports/')),
                ('diet_chart_image', models.ImageField(blank=True, help_text='Upload a diet chart image (optional).', null=True, upload_to='diet_charts/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Account.member')),
            ],
        ),
    ]

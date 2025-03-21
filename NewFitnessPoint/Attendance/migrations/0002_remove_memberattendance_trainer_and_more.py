# Generated by Django 5.1.6 on 2025-03-21 13:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0013_otpverification_member_password_trainer_password'),
        ('Attendance', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='allmemberattendance',
            name='trainer',
            field=models.ForeignKey(default=3, on_delete=django.db.models.deletion.DO_NOTHING, to='Account.trainer'),
            preserve_default=False,
        ),
    ]

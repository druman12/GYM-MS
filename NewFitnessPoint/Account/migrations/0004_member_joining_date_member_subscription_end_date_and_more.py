# Generated by Django 4.1.13 on 2025-02-02 06:02

import Account.models
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0003_rename_photo_owner_aboutus_photo_owner_profile_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='joining_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='member',
            name='subscription_end_date',
            field=models.DateField(default=Account.models.Member.get_default_end_date, editable=False),
        ),
        migrations.AddField(
            model_name='member',
            name='subscription_plan',
            field=models.CharField(choices=[('1M', '1 Month'), ('3M', '3 Months'), ('6M', '6 Months'), ('1Y', '1 Year')], default='3M', max_length=2),
        ),
    ]

# Generated by Django 5.1.6 on 2025-03-14 11:44

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0009_alter_trainer_trainer_profile_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trainer',
            name='trainer_profile_photo',
            field=cloudinary.models.CloudinaryField(help_text='Upload a profile photo', max_length=255, verbose_name='image/TrainerProfile'),
        ),
    ]

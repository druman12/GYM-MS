# Generated by Django 3.2.25 on 2025-02-15 17:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Exercise', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='workoutexercise',
            old_name='workout_plan',
            new_name='workoutplan_id',
        ),
    ]

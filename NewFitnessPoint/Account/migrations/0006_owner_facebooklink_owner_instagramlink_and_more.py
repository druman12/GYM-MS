# Generated by Django 5.1.6 on 2025-03-06 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0005_gallery'),
    ]

    operations = [
        migrations.AddField(
            model_name='owner',
            name='facebookLink',
            field=models.CharField(default='none', max_length=120),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='owner',
            name='instagramLink',
            field=models.CharField(default='none', max_length=120),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='owner',
            name='twitterLink',
            field=models.CharField(default='none', max_length=120),
            preserve_default=False,
        ),
    ]

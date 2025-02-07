# Generated by Django 4.1.13 on 2025-01-30 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Owner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=220)),
                ('description', models.TextField()),
                ('aboutUsdescription', models.TextField()),
                ('photo', models.ImageField(help_text='Upload a AboutUs photo', upload_to='ownerphoto/aboutUS_img')),
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
    ]

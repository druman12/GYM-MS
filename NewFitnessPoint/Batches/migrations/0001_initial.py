# Generated by Django 3.2.25 on 2025-02-16 09:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Account', '0002_trainer'),
    ]

    operations = [
        migrations.CreateModel(
            name='Batch',
            fields=[
                ('batch_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('session', models.CharField(choices=[('morning', 'Morning'), ('evening', 'Evening')], max_length=10)),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='BatchMembership',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('joined_date', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('batch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Batches.batch')),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Account.member')),
            ],
            options={
                'unique_together': {('member', 'batch')},
            },
        ),
        migrations.AddField(
            model_name='batch',
            name='members',
            field=models.ManyToManyField(through='Batches.BatchMembership', to='Account.Member'),
        ),
        migrations.AddField(
            model_name='batch',
            name='trainer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='batches', to='Account.trainer'),
        ),
    ]

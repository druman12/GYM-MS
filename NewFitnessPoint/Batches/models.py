from django.db import models
from Account.models import Trainer , Member

# Create your models here.
class Batch(models.Model):
    SESSION_CHOICES = [
        ('morning', 'Morning'),
        ('evening', 'Evening')
    ]
    batch_id=models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    session = models.CharField(max_length=10, choices=SESSION_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    trainer = models.ForeignKey(Trainer, on_delete=models.PROTECT, related_name='batches')
    members = models.ManyToManyField(Member, through='BatchMembership')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.session}"

class BatchMembership(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE)
    joined_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['member', 'batch']

    def __str__(self):
        return f"{self.member.name} - {self.batch.name}"
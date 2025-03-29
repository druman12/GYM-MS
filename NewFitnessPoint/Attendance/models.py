from django.utils import timezone
from django.db import models
from datetime import date
from Account.models import Member, Trainer

# Create your models here.
class MemberAttendance(models.Model):
    date = models.DateField(default=date.today)
    
    def __str__(self):
        return f"{self.date}"
    


class AllMemberAttendance(models.Model):
    date = models.ForeignKey(MemberAttendance, on_delete=models.CASCADE)
    member = models.ForeignKey(Member, on_delete=models.DO_NOTHING)
    trainer=models.ForeignKey(Trainer , on_delete=models.SET_NULL, null=True, blank=True)
    attendance_choice = [
        ('present', 'Present'),
        ('absent', 'Absent'),
    ]
    attendance = models.CharField(max_length=7, choices=attendance_choice, default='absent')

    def __str__(self):
        return f"{self.member} - {self.attendance}"

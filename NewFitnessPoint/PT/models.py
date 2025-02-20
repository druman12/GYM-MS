from django.db import models
from Account.models import Trainer, Member 

# Create your models here.
class Personal_training(models.Model):
    trainer=models.ForeignKey(Trainer , on_delete=models.CASCADE , to_field='trainer_id')
    members=models.ManyToManyField(Member ,  blank=True)

    def __str__(self):
        return f"PT of {self.trainer}"
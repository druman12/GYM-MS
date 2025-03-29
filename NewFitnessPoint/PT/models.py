from django.db import models
from Account.models import Trainer, Member 

# Create your models here.
class Personal_training(models.Model):
    trainer=models.ForeignKey(Trainer , on_delete=models.CASCADE , to_field='trainer_id')
    members=models.ManyToManyField(Member , blank=True ,  limit_choices_to={'is_active': True} )

    def __str__(self):
        return f"PT of {self.trainer}"
    
    def active_members(self):
        """Returns only members with valid subscription."""
        return self.members.filter(is_active=True)
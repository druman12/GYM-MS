from django.contrib import admin
from . import models
# Register your models here.
admin.site.register(models.Member)
admin.site.register(models.MemberMedicalDetails)
admin.site.register(models.Owner)
admin.site.register(models.Trainer)
admin.site.register(models.Gallery)
from rest_framework import serializers
from . import models

class MemberSerializer(serializers.ModelSerializer): 
    class Meta:
        model = models.Member
        fields='__all__'

class MemberMedicalDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MemberMedicalDetails
        fields='__all__'

class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Owner
        fields='__all__'
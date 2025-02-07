from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
# Create your views here.

from . import models , serializers

@csrf_exempt
def memberapi(request , id=0):
    if request.method=='GET':
        if id !=0:
            try:
                #if get request for particular id then it comes here.
                member=models.Member.objects.get(id=id)
                member_serializer=serializers.MemberSerializer(member)
                return JsonResponse(member_serializer.data,safe=False) 
            except models.Member.DoesNotExist:
                # Return a proper response if the member doesn't exist
                return JsonResponse('Member not found')
        else:
            #all records shared through api
            members=models.Member.objects.all()
            member_serializer=serializers.MemberSerializer(members,many=True)
            return JsonResponse(member_serializer.data,safe=False)
    elif request.method=='POST':
        #store new data
        #first JSON to python object then match with serializer then add new one.
        member_data=JSONParser().parse(request)
        member_serializer=serializers.MemberSerializer(data=member_data)
        if member_serializer.is_valid():
            member_serializer.save()
            return JsonResponse("added successfully !",safe=False)
        return JsonResponse("fail to add member", safe=False)
    
    elif request.method=='PUT':
        try:
            #update any data for id which is in it
            member_data=JSONParser().parse(request)
            fetchid=member_data.get('id')
            #find that one record which want to update
            member=models.Member.objects.get(id=fetchid)
            #check the entered data is valid then add it through python object
            member_serializer=serializers.MemberSerializer(member,data=member_data)
            if member_serializer.is_valid():
                member_serializer.save()
                return JsonResponse("Update successfully !",safe=False) 
            return JsonResponse("fail to Update member", safe=False)
        except models.Member.DoesNotExist:
            # Return a proper response if the member doesn't exist
            return JsonResponse('Member not found')
     
    elif request.method=='DELETE':
        #delete a record which id comes with request.
        member=models.Member.objects.get(id=id)
        member.delete()
        return JsonResponse("member is deleted" , safe=False)
    
@csrf_exempt
def membermedicaldetailsapi(request , id=0):
    if request.method=='GET':
        if id !=0:
            try:
                member=models.MemberMedicalDetails.objects.get(member_id=id)
                member_serializer=serializers.MemberMedicalDetailSerializer(member)
                return JsonResponse(member_serializer.data,safe=False) 
            except models.MemberMedicalDetails.DoesNotExist:
                # Return a proper response if the member doesn't exist
                return JsonResponse('Member not found')
        else:
            members=models.MemberMedicalDetails.objects.all()
            member_serializer=serializers.MemberMedicalDetailSerializer(members,many=True)
            return JsonResponse(member_serializer.data,safe=False)
    elif request.method=='POST':
        member_data=JSONParser().parse(request)
        member_serializer=serializers.MemberMedicalDetailSerializer(data=member_data)
        if member_serializer.is_valid():
            member_serializer.save()
            return JsonResponse("added successfully !",safe=False)
        return JsonResponse("fail to add member medical details", safe=False)
    
    elif request.method=='PUT':
        try:
            member_data=JSONParser().parse(request)
            #update data from the member id not medicaldetails id
            fetchid=member_data.get('member')
            member=models.MemberMedicalDetails.objects.get(member_id=fetchid)
            member_serializer=serializers.MemberMedicalDetailSerializer(member,data=member_data)
            if member_serializer.is_valid():
                member_serializer.save()
                return JsonResponse("Update successfully !",safe=False) 
            return JsonResponse("fail to Update member medical details", safe=False)
        except models.MemberMedicalDetails.DoesNotExist:
            # Return a proper response if the member doesn't exist
            return JsonResponse('Member not found')
     
    elif request.method=='DELETE':
        #delete data through member id 
        memberMdetails=models.MemberMedicalDetails.objects.get(member_id=id)
        memberMdetails.delete()
        return JsonResponse("member medical details is deleted" , safe=False)
    
@csrf_exempt
def Authenticate(request):
    if request.method =='POST':
        import json
        data=json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        try:
            user = models.Member.objects.get(email=email)
            db_date = str(user.dateofbirth)
            print(type(db_date))
            # Check if the password matches (for simplicity, assuming plain text here)
            if db_date == password :
                return JsonResponse({'success': True ,'user_id':user.id}) 
            else:
                return JsonResponse({'success' :False , 'error' : 'Invalid credentials'},status=401)
        except models.Member.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Invalid email or password'}, status=401)
    return JsonResponse({'error':'Invalid method'} ,status=405)


@csrf_exempt
def OwnerDetailsapi(request):
    if request.method=='GET':
        #all records shared through api
        owner=models.Owner.objects.all()
        owner_serializer=serializers.OwnerSerializer(owner,many=True)
        return JsonResponse(owner_serializer.data,safe=False)
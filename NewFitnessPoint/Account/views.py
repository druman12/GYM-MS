from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from django.db import connection


@csrf_exempt
def memberapi(request , id=0):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            if id != 0:
                # Fetch a specific member by ID (all columns)
                cursor.execute("SELECT * FROM account_member WHERE member_id = %s", [id])
                row = cursor.fetchone()
                if row:
                    columns = [col[0] for col in cursor.description]  # Get column names
                    member = dict(zip(columns, row))  # Map column names to values
                    return JsonResponse(member, safe=False)
                else:
                    return JsonResponse({'message': 'Member not found'}, status=404)
            else:
                # Fetch all members (all columns)
                cursor.execute("SELECT * FROM account_member")
                rows = cursor.fetchall()
                columns = [col[0] for col in cursor.description]  # Get column names
                members = [dict(zip(columns, row)) for row in rows]  # Convert to list of dicts
                return JsonResponse(members, safe=False)
            
    # elif request.method=='POST':
    #     #store new data
    #     #first JSON to python object then match with serializer then add new one.
    #     member_data=JSONParser().parse(request)
    #     member_serializer=serializers.MemberSerializer(data=member_data)
    #     if member_serializer.is_valid():
    #         member_serializer.save()
    #         return JsonResponse("added successfully !",safe=False)
    #     return JsonResponse("fail to add member", safe=False)
    
#     elif request.method=='PUT':
#         try:
#             #update any data for id which is in it
#             member_data=JSONParser().parse(request)
#             fetchid=member_data.get('id')
#             #find that one record which want to update
#             member=models.Member.objects.get(id=fetchid)
#             #check the entered data is valid then add it through python object
#             member_serializer=serializers.MemberSerializer(member,data=member_data)
#             if member_serializer.is_valid():
#                 member_serializer.save()
#                 return JsonResponse("Update successfully !",safe=False) 
#             return JsonResponse("fail to Update member", safe=False)
#         except models.Member.DoesNotExist:
#             # Return a proper response if the member doesn't exist
#             return JsonResponse('Member not found')
     
#     elif request.method=='DELETE':
#         #delete a record which id comes with request.
#         member=models.Member.objects.get(id=id)
#         member.delete()
#         return JsonResponse("member is deleted" , safe=False)
    
@csrf_exempt
def membermedicaldetailsapi(request , id=0):
    if request.method=='GET':
        with connection.cursor() as cursor:
            if id != 0:
                # Fetch a specific member by ID (all columns)
                cursor.execute("SELECT * FROM account_membermedicaldetails WHERE member_id = %s", [id])
                row = cursor.fetchone()
                if row:
                    columns = [col[0] for col in cursor.description]  # Get column names
                    memberMD = dict(zip(columns, row))  # Map column names to values
                    return JsonResponse(memberMD, safe=False)
            else:
                # Fetch all members (all columns)
                cursor.execute("SELECT * FROM account_membermedicaldetails")
                rows = cursor.fetchall()
                columns = [col[0] for col in cursor.description]  # Get column names
                membersMD = [dict(zip(columns, row)) for row in rows]  # Convert to list of dicts
                return JsonResponse(membersMD, safe=False)
        
#     elif request.method=='POST':
#         member_data=JSONParser().parse(request)
#         member_serializer=serializers.MemberMedicalDetailSerializer(data=member_data)
#         if member_serializer.is_valid():
#             member_serializer.save()
#             return JsonResponse("added successfully !",safe=False)
#         return JsonResponse("fail to add member medical details", safe=False)
    
#     elif request.method=='PUT':
#         try:
#             member_data=JSONParser().parse(request)
#             #update data from the member id not medicaldetails id
#             fetchid=member_data.get('member')
#             member=models.MemberMedicalDetails.objects.get(member_id=fetchid)
#             member_serializer=serializers.MemberMedicalDetailSerializer(member,data=member_data)
#             if member_serializer.is_valid():
#                 member_serializer.save()
#                 return JsonResponse("Update successfully !",safe=False) 
#             return JsonResponse("fail to Update member medical details", safe=False)
#         except models.MemberMedicalDetails.DoesNotExist:
#             # Return a proper response if the member doesn't exist
#             return JsonResponse('Member not found')
     
#     elif request.method=='DELETE':
#         #delete data through member id 
#         memberMdetails=models.MemberMedicalDetails.objects.get(member_id=id)
#         memberMdetails.delete()
#         return JsonResponse("member medical details is deleted" , safe=False)
    
# @csrf_exempt
# def Authenticate(request):
#     if request.method =='POST':
#         import json
#         data=json.loads(request.body)
#         email = data.get('email')
#         password = data.get('password')
#         try:
#             user = models.Member.objects.get(email=email)
#             db_date = str(user.dateofbirth)
#             print(type(db_date))
#             # Check if the password matches (for simplicity, assuming plain text here)
#             if db_date == password :
#                 return JsonResponse({'success': True ,'user_id':user.id}) 
#             else:
#                 return JsonResponse({'success' :False , 'error' : 'Invalid credentials'},status=401)
#         except models.Member.DoesNotExist:
#             return JsonResponse({'success': False, 'error': 'Invalid email or password'}, status=401)
#     return JsonResponse({'error':'Invalid method'} ,status=405)


@csrf_exempt
def OwnerDetailsapi(request):
    if request.method=='GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM account_owner")
            row=cursor.fetchone()
            if row:
                columns = [col[0] for col in cursor.description]  # Get column names
                owner = dict(zip(columns, row))  # Map column names to values
                return JsonResponse(owner, safe=False)

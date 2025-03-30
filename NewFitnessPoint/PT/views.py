from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from Account.models import Member, Trainer
from .models import Personal_training

@csrf_exempt
def get_trainer_members(request, trainer_id):
    if request.method == 'GET':
        # Get the trainer instance
        trainer = Trainer.objects.filter(trainer_id=trainer_id).first()
        if not trainer:
            return JsonResponse({"error": "Trainer not found"}, status=404)

        # Get members assigned to the trainer through Personal_training
        members = Member.objects.filter(
            personal_training__trainer=trainer
        ).values('member_id', 'name', 'subscription_plan', 'joining_date')

        member_list = list(members)

        return JsonResponse({
            "trainer_id": trainer_id,
            "members": member_list,
            "PT_count": len(member_list)
        }, status=200)

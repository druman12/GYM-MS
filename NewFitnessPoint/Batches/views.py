from django.http import JsonResponse
from .models import Batch, BatchMembership
from Account.models import Trainer, Member

def trainer_batches(request, trainer_id):
   
    # Check if trainer exists
    try:
        trainer = Trainer.objects.get(trainer_id=trainer_id)
    except Trainer.DoesNotExist:
        return JsonResponse({'error': 'Trainer not found'}, status=404)
    
    # Get all batches for the trainer
    batches = Batch.objects.filter(trainer_id=trainer_id)
    batch_count = batches.count()
    
    if batch_count == 0:
        return JsonResponse({
            'trainer_id': trainer_id,
            'trainer_name': trainer.name if hasattr(trainer, 'name') else 'Unknown',
            'batch_count': 0,
            'batches': []
        })
    
    # Prepare response data
    batches_data = []
    
    for batch in batches:
        # Get memberships for this batch
        memberships = BatchMembership.objects.filter(batch=batch)
        members_data = []
        
        for membership in memberships:
            member = membership.member
            # Get subscription plan - assuming Member model has subscription_plan field
            subscription_plan = getattr(member, 'subscription_plan', 'No Plan')
            
            members_data.append({
                'member_id': member.member_id,
                'name': member.name if hasattr(member, 'name') else 'Unknown',
                'joining_date': membership.joined_date.isoformat(),
                'subscription_plan': subscription_plan
            })
        
        # Build batch data dictionary
        batch_data = {
            'batch_id': batch.batch_id,
            'name': batch.name,
            'session': batch.get_session_display(),
            'timing': f"{batch.start_time.strftime('%I:%M %p')} - {batch.end_time.strftime('%I:%M %p')}",
            'member_count': len(members_data),
            'members': members_data
        }
        
        batches_data.append(batch_data)
    
    # Build the complete response
    response_data = {
        'trainer_id': trainer_id,
        'trainer_name': trainer.name if hasattr(trainer, 'name') else 'Unknown',
        'batch_count': batch_count,
        'batches': batches_data
    }
    
    return JsonResponse(response_data)
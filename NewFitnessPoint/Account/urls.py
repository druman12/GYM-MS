from django.urls import path
from . import views

urlpatterns = [
    path('login/',views.Authenticate,name='login'),
    path('member/', views.memberapi ,name='api-member'),
    path('member/<int:id>/', views.memberapi , name='api-put'),
    path('membermedicaldetails/', views.membermedicaldetailsapi,name='api-mmd'),
    path('membermedicaldetails/<int:id>/', views.membermedicaldetailsapi,name='api-mmd-put'),
    path('ownerdetails/',views.OwnerDetailsapi , name='owner details'),
    path('trainer/<int:id>/',views.trainerapi , name='trainer details'),
    path('trainers/',views.trainerapi , name='all trainers details'),
    path('gallery/',views.getGalleryImages , name='gallery details'),
]
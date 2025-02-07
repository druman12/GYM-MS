from django.urls import path
from . import views

urlpatterns = [
    path('login/',views.Authenticate,name='login'),
    path('api/member/', views.memberapi ,name='api-member'),
    path('api/member/<int:id>/', views.memberapi , name='api-put'),
    path('api/membermedicaldetails/', views.membermedicaldetailsapi,name='api-mmd'),
    path('api/membermedicaldetails/<int:id>/', views.membermedicaldetailsapi,name='api-mmd-put'),
    path('api/ownerdetails/',views.OwnerDetailsapi , name='owner details'),
]
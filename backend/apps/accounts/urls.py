from django.urls import path 
from .views import UserAccount,validateUser,updatePassword


urlpatterns = [
    path('user/<int:id>',UserAccount),
    path('user/password/',updatePassword),
    path('user/',UserAccount),
    path('user/validate/',validateUser),
]

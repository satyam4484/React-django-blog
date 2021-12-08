from django.urls import path 
from .views import Articles,getCategory,getArticleByCategory,getUserPosts
urlpatterns = [
    path('articles/',Articles),
    path('articles/<int:id>',Articles),
    path('category/',getCategory),
    path('category/<str:name>',getArticleByCategory),
    path('articles/user/',getUserPosts)
]

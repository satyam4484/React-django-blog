from rest_framework import serializers
from .models import Article
from django.contrib.auth import get_user_model
User = get_user_model()
import datetime

class ArticleSerializer(serializers.ModelSerializer):
    author=serializers.SerializerMethodField()
    created = serializers.SerializerMethodField()
    class Meta:
        model = Article
        fields=['id','title','content','author','category','created','image']
    def get_created(self,Article):
        date = Article.createdOn.strftime("%a %w %b %Y")
        return date
    def get_author(self,Article):
        user = User.objects.filter(id = Article.author_id).values("id","first_name","last_name","email")
        return user
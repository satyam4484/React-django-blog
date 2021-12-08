from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Categories(models.TextChoices):
    WORLD = 'world'
    ENVIRONMENT = 'environment'
    TECHNOLOGY = 'technology'
    DESIGN = 'design'
    CULTURE = 'culture'
    BUSINESS = 'business'
    POLITICS = 'politics'
    OPINION = 'opinion'
    SCIENCE = 'science'
    HEALTH = 'health'
    STYLE = 'style'
    TRAVEL = 'travel'

class Article(models.Model):
    author = models.ForeignKey(User,on_delete=models.CASCADE,verbose_name='author')
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to="blog/",default="r2.jpeg")
    content = models.TextField()
    createdOn = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=50, choices=Categories.choices, default=Categories.WORLD)

    def __str__(self) -> str:
        return self.title
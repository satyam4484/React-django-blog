from rest_framework import serializers
from rest_framework.views import APIView
from .models import Article
from .serializers import ArticleSerializer
from rest_framework.decorators import api_view,permission_classes,parser_classes
from rest_framework.parsers import FormParser,MultiPartParser
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, BasePermission



@api_view(['GET'])
def getUserPosts(request):
    try:
        article = Article.objects.filter(author_id = request.user.id)
        serializer = ArticleSerializer(article,many=True,context={"request": request})
        return Response({"error":False,"msg":"","additional":"","data":serializer.data})
    except Exception as e:
        return Response({"error":True,"msg":str(e),"additional":"erorr occured in getting user posts","data":""})


@api_view(['GET'])
@permission_classes([AllowAny])
def getCategory(request):
    try:
        category = [{'label':'WORLD','value':'world'},{'label':'ENVIRONMENT','value':'environment'},{'label':'TECHNOLOGY','value':'technology'},{'label':'DESIGN','value':'design'},{'label':'CULTURE','value':'culture'},{'label':'BUSINESS','value' : 'business'},{'label':'POLITICS' ,'value': 'politics'},{'label':'OPINION' ,'value':'opinion'},{'label':'SCIENCE' ,'value': 'science'},{'label':'HEALTH ','value':'health'},{'label':'STYLE' ,'value':'style'},{'label':'TRAVEL','value': 'travel'}]
        return Response({"error":False,"msg":"","additional":"s","data":category})
    except Exception as e:
        return Response({"error":True,"msg":str(e),"additional":"erorr occured in getting Categories","data":""})

@api_view(['GET'])
@permission_classes([AllowAny])
def getArticleByCategory(request,name):
    try:
        category = name
        object = Article.objects.filter(category = category)
        serializer = ArticleSerializer(object,many=True,context={"request": request})
        return Response({"error":False,"msg":"","additional":"","data":serializer.data})
    except Exception as e:
        return Response({"error":True,"msg":str(e),"additional":"erorr occured in Article by Category","data":""})

class MyPermissions(BasePermission):
    def has_permission(self, request,view):
        if request.method == "GET":
            return True
        return request.user and request.user.is_authenticated


@api_view(['GET','POST','DELETE','PATCH'])
@permission_classes([MyPermissions])
@parser_classes([MultiPartParser,FormParser])
def Articles(request,id=None):
    if request.method == "GET":
        try:
            if id:
                object  = Article.objects.get(id = id)
                article = ArticleSerializer(object,context={"request": request})
                return Response({"error":False,"msg":"","additional":"","data":article.data})
            else:
                object = Article.objects.all()
                article = ArticleSerializer(object,many=True,context={"request": request})
                return Response({"error":False,"msg":"","additional":"","data":article.data})
        except Exception as e:
            return Response({"error":True,"msg":str.py(e),"additional":"erorr occured in getting articles","data":""})
    elif request.method == "POST":
        try:
            data = request.data
            serializer = ArticleSerializer(data=data,context={"request": request})
            if serializer.is_valid():
                serializer.save(author_id = request.user.id)
                return Response({"error":False,"msg":"Article Created Successfully!","additional":"","data":""})
            else :
                return Response({"error":True,"msg":str(serializer.errors),"additional":"erorr occured in creating articles","data":""})
        except Exception as e:
            return Response({"error":True,"msg":str(e),"additional":"erorr occured in creating articles","data":""})
    elif request.method == "DELETE":
        try:
            article = Article.objects.get(id  = id)
            article.delete()
            return Response({"error":False,"msg":"Article Deleted Successfully!","additional":"","data":""})
        except Exception as e:
            return Response({"error":True,"msg":str(e),"additional":"erorr occured in deleting articles","data":""})
    elif request.method == "PATCH":
        try:
            if id:
                article = Article.objects.get(id = id)
                data = request.data
                serializer = ArticleSerializer(data = data,instance=article)
                if serializer.is_valid():
                    serializer.save()
                    return Response({"error":False,"msg":"Article Updated Successfully!","additional":"","data":serializer.data})
                else :
                    return Response({"error":True,"msg":str(serializer.errors),"additional":"erorr occured in updating articles","data":""})
            else:
                return Response({"error":True,"msg":"Enter a valid id","additional":"erorr occured in updating articles","data":""})

        except Exception as e:
            return Response({"error":True,"msg":str(e),"additional":"erorr occured in updating articles","data":""})




    


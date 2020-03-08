from django.shortcuts import render
from rest_framework.views import  APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework import  filters

from rest_framework import  viewsets
from first import  models, serializers
from first import permissions
# Create your views here.

class HelloApi(APIView):
    """test api views"""

    def get(self, request, format=None):
        """return a list of apis"""
        anApiView = [
        'useing the api view',
        'to represent the test of apiviews'
        ]
        return Response({'messages': 'succesfully working JSON','apiview': anApiView})


class UserProfileViewSet(viewsets.ModelViewSet):
    """handle creating and updating profiles"""
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'email')

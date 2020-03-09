from django.shortcuts import render
from rest_framework.views import  APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import  ObtainAuthToken
from rest_framework.settings import  api_settings
from rest_framework import  filters

from rest_framework import  viewsets
from first import  models, serializers
from first import permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
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

class userLoginApiView(ObtainAuthToken):
    """handle creating user login authentications tokens"""
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class UserProfileFeedViewSet(viewsets.ModelViewSet):
    """handles creating updating , reading profiles feeds"""

    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.ProfileFeedSerializer
    queryset = models.ProfileFeed.objects.all()
    permission_classes = (permissions.UpdateOwnStatus,IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        """sets the user profile to the logged n user"""
        serializer.save(user_profile=self.request.user)

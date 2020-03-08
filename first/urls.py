from django.contrib import admin
from django.urls import path, include
from .views import  HelloApi
from rest_framework.routers import DefaultRouter
from first import  views

router = DefaultRouter()
router.register('profile', views.UserProfileViewSet)

urlpatterns = [
    path('view', HelloApi.as_view()),
    path('', include(router.urls))
]

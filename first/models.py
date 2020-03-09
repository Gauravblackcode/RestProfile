from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.conf import settings

# Create your models here.

class UserProfileManager(BaseUserManager):
    """Manager for user profiles"""
    def create_user(self, email , name , password=None):
        """create a new user profile"""
        if not email:
            raise ValueError('user must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        user.set_password(password)
        user.save(using=self._db)

        return user
    def create_superuser(self, email, name, password):
        """create and save asuper user with given credentials"""
        user = self.create_user(email, name, password)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user



class UserProfile(AbstractBaseUser, PermissionsMixin):
    """ database models for user in the syste """
    email = models.EmailField(max_length=225, unique=True,)
    name = models.CharField(max_length=225)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    #for custom user models
    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        """retrive full name fo user """
        return self.name

    def get_short_name(self):
        """retrive shor name of user"""
        return self.name
    def __str__(self):
        """return strin reprenstation od user"""
        return self.email

class ProfileFeed(models.Model):
    """profile status update"""
    user_profile = models.ForeignKey(
    settings.AUTH_USER_MODEL,on_delete=models.CASCADE
    )
    status_text = models.CharField(max_length=255)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.status_text

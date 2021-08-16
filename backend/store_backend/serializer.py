from rest_framework import serializers
from rest_framework_simplejwt import tokens
from django.contrib.auth.models import User
from .models import Products


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'name', 'isAdmin']

    @staticmethod
    def get_name(obj):
        name = f'{obj.first_name} {obj.last_name}'
        if name == '':
            name = obj.email

        return name

    @staticmethod
    def get__id(obj):
        _id = obj.id

        return _id

    @staticmethod
    def get_isAdmin(obj):
        isAdmin = obj.is_staff

        return isAdmin


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'name', 'token']

    @staticmethod
    def get_token(obj):
        token = tokens.RefreshToken.for_user(obj)
        return str(token.access_token)

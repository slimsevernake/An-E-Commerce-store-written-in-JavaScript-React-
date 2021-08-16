from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from store_backend.serializer import UserSerializerWithToken
from rest_framework.decorators import api_view

from rest_framework import response, status
from django.contrib.auth.models import User
from django.db.utils import IntegrityError
import time

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        serializer = serializer.items()

        for key, value in serializer:
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["POST"])
def createUser(request):
    time.sleep(5)
    userDetails = request.data
    try:
        user = User.objects.create_user(
            username=userDetails["email"],
            first_name=userDetails["first_name"],
            last_name=userDetails["last_name"],
            email=userDetails['email'],
            password=userDetails['password']
        )
        user.save()
        userDetails = User.objects.get(username=userDetails['email'])
        serializer = UserSerializerWithToken(userDetails, many=False)
        return response.Response(serializer.data)
    except IntegrityError:
        return response.Response({"details": "A user has already been registered with this email address"},
                                 status=status.HTTP_400_BAD_REQUEST)

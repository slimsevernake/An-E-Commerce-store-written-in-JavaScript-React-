from rest_framework.decorators import api_view
from rest_framework import response
from store_backend.serializer import UserSerializer


@api_view(['GET'])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return response.Response(serializer.data)

from rest_framework.decorators import api_view
from rest_framework import response, status

# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework.permissions import IsAdminUser
# from django.contrib.auth.models import User
# from django.db.utils import IntegrityError

from store_backend.models import Products
from store_backend.serializer import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    getProducts_products = Products.objects.all()
    serializer = ProductSerializer(getProducts_products, many=True)
    return response.Response(serializer.data)


@api_view(['GET'])
def getProduct(request, id):
    getProduct_products = Products.objects.get(_id=id)
    serializer = ProductSerializer(getProduct_products, many=False)
    return response.Response(serializer.data)

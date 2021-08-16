from django.urls import path
from .views.product_views import getProduct, getProducts
from .views.auth_views import MyTokenObtainPairView, createUser
from .views.admin_views import getUsers
from .views.user_views import getUserProfile

urlpatterns = [
    # path("", views.getRoutes, name="getRoutesView"),/
    # Admin Paths
    path("users", getUsers, name='get-users'),
    # Auth Paths
    path("users/register", createUser, name='register-user'),
    path("users/login", MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # User Paths
    path("users/profile", getUserProfile, name="user-profile"),
    # Product Paths
    path("products", getProducts, name="getProductsView"),
    path("product/<int:id>", getProduct, name="getProductView")
]

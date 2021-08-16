from django.contrib import admin
from .models import Products, Review, Order, OrderItem, ShippingAddress

# Register your models here.

admin.site.register([Products, Review, Order, OrderItem, ShippingAddress])
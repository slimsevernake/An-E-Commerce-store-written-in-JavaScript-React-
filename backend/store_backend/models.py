from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Products(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(to=User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    brands = models.CharField(max_length=255, null=True, blank=True)
    category = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=5, decimal_places=2, blank=True, null=True)
    numReviews = models.IntegerField(default=0, null=True, blank=True)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(blank=True, null=True)

    def __str__(self) -> str:
        return self.name


class Review(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(to=User, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(
        to=Products, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name


class Order(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(to=User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True, editable=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True, editable=True)
    createdAt = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self) -> str:
        return str(self._id) + str(self.user)


class OrderItem(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    order = models.ForeignKey(to=Order, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(
        to=Products, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    quantity = models.IntegerField(
        null=True, blank=True, default=1, editable=True)
    price = models.DecimalField(max_digits=7,decimal_places=2, blank=True, null=True)
    image = models.ImageField(blank=True, null=True)

    def __str__(self) -> str:
        return self.name


class ShippingAddress(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    order = models.OneToOneField(
        to=Order, on_delete=models.SET_NULL, null=True, unique=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=150, null=True, blank=True)
    postalCode = models.CharField(max_length=150, null=True, blank=True)
    city = models.CharField(max_length=150, null=True, blank=True)
    shippingPrice = models.DecimalField(
        decimal_places=2, blank=True, null=True, max_digits=7)

    def __str__(self) -> str:
        return self.address

from django.db.models.signals import pre_save
from django.contrib.auth.admin import User


def updateUsername(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email


pre_save.connect(updateUsername, sender=User)

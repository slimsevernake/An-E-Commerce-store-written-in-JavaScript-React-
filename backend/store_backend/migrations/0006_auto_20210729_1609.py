# Generated by Django 3.1.4 on 2021-07-29 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store_backend', '0005_auto_20210729_1537'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='products',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]

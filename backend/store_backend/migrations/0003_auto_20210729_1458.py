# Generated by Django 3.1.4 on 2021-07-29 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store_backend', '0002_auto_20210729_1458'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True),
        ),
    ]
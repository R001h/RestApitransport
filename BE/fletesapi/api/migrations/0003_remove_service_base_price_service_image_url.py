# Generated by Django 5.1.2 on 2024-11-26 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_service_prueba'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='service',
            name='base_price',
        ),
        migrations.AddField(
            model_name='service',
            name='image_url',
            field=models.TextField(blank=True, null=True),
        ),
    ]

# Generated by Django 5.1.2 on 2024-11-26 22:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_order'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='DriverAssignment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vehicle', models.CharField(blank=True, max_length=255, null=True)),
                ('assigned_at', models.DateTimeField(auto_now_add=True)),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assignments', to=settings.AUTH_USER_MODEL)),
                ('order', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='driver_assignment', to='api.order')),
            ],
        ),
    ]

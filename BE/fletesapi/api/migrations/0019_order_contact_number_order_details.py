# Generated by Django 5.1.3 on 2024-12-13 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_alter_jobassignment_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='contact_number',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='details',
            field=models.TextField(blank=True, null=True),
        ),
    ]

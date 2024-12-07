
from django.db import migrations
from django.contrib.auth.models import Group

def create_default_groups(apps, schema_editor):
    # Crea los grupos o roles por defecto si no existen
    Group.objects.get_or_create(name="Admin")
    Group.objects.get_or_create(name="Employee")
    Group.objects.get_or_create(name="Client")
    Group.objects.get_or_create(name="Driver")
    Group.objects.get_or_create(name="Codriver")

class Migration(migrations.Migration):
    dependencies = [
        # Aquí pones las migraciones previas de tu aplicación.
        # Por ejemplo, si tu última migración es la 0002, sería:
        ('api', '0011_task'),  # Ajusta el nombre según tu última migración
    ]

    operations = [
        migrations.RunPython(create_default_groups),  # Ejecuta la función de creación de grupos
    ]

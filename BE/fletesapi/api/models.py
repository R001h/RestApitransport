from django.db import models
import django_filters
from django.contrib.auth.models import User

############user



# Modelo para representar servicios ofrecidos
class Service(models.Model):
    name = models.CharField(max_length=255)  # Nombre del servicio
    description = models.TextField(blank=True, null=True)  # Descripción opcional del servicio
    image_url = models.TextField(blank=True, null=True)  # URL de la imagen asociada al servicio
    created_at = models.DateTimeField(auto_now_add=True)  # Fecha y hora de creación

    def __str__(self):
        return self.name  # Representación en formato de texto
    
    
############################################################################################################    


# Modelo para los pedidos
class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_process', 'In Process'),
        ('completed', 'Completed'),
        ('canceled', 'Canceled'),
    ]

    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="orders")
    contact_number = models.CharField(max_length=15, blank=True, null=True)  # Número de contacto del cliente
    details = models.TextField(blank=True, null=True)  # Detalles adicionales
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} - {self.client.username}"


   
############################################################################################################    


class Task(models.Model):
    PENDING = 'Pending'
    IN_PROGRESS = 'In Progress'
    COMPLETED = 'Completed'

    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (IN_PROGRESS, 'In Progress'),
        (COMPLETED, 'Completed'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)
    
    def __str__(self):
        return self.title
    
   
############################################################################################################        



# Modelo para registrar el historial de estados de los pedidos
class OrderHistory(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="history")
    status = models.CharField(max_length=50)
    changed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="status_changes")
    changed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.order.id} - Status {self.status}"

   
############################################################################################################    


# Modelo para los reclamos de clientes
class Complaint(models.Model):
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name="complaints")
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="complaints")
    description = models.TextField()
    status = models.CharField(max_length=50, default='open')  # "open", "resolved", "closed"
    created_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"Complaint {self.id} - Order {self.order.id}"
   
############################################################################################################    


# Modelo para asignación de trabajos a empleados o 
class JobAssignment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]
    
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="job_assignments")
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')
    assigned_at = models.DateTimeField(auto_now_add=True)
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='job_assignments')

    def __str__(self):
        return f"Assignment for {self.assigned_to.username} on Order {self.order.id} - Status: {self.status}"

   
############################################################################################################    



# Modelo para los comentarios de los clientes sobre los servicios prestados

class ServiceFeedback(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="feedbacks")
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name="feedbacks")
    rating = models.IntegerField()  # Validaremos que esté entre 1 y 5
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback for Order {self.order.id} by {self.client.username}"

    def clean(self):
        if self.rating < 1 or self.rating > 5:
            raise ValidationError("The rating must be between 1 and 5.")

   
############################################################################################################    


#  Modelo para los vehículos
class Vehicle(models.Model):
    vehicle_type = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    year = models.IntegerField()

    def __str__(self):
        return f"{self.model} - {self.vehicle_type}"


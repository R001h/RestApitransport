from django.contrib.auth.models import User,Group
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import (
    Service,
    Order,
    DriverAssignment,
    OrderHistory,
    Complaint,
    JobAssignment,
    ServiceFeedback,
    Vehicle,
    Task,
)

############################################################################################################    


class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']  # Incluye 'role' en los campos

    def get_role(self, obj):
        # Devuelve el nombre del primer grupo (rol) al que pertenece el usuario
         if obj.groups.exists():
            group = obj.groups.first()
            return group.name if group.name else None
        

############################################################################################################    


class UserRegisterSerializer(serializers.ModelSerializer):
    # Añadimos un campo para confirmar la contraseña
    password_confirm = serializers.CharField(write_only=True)
    role = serializers.CharField(write_only=True, required=False, default='client')  # Rol predeterminado

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password', 'password_confirm', 'role']

    def validate(self, attrs):
        # Verificar si las contraseñas coinciden
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Las contraseñas no coinciden.")
        return attrs

    def validate_password(self, value):
        # Validación para asegurarse de que la contraseña tenga al menos 6 caracteres
        if len(value) < 6:
            raise serializers.ValidationError("La contraseña debe tener al menos 6 caracteres.")
        return value

    def validate_role(self, value):
        # Validar que el rol sea uno permitido
        allowed_roles = Group.objects.values_list('name', flat=True)  # Lista de roles permitidos
        if value not in allowed_roles:
            raise serializers.ValidationError(f"El rol '{value}' no está permitido.")
        return value

    def create(self, validated_data):
        validated_data.pop('password_confirm')  # No se almacena en la base de datos
        role = validated_data.pop('role', None)  # Rol predeterminado

        # Crear el usuario
        user = User(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  # Encriptar contraseña
        user.save()

        # Asignar el grupo basado en el rol
        try:
            group = Group.objects.get(name=role)
            user.groups.add(group)  # Añadir el grupo al usuario
        except Group.DoesNotExist:
            raise serializers.ValidationError(f"El grupo '{role}' no existe. Verifica los roles en el sistema.")

        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)

        if 'password' in validated_data:
            instance.set_password(validated_data['password'])

        instance.save()
        return instance


########################################################################################33

class DriverSerializer(ModelSerializer):
    class Meta:
        model = User 
        fields = '__all__'

#####################################################################################
class TaskSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  # Acepta ID del usuario
    assigned_to_name = serializers.CharField(source='assigned_to.username', read_only=True)  # Nombre del usuario

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'assigned_to', 'assigned_to_name', 'status']

    def create(self, validated_data):
        # Crear y devolver la tarea
        return Task.objects.create(**validated_data)

        


###########################################################################################33


# Serializador para el servicio

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

    def validate_image_url(self, value):
        if value and not value.startswith("http"):
            raise serializers.ValidationError("La URL de la imagen debe comenzar con 'http'.")
        return value

###################################################################################################################


# Serializador para el pedido
class OrderSerializer(serializers.ModelSerializer):
    client = serializers.StringRelatedField(read_only=True)
    driver = serializers.StringRelatedField(read_only=True)
    service = ServiceSerializer(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
        

###################################################################################################################

# Serializador para la asignación de conductores
class DriverAssignmentSerializer(serializers.ModelSerializer):
    driver = serializers.StringRelatedField(read_only=True)
    order = OrderSerializer(read_only=True)

    class Meta:
        model = DriverAssignment
        fields = '__all__'


###################################################################################################################


# Serializador para el historial de estados de un pedido
class OrderHistorySerializer(serializers.ModelSerializer):
    order = OrderSerializer(read_only=True)
    changed_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = OrderHistory
        fields = '__all__'


###################################################################################################################


class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = ['id', 'client', 'order', 'description', 'status', 'created_at', 'resolved_at']
        read_only_fields = ['client', 'created_at', 'resolved_at']

    def update(self, instance, validated_data):
        # Manejo automático de 'resolved_at'
        if validated_data.get('status') == 'resolved':
            validated_data['resolved_at'] = now()
        elif validated_data.get('status') != instance.status:
            validated_data['resolved_at'] = None
        return super().update(instance, validated_data)

    def validate_status(self, value):
        # Validación simple del campo 'status'
        allowed_statuses = ['open', 'in-progress', 'resolved']
        if value not in allowed_statuses:
            raise serializers.ValidationError(f"Estado inválido. Valores permitidos: {allowed_statuses}")
        return value



############################################################################################################    


# Serializer para el modelo JobAssignment
class JobAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobAssignment
        fields = ['id', 'employee', 'order', 'assigned_at']
        read_only_fields = ['assigned_at']



############################################################################################################    


# Serializer para el modelo ServiceFeedback
class ServiceFeedbackSerializer(serializers.ModelSerializer):
    client = serializers.StringRelatedField()

    class Meta:
        model = ServiceFeedback
        fields = ['id', 'order', 'client', 'rating', 'comment', 'created_at']
        read_only_fields = ['created_at', 'client']


############################################################################################################    


# Serializer para el modelo Vehicle
class VehicleSerializer(serializers.ModelSerializer):
    driver = serializers.StringRelatedField()

    class Meta:
        model = Vehicle
        fields = ['id', 'vehicle_type', 'model', 'year', 'driver']
        read_only_fields = ['driver']



from rest_framework.views import APIView 
from rest_framework import generics, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User, Group
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from rest_framework.exceptions import NotFound, PermissionDenied
from .models import Service, Order, Complaint, JobAssignment, ServiceFeedback, Vehicle, Task
from .serializers import UserRegisterSerializer, UserSerializer, ServiceSerializer, OrderSerializer, DriverSerializer, OrderHistorySerializer, ComplaintSerializer, JobAssignmentSerializer, ServiceFeedbackSerializer, VehicleSerializer, TaskSerializer



######### Definimos permisos personalizados para los diferentes roles de usuario ##################33

class IsGroupMember(BasePermission):
    group_name = None

    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name=self.group_name).exists()

class IsAdmin(IsGroupMember):
    group_name = "Admin"

class IsAdminOrOwner(BasePermission):
    """
    Permite que los administradores gestionen todos los reclamos
    y que los clientes gestionen solo los suyos.
    """
    def has_object_permission(self, request, view, obj):
        return request.user.is_staff or obj.client == request.user
    
    
class IsEmployee(IsGroupMember):
    group_name = "Employee"

class IsClient(IsGroupMember):
    group_name = "Client"

class IsDriver(IsGroupMember):
    group_name = "Driver"

class IsCodriver(IsGroupMember):
    group_name = "Codriver"


######################### User views ##################################

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny] 
    
    # def Ingrsar ala base de datos 

  
# Vista para obtener, actualizar y eliminar un usuario específico
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    # Permisos para acceder a la vista: autenticado y ser Admin
    
    # Método para eliminar un usuario
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Usuario eliminado correctamente.'}, status=status.HTTP_204_NO_CONTENT)


# Vista para registrar un nuevo usuario
class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
     if 'password' in request.data and 'password_confirm' in request.data:
        if request.data['password'] != request.data['password_confirm']:
            return Response({'detail': 'Las contraseñas no coinciden.'}, status=status.HTTP_400_BAD_REQUEST)


        # Llamamos al método create del generics para crear el usuario
        response = super().create(request, *args, **kwargs)

        # Verifica que el usuario recién creado exista y esté activo
        user_id = response.data.get('id')
        if not user_id:
            return Response({'detail':'Creado: Usuario  creado correctamente.'}, status=status.HTTP_201_CREATED)
        try:
            user = User.objects.get(id=user_id)
            if not user.is_active:  # Verifica si estaba inactivo por cualquier razón
             user.is_active = True
             user.save()
            return response
        except User.DoesNotExist:
        # Este caso no debería ocurrir si la creación fue exitosa
            return Response({'detail': 'Error inesperado: Usuario no encontrado.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
        
        
        
######################################################################################################################33333333333

class EmployeeCreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny] 
    def create(self, request, *args, **kwargs):
        
        allowed_roles = ['client', 'driver', 'codriver']
        role = request.data.get('role')

        if role not in allowed_roles:
            return Response(
                {"detail": f"No tienes permiso para asignar el rol '{role}'."},
                status=status.HTTP_403_FORBIDDEN,
            )

        return super().create(request, *args, **kwargs)


###########################################################################

class DriverListView(APIView):
    def get(self, request):
        try:
            # Obtener el grupo 'Driver'
            driver_group = Group.objects.get(name='Driver')
            
            # Filtrar usuarios que pertenecen al grupo
            drivers = User.objects.filter(groups=driver_group)
            
            # Serializar los datos necesarios
            driver_data = [
                {"id": driver.id, "username": driver.username, "email": driver.email}
                for driver in drivers
            ]
            
            return Response(driver_data, status=status.HTTP_200_OK)
        except Group.DoesNotExist:
            return Response(
                {"error": "Grupo 'Driver' no encontrado"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

###########################################################################

class ClientListView(APIView):
    def get(self, request):
        try:
            # Obtener el grupo 'Client'
            client_group = Group.objects.get(name='Client')
            
            # Filtrar usuarios que pertenecen al grupo
            clients = User.objects.filter(groups=client_group)
            
            # Serializar los datos necesarios
            client_data = [
                {"id": client.id,"first_name": client.first_name,"last_name": client.last_name, "username": client.username, "email": client.email}
                for client in clients
            ]
            
            return Response(client_data, status=status.HTTP_200_OK)
        except Group.DoesNotExist:
            return Response(
                {"error": "Grupo 'Client' no encontrado"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


############################################################################
# Vista para listar las tareas
class TaskListCreateView(APIView):
    permission_classes = [AllowAny]  # Cambiar según sea necesario

    def get(self, request):
        # Filtrar tareas, aquí puedes ajustar según el rol o lógica específica
        tasks = Task.objects.all()  # O filtrar si es necesario
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        # Crear una nueva tarea usando los datos enviados
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            assigned_user = serializer.validated_data.get('assigned_to')  # Extraer el usuario asignado

            # Verifica que el usuario existe y tiene permisos, si es necesario
            if not User.objects.filter(id=assigned_user.id).exists():
                return Response(
                    {"error": "El usuario asignado no existe."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            serializer.save()  # Guarda la tarea con el usuario asignado
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskDetailUpdateDeleteView(APIView):
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise NotFound(detail="Task not found")

    def get(self, request, pk):
        task = self.get_object(pk)
        if task.assigned_to != request.user:
            raise PermissionDenied("You do not have permission to view this task.")
        serializer = TaskSerializer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        task = self.get_object(pk)
        if task.assigned_to != request.user:
            raise PermissionDenied("You do not have permission to edit this task.")
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        task = self.get_object(pk)
        if task.assigned_to != request.user:
            raise PermissionDenied("You do not have permission to edit this task.")
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        task = self.get_object(pk)
        if task.assigned_to != request.user:
            raise PermissionDenied("You do not have permission to delete this task.")
        task.delete()
        return Response({"detail": "Task deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


##########################################################################################################################33333
    
class ServiceListCreateView(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
   
  

class ServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
   
   

##########################################################################################################################33333
    

# Vista para gestionar pedidos

class OrderListCreateView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny] 
    
    def perform_create(self, serializer):
        serializer.save(client=self.request.user)

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny] 

    def perform_update(self, serializer):
        if self.request.user.groups.filter(name="Driver").exists():
            serializer.save(status="en proceso")
        else:
            serializer.save()


##########################################################################################################################33333
    


# Vista para gestionar historial de estados de pedidos
class OrderHistoryListView(generics.ListAPIView):
    serializer_class = OrderHistorySerializer
  

    def get_queryset(self):
        order_id = self.kwargs.get('order_id')
        return OrderHistory.objects.filter(order_id=order_id)


##########################################################################################################################33333
    
# Vista para gestionar reclamos de clientes

class ComplaintListCreateView(generics.ListCreateAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'created_at','tipo']

    def get_queryset(self):
        # Los administradores ven todos los reclamos, los clientes solo los propios
        if self.request.user.is_staff:
            return Complaint.objects.all()
        return Complaint.objects.filter(client=self.request.user)

    def perform_create(self, serializer):
        # Asegúrate de que el cliente autenticado sea asignado
        serializer.save(client=self.request.user)
     
class ComplaintDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated, IsAdmin | IsClient]

    def get_queryset(self):
        # Los administradores pueden acceder a todos los reclamos
        if self.request.user.is_staff:
            return Complaint.objects.all()
        # Los clientes solo pueden acceder a sus propios reclamos
        return Complaint.objects.filter(client=self.request.user)

    def perform_update(self, serializer):
        # Si el usuario es cliente, solo puede actualizar su propio reclamo
        if self.request.user != serializer.instance.client:
            raise PermissionDenied("No tienes permiso para actualizar este reclamo.")
        serializer.save()
    
    


##########################################################################################################################33333
    
# Vista para gestionar la asignación de trabajos a empleados o coordinadores

class JobAssignmentListCreateView(generics.ListCreateAPIView):
    
    queryset = JobAssignment.objects.all()
    serializer_class = JobAssignmentSerializer
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados

    def perform_create(self, serializer):
        if not self.request.user.groups.filter(name__in=["Employee", "Admin"]).exists():
            raise PermissionDenied("No tienes permiso para asignar tareas.")
        serializer.save()


class JobAssignmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobAssignment.objects.all()
    serializer_class = JobAssignmentSerializer
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados

    def perform_update(self, serializer):
        if not self.request.user.groups.filter(name="Employee").exists():
            raise PermissionDenied("Solo los empleados pueden actualizar el estado de una tarea.")
        serializer.save()
        
        
##########################################################################################################################33333
    
# Vista para gestionar los comentarios de los clientes sobre los servicios prestados
class ServiceFeedbackListCreateView(generics.ListCreateAPIView):
    queryset = ServiceFeedback.objects.all()
    serializer_class = ServiceFeedbackSerializer
    permission_classes = [AllowAny] 
    
    def perform_create(self, serializer):
        serializer.save(client=self.request.user)


class ServiceFeedbackDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ServiceFeedback.objects.all()
    serializer_class = ServiceFeedbackSerializer
    permission_classes = [AllowAny] 


##########################################################################################################################33333
    
# Vista para gestionar los vehículos

class VehicleListCreateView(generics.ListCreateAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    permission_classes = [AllowAny] 
class VehicleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    permission_classes = [AllowAny] 
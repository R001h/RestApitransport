from rest_framework.views import APIView 
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from rest_framework.exceptions import NotFound, PermissionDenied
from .models import Service, Order,  DriverAssignment, Complaint, JobAssignment, ServiceFeedback, Vehicle, Task
from .serializers import UserRegisterSerializer, UserSerializer, ServiceSerializer, OrderSerializer, DriverAssignmentSerializer, OrderHistorySerializer, ComplaintSerializer, JobAssignmentSerializer, ServiceFeedbackSerializer, VehicleSerializer, TaskSerializer



######### Definimos permisos personalizados para los diferentes roles de usuario ##################33

class IsGroupMember(BasePermission):
    group_name = None

    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name=self.group_name).exists()

class IsAdmin(IsGroupMember):
    group_name = "Admin"

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


############################################################################
# Vista para listar las tareas


class TaskListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tasks = Task.objects.filter(assigned_to=request.user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(assigned_to=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class TaskDetailUpdateDeleteView(APIView):
    permission_classes = [IsAuthenticated]

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
    


# Vista para gestionar asignación de conductores
class DriverAssignmentListCreateView(generics.ListCreateAPIView):
    queryset = DriverAssignment.objects.all()
    serializer_class = DriverAssignmentSerializer
    permission_classes = [AllowAny] 


class DriverAssignmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DriverAssignment.objects.all()
    serializer_class = DriverAssignmentSerializer
    permission_classes = [AllowAny] 


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
    permission_classes = [AllowAny] 

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)

class ComplaintDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [AllowAny] 


##########################################################################################################################33333
    
# Vista para gestionar la asignación de trabajos a empleados o coordinadores
class JobAssignmentListCreateView(generics.ListCreateAPIView):
    queryset = JobAssignment.objects.all()
    serializer_class = JobAssignmentSerializer
    permission_classes = [AllowAny] 


class JobAssignmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobAssignment.objects.all()
    serializer_class = JobAssignmentSerializer
    permission_classes = [AllowAny] 


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
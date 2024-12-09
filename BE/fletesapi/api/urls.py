from django.urls import path
from . import views
from .views import UserRegisterView, UserListCreate, TaskListCreateView, TaskDetailUpdateDeleteView, EmployeeCreateUserView, DriverListView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # User endpoints
    path('users/', views.UserListCreate.as_view(), name='user-get'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),  

    # Register endpoints
    path('register/', UserRegisterView.as_view(), name='register'),
    path('employee/create-user/', EmployeeCreateUserView.as_view(), name='employee-create-user'),

    # Service endpoints
    path('service/', views.ServiceListCreateView.as_view(), name='service-list-create'),
    path('service/<int:pk>/', views.ServiceDetailView.as_view(), name='service-detail'),

    # Order endpoints
    path('order/', views.OrderListCreateView.as_view(), name='order-list-create'),
    path('order/<int:pk>/', views.OrderDetailView.as_view(), name='order-detail'),

    # Rutas para gestionar historial de estados de pedidos
    path('orders/<int:order_id>/history/', views.OrderHistoryListView.as_view(), name='order-history-list'),

    # DriverAssignment endpoints
    path('driverassignment/', views.DriverAssignmentListCreateView.as_view(), name='driver-assignment-list-create'),
    path('driverassignment/<int:pk>/', views.DriverAssignmentDetailView.as_view(), name='driver-assignment-detail'),

    # Rutas para gestionar reclamos de clientes
    path('complaint/', views.ComplaintListCreateView.as_view(), name='complaint-list-create'),
    path('complaint/<int:pk>/', views.ComplaintDetailView.as_view(), name='complaint-detail'),

    # ServiceFeedback endpoints
    path('feedback/', views.ServiceFeedbackListCreateView.as_view(), name='servicefeedback-list-create'),
    path('feedback/<int:pk>/', views.ServiceFeedbackDetailView.as_view(), name='servicefeedback-detail'),

    # Vehicle endpoints
    path('vehicle/', views.VehicleListCreateView.as_view(), name='vehicle-list-create'),
    path('vehicle/<int:pk>/', views.VehicleDetailView.as_view(), name='vehicle-detail'),

    # Task endpoints
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),  
    path('tasks/<int:pk>/', TaskDetailUpdateDeleteView.as_view(), name='task-detail-update-delete'),
    
    path('drivers/', DriverListView.as_view(), name='driver-list'),
      
]

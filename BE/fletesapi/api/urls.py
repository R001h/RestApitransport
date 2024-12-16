from django.urls import path
from . import views
from .views import (
    UserRegisterView, UserListCreate, TaskListCreateView, TaskDetailUpdateDeleteView,
    EmployeeCreateUserView, JobAssignmentListCreateView, DriverListView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # --- User Management ---
    path('users/', UserListCreate.as_view(), name='user-list-create'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),
    path('register/', UserRegisterView.as_view(), name='register'),
    path('employee/create-user/', EmployeeCreateUserView.as_view(), name='employee-create-user'),

    # --- Driver Management ---
    path('drivers/', DriverListView.as_view(), name='driver-list'),

    # --- Service Management ---
    path('service/', views.ServiceListCreateView.as_view(), name='service-list-create'),
    path('service/<int:pk>/', views.ServiceDetailView.as_view(), name='service-detail'),
    path('feedback/', views.ServiceFeedbackListCreateView.as_view(), name='servicefeedback-list-create'),
    path('feedback/<int:pk>/', views.ServiceFeedbackDetailView.as_view(), name='servicefeedback-detail'),

    # --- Order Management ---
    path('order/', views.OrderListCreateView.as_view(), name='order-list-create'),
    path('order/<int:pk>/', views.OrderDetailView.as_view(), name='order-detail'),
    path('orders/<int:order_id>/history/', views.OrderHistoryListView.as_view(), name='order-history-list'),

    # --- Complaints Management ---
    path('complaint/', views.ComplaintListCreateView.as_view(), name='complaint-list-create'),
    path('complaint/<int:pk>/', views.ComplaintDetailView.as_view(), name='complaint-detail'),

    # --- Job Assignments ---
    path('assignments/', JobAssignmentListCreateView.as_view(), name='job-assignment-list-create'),
    path('assignments/<int:pk>/', views.JobAssignmentDetailView.as_view(), name='job-assignment-detail'),

    # --- Vehicle Management ---
    path('vehicle/', views.VehicleListCreateView.as_view(), name='vehicle-list-create'),
    path('vehicle/<int:pk>/', views.VehicleDetailView.as_view(), name='vehicle-detail'),

    # --- Task Management ---
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskDetailUpdateDeleteView.as_view(), name='task-detail-update-delete'),
]

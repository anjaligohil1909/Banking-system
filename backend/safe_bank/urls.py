from django.urls import path
from .views import AccountOverview, CustomerList, RegisterCustomer

urlpatterns = [
    path('api/accounts/', AccountOverview.as_view(), name='account-overview'),
    path('api/customers/', CustomerList.as_view(), name='customer-list'),
    path('api/register/', RegisterCustomer.as_view(), name='register_customer'),
]
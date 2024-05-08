from django.urls import path
from .views import AccountOverview, CustomerList, CheckingAccountView, SavingsAccountView, TransactionView, RegisterCustomer

urlpatterns = [
    path('api/accounts/', AccountOverview.as_view(), name='account-overview'),
    path('api/customers/', CustomerList.as_view(), name='customer-list'),
    path('api/customer/<customer_id>/checkings-account/', CheckingAccountView.as_view(), name='checking-details'),
    path('api/customer/<str:customer_id>/saving-account/', SavingsAccountView.as_view(), name='savings-details'),
    path('api/customer/<str:acc_no>/checking/transactions', TransactionView.as_view(), name='savings-details'),
    # path('api/customer/saving/transactions', CustomerList.as_view(), name='savings-details'),
    path('api/register/', RegisterCustomer.as_view(), name='register_customer'),
]
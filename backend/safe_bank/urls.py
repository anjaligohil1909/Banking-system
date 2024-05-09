from django.urls import path
from .views import AccountOverview, CustomerList, CheckingAccountView, SavingsAccountView, TransactionView, \
    RegisterCustomer, LoansView, CustomerLoansView

from .views import AccountOverview, CustomerList, CheckingAccountView, SavingsAccountView, TransactionView, RegisterCustomer, RequestView, CreateRequest

urlpatterns = [
    path('api/accounts/', AccountOverview.as_view(), name='account-overview'),
    path('api/customers/', CustomerList.as_view(), name='customer-list'),
    path('api/customer/<customer_id>/checkings-account/', CheckingAccountView.as_view(), name='checking-details'),
    path('api/customer/<str:customer_id>/saving-account/', SavingsAccountView.as_view(), name='savings-details'),
    path('api/customer/<str:acc_no>/transactions', TransactionView.as_view(), name='transaction-details'),
    path('api/register/', RegisterCustomer.as_view(), name='register_customer'),
    path('api/employee/request/', RequestView.as_view(), name='request-list'),
    path('api/customer/create_request/', CreateRequest.as_view(), name='create-request'),
    path('api/loans/<customer_id>', CustomerLoansView.as_view(), name='customerLoans '),
    path('api/loans/', LoansView.as_view(), name='loansView '),
    path('api/employee/request/', RequestView.as_view(), name='request-list'),
    #path('api/customer/create_request/', CreateRequest.as_view(), name='create-request'),
    path('api/create_request/', CreateRequest.as_view(), name='create_request'),
]
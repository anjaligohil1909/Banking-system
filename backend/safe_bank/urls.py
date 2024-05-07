from django.urls import path
from .views import AccountOverview, CustomerList

urlpatterns = [
    path('api/accounts/', AccountOverview.as_view(), name='account-overview'),
    path('api/customers/', CustomerList.as_view(), name='customer-list'),
]
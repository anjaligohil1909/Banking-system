from rest_framework import generics
from .models import Customer, Account
from .serializers import CustomerSerializer, AccountSerializer

class AccountOverview(generics.ListAPIView):
    """
    API endpoint to allow users to view account details
    """
    serializer_class = AccountSerializer

    def get_queryset(self):
        """
        optionally restrict the returned account to a given customer,
        by filtering against a `cust_id` query parameter in the URL.
        """
        queryset = Account.objects.all()
        cust_id = self.request.query_params.get('cust_id')
        if cust_id is not None:
            queryset = queryset.filter(cust_id=cust_id)
        return queryset

class CustomerList(generics.ListAPIView):
    """
    API endpoint to allows users to view a list of customers.
    """
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
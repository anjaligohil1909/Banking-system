from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import Customer, Account
from .serializers import CustomerSerializer, AccountSerializer
import uuid, datetime

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

class RegisterCustomer(APIView):
    def post(self, request):
        customer_data = request.data.get('customer')
        account_data = request.data.get('account')

        customer_serializer = CustomerSerializer(data=customer_data)
        if customer_serializer.is_valid():
            customer = customer_serializer.save()

            # ensuring cust_id is passed as an ID
            account_data['cust_id'] = customer.pk  # customer.pk refers to the primary key
            account_serializer = AccountSerializer(data=account_data)

            if account_serializer.is_valid():
                account = account_serializer.save()
                return Response({
                    'customer': customer_serializer.data,
                    'account': account_serializer.data
                }, status=status.HTTP_201_CREATED)
            else:
                return Response(account_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(customer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
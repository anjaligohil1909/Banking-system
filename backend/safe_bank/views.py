from django.http import Http404
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import Customer, Account, TxnList, Loan
from .serializers import CustomerSerializer, AccountSerializer, TransactionSerializer, LoanSerializer

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
        cust_id = self.request.query_params.get("cust_id")
        if cust_id is not None:
            queryset = queryset.filter(cust_id=cust_id)
        return queryset


class CustomerList(generics.ListAPIView):
    """
    API endpoint to allows users to view a list of customers.
    """

    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class CheckingAccountView(generics.ListAPIView):
    """
    API endpoint to allow users to view checking account details
    """

    serializer_class = AccountSerializer

    def get_queryset(self):
        customer_id = self.kwargs["customer_id"]  # Assuming 'customer_id' is passed in the URL
        ans = Account.objects.filter(cust_id=customer_id, acc_type__in=["C", "Checking"])  # Filtering by customer_id and account type 'C'
        return ans


class SavingsAccountView(generics.ListAPIView):
    """
    API endpoint to allow users to view checking account details
    """

    serializer_class = AccountSerializer

    def get_queryset(self):
        """
        optionally restrict the returned account to a given customer,
        by filtering against a `cust_id` query parameter in the URL.
        """
        customer_id = self.kwargs[
            "customer_id"
        ]  # Assuming 'customer_id' is passed in the URL
        return Account.objects.filter(
            cust_id=customer_id, acc_type__in=["S", "Savings"]
        )  # Filtering by customer_id and account type 'C'


class TransactionView(generics.ListAPIView):
    """
    API endpoint to allow users to view checking account details
    """

    serializer_class = TransactionSerializer

    def get_queryset(self):
        acc_no = self.kwargs["acc_no"]
        ans = TxnList.objects.filter(sender_no=acc_no) | TxnList.objects.filter(receiver_no=acc_no)
        queryset = ans.order_by('-datetime')
        return queryset


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

class LoansView(generics.ListAPIView):
    serializer_class = LoanSerializer
    def get_queryset(self):
        loan_id = self.request.query_params.get("loanId")

        queryset = Loan.objects.all()
        if loan_id is not None:
            queryset = queryset.filter(id=loan_id)
        return queryset

class CustomerLoansView(generics.GenericAPIView):
    def get_loanByAccount(self, accountNo):
        try:
            return Loan.objects.get(acc_no=accountNo)
        except Loan.DoesNotExist:
            raise Http404

    def get_loanaccount(selfself, customer_id):
        return Account.objects.get(cust_id=customer_id,acc_type='L')

    def get(self, request, customer_id):
        accountObj = self.get_loanaccount(customer_id)
        loanObj = self.get_loanByAccount(accountObj.acc_no)
        serializer = LoanSerializer(loanObj)
        return Response(serializer.data)
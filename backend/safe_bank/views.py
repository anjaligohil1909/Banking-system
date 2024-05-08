from rest_framework import generics
from .models import Customer, Account, TxnList
from .serializers import CustomerSerializer, AccountSerializer, TransactionSerializer


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
            queryset = queryset.filter(cust_id=cust_id, acc_type__in=["C", "Checking"])
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
        return ans

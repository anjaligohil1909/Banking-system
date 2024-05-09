from django.http import Http404
from django.contrib.auth.hashers import check_password
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Customer, Account, TxnList, Request, Loan, HomeLoanRequest, StudentLoanRequest, PersonalLoanRequest
from .serializers import CustomerSerializer, AccountSerializer, TransactionSerializer, RequestSerializer, RequestSerializer, LoanSerializer, LoanRequestSerializer, HomeLoanRequestSerializer, StudentLoanRequestSerializer, PersonalLoanRequestSerializer, TransactionRequestSerializer, ProfileEditRequestSerializer, AddressSerializer
from django.db import transaction

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
        address_data = request.data.get('address')

        # First, check if customer exists
        existing_customer = Customer.objects.filter(
            cust_email=customer_data['cust_email'],
            cust_ssn=customer_data['cust_ssn'],
            cust_phno=customer_data['cust_phno']
        ).first()

        if existing_customer:
            # Verify password
            if not check_password(customer_data['cust_password'], existing_customer.cust_password):
                return Response({'error': 'Incorrect password for existing customer.'}, status=status.HTTP_400_BAD_REQUEST)

            # Check if the account type is different
            existing_account = Account.objects.filter(cust_id=existing_customer.cust_id, acc_type=account_data['acc_type']).exists()
            if existing_account:
                return Response({'error': 'An account of this type already exists for this customer.'}, status=status.HTTP_400_BAD_REQUEST)
            
            customer = existing_customer
        else:
            # Serialize and save the customer if not existing
            customer_serializer = CustomerSerializer(data=customer_data)
            if customer_serializer.is_valid():
                customer = customer_serializer.save()
            else:
                return Response(customer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Handle address: Always creating a new address for simplicity, adjust if needed
        address_serializer = AddressSerializer(data=address_data)
        if address_serializer.is_valid():
            address = address_serializer.save()
        else:
            return Response(address_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Prepare account data
        account_data['cust_id'] = customer.pk
        account_data['add_id'] = address.pk

        # Serialize and save the account data
        account_serializer = AccountSerializer(data=account_data)
        if account_serializer.is_valid():
            account_serializer.save()
        else:
            return Response(account_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'customer': CustomerSerializer(customer).data,
            'account': account_serializer.data,
            'address': address_serializer.data
        }, status=status.HTTP_201_CREATED)


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
class RequestView(generics.ListAPIView):
    """
    API endpoint to allow users to view checking account details
    """
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

class CreateRequest(APIView):
    def post(self, request):
        request_data = request.data
        request_type = request_data.get('request_type')

        with transaction.atomic():
            # Create the main Request instance first
            main_request = self.create_main_request(request_data)

            if main_request is None:
                return Response({'error': 'Failed to create main request'}, status=status.HTTP_400_BAD_REQUEST)

            if request_type == 'loan':
                return self.handle_loan_request(request_data, main_request)
            elif request_type == 'profile_edit':
                return self.handle_profile_edit_request(request_data, main_request)
            elif request_type == 'transaction':
                return self.handle_transaction_request(request_data, main_request)
            else:
                return Response({'error': 'Invalid request type'}, status=status.HTTP_400_BAD_REQUEST)

    def create_main_request(self, data):
        # Assume Customer serializer and validation are handled appropriately
        request_serializer = RequestSerializer(data=data)
        if request_serializer.is_valid():
            return request_serializer.save()
        return None

    def handle_loan_request(self, request_data, main_request):
        loan_request_data = request_data
        loan_request_data['req_id'] = main_request.req_id  # Link to main request
        loan_request_serializer = LoanRequestSerializer(data=loan_request_data)
        
        if loan_request_serializer.is_valid():
            loan_request = loan_request_serializer.save()
            loan_type = request_data.get('ltype')

            if loan_type == 'H':
                return self.handle_home_loan_request(loan_request, request_data)
            elif loan_type == 'S':
                return self.handle_student_loan_request(loan_request, request_data)
            elif loan_type == 'P':
                return self.handle_personal_loan_request(loan_request, request_data)
            else:
                return Response({'error': 'Invalid loan type'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(loan_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def handle_loan_request(self, request_data):
    #     loan_request_serializer = LoanRequestSerializer(data=request_data)
    #     if loan_request_serializer.is_valid():
    #         loan_request = loan_request_serializer.save()
    #         loan_request['req_id'] = request_data.get('req_id')
    #         loan_type = request_data.get('ltype')
    #         if loan_type == 'H':
    #             return self.handle_home_loan_request(loan_request, request_data)
    #         elif loan_type == 'S':
    #             return self.handle_student_loan_request(loan_request, request_data)
    #         elif loan_type == 'P':
    #             return self.handle_personal_loan_request(loan_request, request_data)
    #         else:
    #             return Response({'error': 'Invalid loan type'}, status=status.HTTP_400_BAD_REQUEST)
    #     return Response(loan_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def handle_home_loan_request(self, loan_request, request_data):
    #     home_loan_data = request_data.get('home_loan_request', {})
    #     home_loan_data['req_id'] = loan_request.req_id
    #     home_loan_request_serializer = HomeLoanRequestSerializer(data=home_loan_data)
    #     if home_loan_request_serializer.is_valid():
    #         home_loan_request_serializer.save()
    #         return Response(home_loan_request_serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(home_loan_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def handle_home_loan_request(self, loan_request, request_data):
        home_loan_data = request_data
        home_loan_data['req_id'] = loan_request.req_id
        home_loan_serializer = HomeLoanRequestSerializer(data=home_loan_data)

        if home_loan_serializer.is_valid():
            home_loan_serializer.save()
            return Response(home_loan_serializer.data, status=status.HTTP_201_CREATED)
        return Response(home_loan_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def handle_student_loan_request(self, loan_request, request_data):
        student_loan_data = request_data
        student_loan_data['req_id'] = loan_request.req_id
        student_loan_request_serializer = StudentLoanRequestSerializer(data=student_loan_data)
        if student_loan_request_serializer.is_valid():
            student_loan_request_serializer.save()
            return Response(student_loan_request_serializer.data, status=status.HTTP_201_CREATED)
        return Response(student_loan_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def handle_personal_loan_request(self, loan_request, request_data):
        personal_loan_data = request_data
        personal_loan_request_serializer = PersonalLoanRequestSerializer(data=personal_loan_data)
        if personal_loan_request_serializer.is_valid():
            personal_loan_request_serializer.save()
            return Response(personal_loan_request_serializer.data, status=status.HTTP_201_CREATED)
        return Response(personal_loan_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def handle_profile_edit_request(self, request_data, main_request):
        profile_edit_data = request_data
        profile_edit_data['req_id'] = main_request.req_id 
        profile_edit_request_serializer = ProfileEditRequestSerializer(data=profile_edit_data)
        if profile_edit_request_serializer.is_valid():
            profile_edit_request_serializer.save()
            return Response(profile_edit_request_serializer.data, status=status.HTTP_201_CREATED)
        return Response(profile_edit_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def handle_transaction_request(self, request_data, main_request):
        transaction_request_data = request_data
        transaction_request_data['req_id'] = main_request.req_id
        print(transaction_request_data)
        transaction_request_serializer = TransactionRequestSerializer(data=transaction_request_data)
        if transaction_request_serializer.is_valid():
            transaction_request_serializer.save()
            return Response(transaction_request_serializer.data, status=status.HTTP_201_CREATED)
        return Response(transaction_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            customer = Customer.objects.get(cust_email=email)
            if check_password(password, customer.cust_password):
                return Response({
                    'message': 'Login successful',
                    'cust_id': customer.cust_id
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
        except Customer.DoesNotExist:
            return Response({'error': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)
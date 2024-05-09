from django.http import Http404
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from rest_framework.views import APIView
from .models import Customer, Account, TxnList, Request, Loan, HomeLoanRequest, StudentLoanRequest, PersonalLoanRequest
from .serializers import CustomerSerializer, AccountSerializer, TransactionSerializer, RequestSerializer, RequestSerializer, LoanSerializer, LoanRequestSerializer, HomeLoanRequestSerializer, StudentLoanRequestSerializer, PersonalLoanRequestSerializer

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

class RequestView(generics.ListAPIView):
    """
    API endpoint to allow users to view checking account details
    """
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

class CreateRequest(APIView):
    def post(self, request):
        request_data = request.data
        request_serializer = RequestSerializer(data=request_data)
        if request_serializer.is_valid():
            request = request_serializer.save()
            return Response({
                'request': request_serializer.data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



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
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

class CreateRequest(APIView):
    def post(self, request):
        request_data = json.loads(request.body)
        request_type = request_data.get('request_type')

        fields_to_extract_request = ['request_type', 'status', 'created_at', 'cust_id']
        request_data_filtered = dict(filter(lambda item: item[0] in fields_to_extract_request, request_data.items()))
        if request_type == 'loan':
            request_serializer = RequestSerializer(data=request_data_filtered)
            if request_serializer.is_valid():
                request = request_serializer.save()
                fields_to_extract_loanreq = ['req_id', 'ltype', 'lamount', 'lmonths', 'lpay', 'lrate']
                loan_request_data = dict(filter(lambda item: item[0] in fields_to_extract_loanreq, request_data.items()))
                loan_request_data["req_id"] = request.req_id
                loan_request_serializer = LoanRequestSerializer(data=loan_request_data)
                if loan_request_serializer.is_valid():
                    loan_request = loan_request_serializer.save()
                    if request_data.get('loan_type') == 'H':
                        home_loan_request_data = {
                            'req_id': loan_request.req_id,
                            **request_data.get('home_loan_request', {})
                        }
                        home_loan_request_serializer = HomeLoanRequestSerializer(data=home_loan_request_data)
                        if home_loan_request_serializer.is_valid():
                            home_loan_request_serializer.save()
                        else:
                            return Response(home_loan_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    elif request_data.get('ltype') == 'S':
                        print("inside student loan")
                        fields_to_extract_stuloanreq = ['req_id', 'uni_name', 'stu_id', 'slevel', 'smonth', 'syear']
                        student_loan_request_data = dict(filter(lambda item: item[0] in fields_to_extract_stuloanreq, request_data.items()))
                        student_loan_request_data["req_id"] = request.req_id
                        print(student_loan_request_data)
                        
                        student_loan_request_serializer = StudentLoanRequestSerializer(data=student_loan_request_data)
                        if student_loan_request_serializer.is_valid():
                            print("final valid")
                            student_loan_request_serializer.save()
                        else:
                            return Response(student_loan_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    elif request_data.get('loan_type') == 'P':
                        personal_loan_request_data = {
                            'req_id': loan_request.req_id,
                            **request_data.get('personal_loan_request', {})
                        }
                        personal_loan_request_serializer = PersonalLoanRequestSerializer(data=personal_loan_request_data)
                        if personal_loan_request_serializer.is_valid():
                            personal_loan_request_serializer.save()
                        else:
                            return Response(personal_loan_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response(loan_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else: print("hi")


        # if request_type == 'loan':
        #     request_serializer = RequestSerializer(data=request_data)
        #     if request_serializer.is_valid():
        #         print(request_data, request_type)
        #         request = request_serializer.save()
        #         loan_request_data = {
        #             'req_id': request.req_id,
        #             **request_data.get('loan_request', {})
        #         }
        #         loan_request_serializer = LoanRequestSerializer(data=loan_request_data)
        #         if loan_request_serializer.is_valid():
        #             loan_request = loan_request_serializer.save()
        #             if request_data.get('loan_type') == 'H':
        #                 home_loan_request_data = {
        #                     'req_id': loan_request.req_id,
        #                     **request_data.get('home_loan_request', {})
        #                 }
        #                 home_loan_request_serializer = HomeLoanRequestSerializer(data=home_loan_request_data)
        #                 if home_loan_request_serializer.is_valid():
        #                     home_loan_request_serializer.save()
        #                 else:
        #                     return Response(home_loan_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #             elif request_data.get('loan_type') == 'S':
        #                 student_loan_request_data = {
        #                     'req_id': loan_request.req_id,
        #                     **request_data.get('student_loan_request', {})
        #                 }
        #                 student_loan_request_serializer = StudentLoanRequestSerializer(data=student_loan_request_data)
        #                 if student_loan_request_serializer.is_valid():
        #                     student_loan_request_serializer.save()
        #                 else:
        #                     return Response(student_loan_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #             elif request_data.get('loan_type') == 'P':
        #                 personal_loan_request_data = {
        #                     'req_id': loan_request.req_id,
        #                     **request_data.get('personal_loan_request', {})
        #                 }
        #                 personal_loan_request_serializer = PersonalLoanRequestSerializer(data=personal_loan_request_data)
        #                 if personal_loan_request_serializer.is_valid():
        #                     personal_loan_request_serializer.save()
        #                 else:
        #                     return Response(personal_loan_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #         else:
        #             return Response(loan_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #     else:
        #         return Response(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # elif request_type == 'profile_edit':
        #     request_serializer = RequestSerializer(data=request_data)
        #     if request_serializer.is_valid():
        #         request = request_serializer.save()
        #         profile_edit_request_data = {
        #             'req_id': request.req_id,
        #             **request_data.get('profile_edit_request', {})
        #         }
        #         profile_edit_request_serializer = ProfileEditRequestSerializer(data=profile_edit_request_data)
        #         if profile_edit_request_serializer.is_valid():
        #             profile_edit_request_serializer.save()
        #         else:
        #             return Response(profile_edit_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #     else:
        #         return Response(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # elif request_type == 'transaction':
        #     request_serializer = RequestSerializer(data=request_data)
        #     if request_serializer.is_valid():
        #         request = request_serializer.save()
        #         transaction_request_data = {
        #             'req_id': request.req_id,
        #             **request_data.get('transaction_request', {})
        #         }
        #         transaction_request_serializer = TransactionRequestSerializer(data=transaction_request_data)
        #         if transaction_request_serializer.is_valid():
        #             transaction_request_serializer.save()
        #         else:
        #             return Response(transaction_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #     else:
        #         return Response(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # else:
        #     return Response({'error': 'Invalid request type'}, status=status.HTTP_400_BAD_REQUEST)

        # return Response({'request': request_serializer.data}, status=status.HTTP_201_CREATED)

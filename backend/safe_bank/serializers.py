from rest_framework import serializers
from .models import Account, Address, Customer, TxnList, Request, Loan, HomeLoanRequest, StudentLoanRequest, PersonalLoanRequest, ProfileEditRequest, TransactionRequest, LoanRequest
from django.contrib.auth.hashers import make_password, check_password

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['cust_id', 'cust_fname', 'cust_lname', 'cust_email', 'cust_password', 'cust_dob', 'cust_phno', 'cust_ssn']
        read_only_fields = ['cust_id']

    def validate(self, data):
        # Attempt to find a matching customer by email, SSN, and phone number
        matching_customers = Customer.objects.filter(
            cust_email=data['cust_email'], 
            cust_ssn=data['cust_ssn'], 
            cust_phno=data['cust_phno']
        )

        if matching_customers.exists():
            customer = matching_customers.first()
            # If customer exists, check if the password matches
            if check_password(data['cust_password'], customer.cust_password):
                # If all four match, return data with customer ID to link the new account
                data['cust_id'] = customer.pk
                return data
            else:
                # If password does not match, raise validation error
                raise serializers.ValidationError("Incorrect information provided. Please provide all correct details or none.")
        
        # Check if any other customer has any of the same unique fields (partial match)
        if Customer.objects.filter(cust_email=data['cust_email']).exists() or \
           Customer.objects.filter(cust_phno=data['cust_phno']).exists() or \
           Customer.objects.filter(cust_ssn=data['cust_ssn']).exists():
            raise serializers.ValidationError("Incorrect information provided. Please provide all correct details or none.")
        
        # If completely new customer, proceed to create a new one
        return data

    def create(self, validated_data):
        validated_data['cust_password'] = make_password(validated_data['cust_password'])
        return super().create(validated_data)


class AccountSerializer(serializers.ModelSerializer):
    cust_id = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())

    class Meta:
        model = Account
        fields = ['acc_no', 'date_open', 'acc_type', 'cust_id', 'balance', 'routing_no']
        read_only_fields = ['acc_no', 'date_open']  # these fields are not provided by the user

    def create(self, validated_data):
        account = Account.objects.create(**validated_data)
        return account

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['add_id', 'city', 'st_add', 'state', 'pos_code', 'country']

class TransactionSerializer(serializers.ModelSerializer):
    sender_no = serializers.StringRelatedField(read_only=True)
    receiver_no = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = TxnList
        fields = [
            'txn_id','amount', 'datetime', 'sender_no', 'receiver_no' 
        ]
class LoanSerializer(serializers.ModelSerializer):
    account = AccountSerializer(read_only=True)
    class Meta:
        model = Loan
        #fields = ['id','lrate','lamount','lmonths','ltype','lpay','acc_no_id','account','date_open']
        depth = 1
        fields = '__all__'
class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ['req_id', 'created_at', 'status', 'request_type', 'cust_id']
        read_only_fields = ['req_id', 'created_at', 'status']

        def create(self, validated_data):
            request = Request.objects.create(**validated_data)
            return request
class LoanRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanRequest
        fields = ['req_id', 'ltype', 'lamount', 'lmonths', 'lpay', 'lrate']

class HomeLoanRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeLoanRequest
        fields = ['req_id', 'house_buildyr', 'hm_ins_accno', 'yr_ins_prem', 'insc_id']


class StudentLoanRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentLoanRequest
        fields = ['req_id', 'uni_name', 'stu_id', 'slevel', 'smonth', 'syear']

class PersonalLoanRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalLoanRequest
        fields = ['req_id']

class ProfileEditRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileEditRequest
        fields = ['req_id', 'cust_fname', 'cust_lname', 'cust_email', 'cust_password', 'cust_dob', 'cust_phno', 'cust_ssn']

class TransactionRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionRequest
        fields = ['req_id', 'amount', 'datetime', 'sender_no', 'receiver_no']
    
    # def validate_amount(self, value):
    #     if value < 0:
    #         raise serializers.ValidationError("Amount cannot be negative.")
    #     return value
    
    # def validate_balance(self, value):
    #     if value > Balance:
    #         raise serializers.ValidationError("Insufficient balance.")
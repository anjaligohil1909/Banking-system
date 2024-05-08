from rest_framework import serializers
from .models import Account, Address, Customer, TxnList

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            'cust_id', 'cust_fname', 'cust_lname', 'cust_email',
            'cust_password', 'cust_dob', 'cust_phno'
        ]

class AccountSerializer(serializers.ModelSerializer):
    # Nested serialization to display customer details in account data
    cust_id = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Account
        fields = ['acc_no', 'date_open', 'acc_type', 'cust_id', 'balance', 'routing_no']

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
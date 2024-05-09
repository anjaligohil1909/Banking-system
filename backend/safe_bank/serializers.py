from rest_framework import serializers
from .models import Account, Address, Customer, TxnList, Loan

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        # for generating unique cust IDs, API does not expect cust_id during registration
        read_only_fields = ['cust_id']
        fields = [
            'cust_id', 'cust_fname', 'cust_lname', 'cust_email',
            'cust_password', 'cust_dob', 'cust_phno'
        ]

    # validating user input in create customer form
    def validate_cust_email(self, value):
        if "@" not in value:
            raise serializers.ValidationError("Email must include an '@' character.")
        return value

    def validate_cust_phno(self, value):
        if len(str(value)) != 10:
            raise serializers.ValidationError("Phone number must be 10 digits long.")
        return value

    def validate_cust_fname(self, value):
        if not value:
            raise serializers.ValidationError("First name is required.")
        return value

    def validate_cust_lname(self, value):
        if not value:
            raise serializers.ValidationError("Last name is required.")
        return value

class AccountSerializer(serializers.ModelSerializer):
    cust_id = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())

    class Meta:
        model = Account
        fields = ['acc_no', 'date_open', 'acc_type', 'cust_id']
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
    class Meta:
        model = Loan
        fields = ['id','lrate','lamount','lmonths','ltype','lpay','acc_no_id']
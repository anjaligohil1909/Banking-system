from django.db import models
import uuid

def generate_cust_id():
    return str(uuid.uuid4())[:12]

def generate_acc_no():
    return str(uuid.uuid4())[:10]

class AccAdd(models.Model):
    add_type = models.CharField(max_length=10, choices=[('COLLATERAL', 'Collateral'), ('MAILING', 'Mailing')])
    add_id = models.CharField(max_length=12, primary_key=True)
    acc_no = models.ForeignKey('Account', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.add_type} Address ID: {self.add_id}"

# model now generates unique IDs by itself
class Account(models.Model):
    acc_no = models.CharField(max_length=10, primary_key=True, default=generate_acc_no)
    date_open = models.DateTimeField(auto_now_add=True)
    acc_type = models.CharField(max_length=1, choices=[('C', 'Checking'), ('S', 'Savings'), ('L', 'Loan')])
    cust_id = models.ForeignKey('Customer', on_delete=models.CASCADE, db_column='cust_id')


    def __str__(self):
        return f"{self.acc_type} Account No. {self.acc_no}"

class Address(models.Model):
    add_id = models.CharField(max_length=12, primary_key=True)
    city = models.CharField(max_length=20)
    st_add = models.CharField(max_length=20)
    state = models.CharField(max_length=20)
    pos_code = models.CharField(max_length=10)
    country = models.CharField(max_length=20)

    def __str__(self):
        return self.st_add

class Check(models.Model):
    acc_no = models.ForeignKey('Account', on_delete=models.CASCADE)
    serchrg = models.DecimalField(max_digits=7, decimal_places=2)

    def __str__(self):
        return f"Check Account: {self.acc_no.acc_no}"

class CustAdd(models.Model):
    add_type = models.CharField(max_length=11, choices=[('RESIDENTIAL', 'Residential'), ('BUSINESS', 'Business')])
    add_id = models.CharField(max_length=12)
    cust_id = models.ForeignKey('Customer', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.add_type} - {self.cust_id.cust_id}"

# model now generates unique IDs by itself
class Customer(models.Model):
    cust_id = models.CharField(max_length=12, primary_key=True, default=generate_cust_id)
    cust_fname = models.CharField(max_length=20)
    cust_lname = models.CharField(max_length=20, blank=True)
    cust_email = models.EmailField(max_length=200)
    cust_password = models.CharField(max_length=30)
    cust_dob = models.DateTimeField()
    cust_phno = models.BigIntegerField()

    def __str__(self):
        return f"{self.cust_fname} {self.cust_lname}"

class Homloan(models.Model):
    acc_no = models.ForeignKey('Account', on_delete=models.CASCADE)
    house_buildyr = models.SmallIntegerField()
    hm_ins_accno = models.CharField(max_length=12)
    yr_ins_prem = models.DecimalField(max_digits=7, decimal_places=2)
    insc_id = models.ForeignKey('InsCmpny', on_delete=models.CASCADE)

    def __str__(self):
        return f"Home Loan for Account: {self.acc_no.acc_no}"

class InsCmpny(models.Model):
    insc_id = models.CharField(max_length=12, primary_key=True)
    insc_name = models.CharField(max_length=50)
    add_id = models.ForeignKey('Address', on_delete=models.CASCADE)

    def __str__(self):
        return self.insc_name

class Loan(models.Model):
    acc_no = models.ForeignKey('Account', on_delete=models.CASCADE)
    lrate = models.DecimalField(max_digits=5, decimal_places=2)
    lamount = models.DecimalField(max_digits=9, decimal_places=3)
    lmonths = models.SmallIntegerField()
    ltype = models.CharField(max_length=1, choices=[('S', 'Student'), ('P', 'Personal'), ('H', 'Home')])
    lpay = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"Loan {self.acc_no.acc_no}"

class Perloan(models.Model):
    acc_no = models.ForeignKey('Account', on_delete=models.CASCADE)
    cred_sc = models.SmallIntegerField()

    def __str__(self):
        return f"Personal Loan Account: {self.acc_no.acc_no}"

class Save(models.Model):
    acc_no = models.ForeignKey('Account', on_delete=models.CASCADE)
    intrate = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"Savings Account: {self.acc_no.acc_no}"

class Stuloan(models.Model):
    acc_no = models.ForeignKey('Loan', on_delete=models.CASCADE)
    uni_name = models.CharField(max_length=30)
    stu_id = models.CharField(max_length=12)
    slevel = models.CharField(max_length=1, choices=[('G', 'Graduate'), ('U', 'Undergraduate')])
    smonth = models.SmallIntegerField()
    syear = models.SmallIntegerField()

    def __str__(self):
        return f"Student Loan Account: {self.acc_no.acc_no}"

class TxnList(models.Model):
    txn_id = models.CharField(max_length=12, primary_key=True)
    amount = models.DecimalField(max_digits=7, decimal_places=2)
    datetime = models.DateTimeField()
    sender_no = models.ForeignKey('Account', related_name='sent_txns', on_delete=models.CASCADE)
    receiver_no = models.ForeignKey('Account', related_name='received_txns', on_delete=models.CASCADE)

    def __str__(self):
        return f"Transaction {self.txn_id}"
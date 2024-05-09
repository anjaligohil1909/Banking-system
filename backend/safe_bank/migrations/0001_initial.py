# Generated by Django 5.0.6 on 2024-05-09 10:12

import django.db.models.deletion
import safe_bank.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('acc_no', models.CharField(default=safe_bank.models.generate_acc_no, max_length=10, primary_key=True, serialize=False)),
                ('date_open', models.DateTimeField(auto_now_add=True)),
                ('acc_type', models.CharField(choices=[('C', 'Checking'), ('S', 'Savings'), ('L', 'Loan')], max_length=1)),
                ('balance', models.DecimalField(decimal_places=2, default=3000, max_digits=10)),
                ('routing_no', models.BigIntegerField(default=100220110)),
            ],
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('add_id', models.CharField(max_length=12, primary_key=True, serialize=False)),
                ('city', models.CharField(max_length=20)),
                ('st_add', models.CharField(max_length=20)),
                ('state', models.CharField(max_length=20)),
                ('pos_code', models.CharField(max_length=10)),
                ('country', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('cust_id', models.CharField(default=safe_bank.models.generate_cust_id, max_length=12, primary_key=True, serialize=False)),
                ('cust_fname', models.CharField(max_length=20)),
                ('cust_lname', models.CharField(blank=True, max_length=20)),
                ('cust_email', models.EmailField(max_length=200)),
                ('cust_password', models.CharField(max_length=30)),
                ('cust_dob', models.DateTimeField()),
                ('cust_phno', models.BigIntegerField()),
                ('cust_ssn', models.CharField(max_length=9)),
            ],
        ),
        migrations.CreateModel(
            name='Request',
            fields=[
                ('req_id', models.AutoField(primary_key=True, serialize=False)),
                ('request_type', models.CharField(choices=[('loan', 'Loan'), ('profile_edit', 'Profile Edit'), ('transaction', 'Transaction')], max_length=20)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('cust_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='safe_bank.customer')),
            ],
        ),
        migrations.CreateModel(
            name='AccAdd',
            fields=[
                ('add_type', models.CharField(choices=[('COLLATERAL', 'Collateral'), ('MAILING', 'Mailing')], max_length=10)),
                ('add_id', models.CharField(max_length=12, primary_key=True, serialize=False)),
                ('acc_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='safe_bank.account')),
            ],
        ),
        migrations.CreateModel(
            name='Check',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('serchrg', models.DecimalField(decimal_places=2, max_digits=7)),
                ('acc_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='safe_bank.account')),
            ],
        ),
        migrations.CreateModel(
            name='CustAdd',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('add_type', models.CharField(choices=[('RESIDENTIAL', 'Residential'), ('BUSINESS', 'Business')], max_length=11)),
                ('add_id', models.CharField(max_length=12)),
                ('cust_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='safe_bank.customer')),
            ],
        ),
        migrations.AddField(
            model_name='account',
            name='cust_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='safe_bank.customer'),
        ),
        migrations.CreateModel(
            name='InsCmpny',
            fields=[
                ('insc_id', models.CharField(max_length=12, primary_key=True, serialize=False)),
                ('insc_name', models.CharField(max_length=50)),
                ('add_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='safe_bank.address')),
            ],
        ),
        migrations.CreateModel(
            name='Homloan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('house_buildyr', models.SmallIntegerField()),
                ('hm_ins_accno', models.CharField(max_length=12)),
                ('yr_ins_prem', models.DecimalField(decimal_places=2, max_digits=7)),
                ('acc_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='safe_bank.account')),
                ('insc_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='safe_bank.inscmpny')),
            ],
        ),
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lrate', models.DecimalField(decimal_places=2, max_digits=5)),
                ('lamount', models.DecimalField(decimal_places=3, max_digits=9)),
                ('lmonths', models.SmallIntegerField()),
                ('ltype', models.CharField(choices=[('S', 'Student'), ('P', 'Personal'), ('H', 'Home')], max_length=1)),
                ('lpay', models.DecimalField(decimal_places=2, max_digits=6)),
                ('acc_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='safe_bank.account')),
            ],
        ),
        migrations.CreateModel(
            name='LoanRequest',
            fields=[
                ('req_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='safe_bank.request')),
                ('ltype', models.CharField(choices=[('S', 'Student'), ('P', 'Personal'), ('H', 'Home')], max_length=1)),
                ('lamount', models.DecimalField(decimal_places=3, max_digits=9)),
                ('lmonths', models.SmallIntegerField()),
                ('lpay', models.DecimalField(decimal_places=2, max_digits=6)),
                ('lrate', models.DecimalField(decimal_places=2, max_digits=5)),
            ],
        ),
        migrations.CreateModel(
            name='ProfileEditRequest',
            fields=[
                ('req_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='safe_bank.request')),
                ('cust_fname', models.CharField(max_length=20)),
                ('cust_lname', models.CharField(blank=True, max_length=20)),
                ('cust_email', models.EmailField(max_length=200)),
                ('cust_password', models.CharField(max_length=30)),
                ('cust_dob', models.DateTimeField()),
                ('cust_phno', models.BigIntegerField()),
                ('cust_ssn', models.CharField(max_length=9)),
            ],
        ),
        migrations.CreateModel(
            name='Perloan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cred_sc', models.SmallIntegerField()),
                ('acc_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='safe_bank.account')),
            ],
        ),
        migrations.CreateModel(
            name='Save',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('intrate', models.DecimalField(decimal_places=2, max_digits=5)),
                ('acc_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='safe_bank.account')),
            ],
        ),
        migrations.CreateModel(
            name='Stuloan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uni_name', models.CharField(max_length=30)),
                ('stu_id', models.CharField(max_length=12)),
                ('slevel', models.CharField(choices=[('G', 'Graduate'), ('U', 'Undergraduate')], max_length=1)),
                ('smonth', models.SmallIntegerField()),
                ('syear', models.SmallIntegerField()),
                ('acc_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='safe_bank.loan')),
            ],
        ),
        migrations.CreateModel(
            name='TxnList',
            fields=[
                ('txn_id', models.CharField(max_length=12, primary_key=True, serialize=False)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=7)),
                ('datetime', models.DateTimeField()),
                ('receiver_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_txns', to='safe_bank.account')),
                ('sender_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_txns', to='safe_bank.account')),
            ],
        ),
        migrations.CreateModel(
            name='PersonalLoanRequest',
            fields=[
                ('req_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='safe_bank.loanrequest')),
            ],
        ),
        migrations.CreateModel(
            name='StudentLoanRequest',
            fields=[
                ('req_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='safe_bank.loanrequest')),
                ('uni_name', models.CharField(max_length=30)),
                ('stu_id', models.CharField(max_length=12)),
                ('slevel', models.CharField(choices=[('G', 'Graduate'), ('U', 'Undergraduate')], max_length=1)),
                ('smonth', models.SmallIntegerField()),
                ('syear', models.SmallIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='TransactionRequest',
            fields=[
                ('req_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='safe_bank.request')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=7)),
                ('datetime', models.DateTimeField(auto_now_add=True)),
                ('receiver_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_requests', to='safe_bank.account')),
                ('sender_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_requests', to='safe_bank.account')),
            ],
        ),
        migrations.CreateModel(
            name='HomeLoanRequest',
            fields=[
                ('req_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='safe_bank.loanrequest')),
                ('house_buildyr', models.SmallIntegerField()),
                ('hm_ins_accno', models.CharField(max_length=12)),
                ('yr_ins_prem', models.DecimalField(decimal_places=2, max_digits=7)),
                ('insc_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='safe_bank.inscmpny')),
            ],
        ),
    ]

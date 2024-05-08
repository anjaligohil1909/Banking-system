-- SQLINES DEMO *** no DDL - XMLTYPE

CREATE TABLE kjat_acc_add (
    add_type VARCHAR(10) NOT NULL COMMENT 'ADD_TYPE - ADDRESS TYPE.

CAN BE:

MAILING - FOR ALL MAILING AND BILLING PURPOSES
COLLATERAL - FOR HOME OR PERSONAL LOANS.
',
    add_id   VARCHAR(12) NOT NULL,
    acc_no   VARCHAR(10) NOT NULL
);

ALTER TABLE kjat_acc_add
    ADD CONSTRAINT c_add_acc_type CHECK ( add_type IN ( 'COLLATERAL', 'MAILING' ) );

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_acc_add.add_type IS
    'ADD_TYPE - ADDRESS TYPE.

CAN BE:

MAILING - FOR ALL MAILING AND BILLING PURPOSES
COLLATERAL - FOR HOME OR PERSONAL LOANS.
'; */

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE kjat_account (
    acc_no    VARCHAR(10) NOT NULL COMMENT 'ACC_NO - Stores the Account Number',
    date_open DATETIME NOT NULL COMMENT 'DATE_OPEN -  Opening Date of the account',
    balance   DECIMAL(9, 3) NOT NULL COMMENT 'BALANCE - Current Balance in the Account',
    acc_type  CHAR(1) NOT NULL COMMENT 'ACC_TYPE - Represents the Type of the ACCOUNT. CAN BE:

C	-	Checking
S	-	Savings
L	-	Loan',
    cust_id   VARCHAR(12) NOT NULL
);

ALTER TABLE kjat_account
    ADD CONSTRAINT ch_inh_kjat_account CHECK ( acc_type IN ( 'C', 'H', 'L', 'P', 'S' ) );

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_account.acc_no IS
    'ACC_NO - Stores the Account Number'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_account.date_open IS
    'DATE_OPEN -  Opening Date of the account'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_account.acc_type IS
    'ACC_TYPE - Represents the Type of the ACCOUNT. CAN BE:

C	-	Checking
S	-	Savings
L	-	Loan'; */

ALTER TABLE kjat_account ADD CONSTRAINT kjat_account_pk PRIMARY KEY ( acc_no );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE kjat_address (
    add_id   VARCHAR(12) NOT NULL COMMENT 'ADD_ID - Address ID',
    city     VARCHAR(20) NOT NULL COMMENT 'CITY - Storing The city name in the address',
    st_add   VARCHAR(20) NOT NULL COMMENT 'ST_ADD - Storing Street Address',
    state    VARCHAR(20) NOT NULL COMMENT 'STATE - Storing State Address',
    pos_code VARCHAR(10) NOT NULL COMMENT 'POS_CODE - Storing the POSTAL CODE',
    country  VARCHAR(20) COMMENT 'COUNTRY - Storing the Country mentioend in the address'
);



/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_address.add_id IS
    'ADD_ID - Address ID'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_address.city IS
    'CITY - Storing The city name in the address'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_address.st_add IS
    'ST_ADD - Storing Street Address'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_address.state IS
    'STATE - Storing State Address'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_address.pos_code IS
    'POS_CODE - Storing the POSTAL CODE'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_address.country IS
    'COUNTRY - Storing the Country mentioend in the address'; */

ALTER TABLE kjat_address ADD CONSTRAINT kjat_address_pk PRIMARY KEY ( add_id );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE kjat_check (
    acc_no  VARCHAR(10) NOT NULL COMMENT 'ACC_NO - Stores the Account Number',
    serchrg DECIMAL(7, 2) NOT NULL COMMENT 'SERCHRG - Service Charge'
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_check.acc_no IS
    'ACC_NO - Stores the Account Number'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_check.serchrg IS
    'SERCHRG - Service Charge'; */

ALTER TABLE kjat_check ADD CONSTRAINT kjat_check_pk PRIMARY KEY ( acc_no );

CREATE TABLE kjat_request (
    req_id INT AUTO_INCREMENT PRIMARY KEY,
    request_type ENUM('loan', 'profile_edit', 'transaction') NOT NULL,
    status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cust_id VARCHAR(12),  -- ForeignKey to Customer
    FOREIGN KEY (cust_id) REFERENCES kjat_customer(cust_id)
);

CREATE TABLE Kjat_loanreq (
    req_id INT PRIMARY KEY,
    ltype ENUM('H', 'S', 'P') NOT NULL,
    lrate DECIMAL(5, 2) NOT NULL,
    lamount DECIMAL(9, 3) NOT NULL,
    lmonths SMALLINT NOT NULL,
    lpay DECIMAL(6, 2) NOT NULL,
    FOREIGN KEY (req_id) REFERENCES kjat_request(req_id) ON DELETE CASCADE
);

ALTER TABLE kjat_loanreq ADD CONSTRAINT kjat_loanreq_pk PRIMARY KEY ( acc_no );

CREATE TABLE kjat_homlnreq (
    req_id INT PRIMARY KEY,
    house_build_year SMALLINT NOT NULL,
    home_insurance_account VARCHAR(12) NOT NULL,
    yearly_insurance_premium DECIMAL(7, 2) NOT NULL,
    FOREIGN KEY (req_id) REFERENCES LoanRequest(req_id)
);

CREATE TABLE kjat_stuloanreq (
    req_id INT PRIMARY KEY,
    uni_name VARCHAR(30) NOT NULL,
    stu_id VARCHAR(12) NOT NULL,
    slevel ENUM('U', 'G') NOT NULL,
    smonth TINYINT NOT NULL,
    syear SMALLINT NOT NULL,
    FOREIGN KEY (req_id) REFERENCES kjat_loanreq(req_id)
);

ALTER TABLE kjat_stuloanreq
    ADD CONSTRAINT c_stulonreq_mon CHECK ( smonth BETWEEN 1 AND 12 );

CREATE TABLE PerloanRequest (
    req_id INT PRIMARY KEY,
    credit_score SMALLINT NOT NULL,
    FOREIGN KEY (req_id) REFERENCES loanreq(req_id)
);

CREATE TABLE kjat_edit_profile (
    req_id INT PRIMARY KEY,
    cust_id VARCHAR(12) NOT NULL,
    cust_email VARCHAR(200),
    cust_password VARCHAR(30),
    cust_phno BIGINT,
    cust_ssn VARCHAR(9),
    FOREIGN KEY (req_id) REFERENCES kjat_request(req_id)
);

CREATE TABLE kjat_txn_req (
    req_id INT PRIMARY KEY,
    amount DECIMAL(7, 2) NOT NULL,
    datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    sender_no VARCHAR(10) NOT NULL,
    receiver_no VARCHAR(10) NOT NULL,
    FOREIGN KEY (req_id) REFERENCES kjat_request(req_id)
);


-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE kjat_cust_add (
    add_type VARCHAR(11) NOT NULL COMMENT 'ADD_TYPE - Address Type between Customer and linked Address.

CAN BE 
RESIDENTIAL
BUSINESS',
    add_id   VARCHAR(12) NOT NULL,
    cust_id  VARCHAR(12) NOT NULL
);

ALTER TABLE kjat_cust_add
    ADD CONSTRAINT c_custadd_type CHECK ( add_type IN ( 'BUSINESS', 'RESIDENTIAL' ) );

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_cust_add.add_type IS
    'ADD_TYPE - Address Type between Customer and linked Address.

CAN BE 
RESIDENTIAL
BUSINESS'; */

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE kjat_customer (
    cust_id       VARCHAR(12) NOT NULL COMMENT 'CUST_ID - Customer ID',
    cust_fname    VARCHAR(20) NOT NULL COMMENT 'CUST_FNAME - Customer First Name',
    cust_lname    VARCHAR(20) COMMENT 'CUST_LNAME - Customer Last(Surname/Family) Name',
    cust_email    VARCHAR(200) NOT NULL COMMENT 'CUST_EMAIL - Customer email',
    cust_password VARCHAR(30) NOT NULL COMMENT 'CUST_PASSWORD - Customer Password for the database',
    cust_dob      DATETIME COMMENT 'CUST_DOB - CUSTOMER DATE of BIRTH',
    cust_phno     BIGINT NOT NULL COMMENT 'CUST_PHNO -  Customer Phone No.'
    cust_ssn      VARCHAR(9) NOT NULL COMMENT 'CUST_SSN - Customer Social Security Number'
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_customer.cust_id IS
    'CUST_ID - Customer ID'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_customer.cust_fname IS
    'CUST_FNAME - Customer First Name'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_customer.cust_lname IS
    'CUST_LNAME - Customer Last(Surname/Family) Name'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_customer.cust_email IS
    'CUST_EMAIL - Customer email'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_customer.cust_password IS
    'CUST_PASSWORD - Customer Password for the database'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_customer.cust_dob IS
    'CUST_DOB - CUSTOMER DATE of BIRTH'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_customer.cust_dob1 IS
    'CUST_DOB - CUSTOMER Date of Birth'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_customer.cust_phno IS
    'CUST_PHNO -  Customer Phone No.'; */

ALTER TABLE kjat_customer ADD CONSTRAINT kjat_customer_pk PRIMARY KEY ( cust_id );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE kjat_homloan (
    acc_no        VARCHAR(10) NOT NULL COMMENT 'ACC_NO - Stores the Account Number',
    house_buildyr SMALLINT NOT NULL COMMENT 'HOUSE_BUILDYR - HOUSE BUILD YEAR',
    hm_ins_accno  VARCHAR(12) NOT NULL COMMENT 'HM_INS_ACCNO - Home Insurance Account Number assocaiated with the insurance company.',
    yr_ins_prem   DECIMAL(7, 2) NOT NULL COMMENT 'YR_INS_PREM - YeaRly INSurance PREMium',
    insc_id       VARCHAR(12) NOT NULL
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_homloan.acc_no IS
    'ACC_NO - Stores the Account Number'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_homloan.house_buildyr IS
    'HOUSE_BUILDYR - HOUSE BUILD YEAR'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_homloan.hm_ins_accno IS
    'HM_INS_ACCNO - Home Insurance Account Number assocaiated with the insurance company.'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_homloan.yr_ins_prem IS
    'YR_INS_PREM - YeaRly INSurance PREMium'; */

ALTER TABLE kjat_homloan ADD CONSTRAINT kjat_homloan_pk PRIMARY KEY ( acc_no );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE kjat_ins_cmpny (
    insc_id   VARCHAR(12) NOT NULL COMMENT 'INSC_ID - INSURANCE COMPANY ID',
    insc_name VARCHAR(50) NOT NULL COMMENT 'INSC_NAME - Name of the Insurance Company',
    add_id    VARCHAR(12) NOT NULL
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_ins_cmpny.insc_id IS
    'INSC_ID - INSURANCE COMPANY ID'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_ins_cmpny.insc_name IS
    'INSC_NAME - Name of the Insurance Company'; */

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE UNIQUE INDEX kjat_ins_cmpny__idx ON
    kjat_ins_cmpny (
        add_id
    ASC );

ALTER TABLE kjat_ins_cmpny ADD CONSTRAINT kjat_ins_cmpny_pk PRIMARY KEY ( insc_id );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE kjat_loan (
    acc_no  VARCHAR(10) NOT NULL COMMENT 'ACC_NO - Stores the Account Number',
    lrate   DECIMAL(5, 2) NOT NULL COMMENT 'LRATE - Loan Rate',
    lamount DECIMAL(9, 3) NOT NULL COMMENT 'LAMOUNT - Loan Amount',
    lmonths SMALLINT NOT NULL COMMENT 'LMONTHS -Term of the loan in months',
    ltype   CHAR(1) NOT NULL COMMENT 'LTYPE - Denotes the Type of the Loan. Can Be:

S	-	Student Loan
P	-	Personal Loan
H	-	Home Loan',
    lpay    DECIMAL(6, 2) NOT NULL COMMENT 'LPAY - Monthly loan back payment amount'
);

ALTER TABLE kjat_loan
    ADD CONSTRAINT ch_inh_kjat_loan CHECK ( ltype IN ( 'H', 'L', 'P', 'S' ) );

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_loan.acc_no IS
    'ACC_NO - Stores the Account Number'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_loan.lrate IS
    'LRATE - Loan Rate'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_loan.lamount IS
    'LAMOUNT - Loan Amount'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_loan.lmonths IS
    'LMONTHS -Term of the loan in months'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_loan.ltype IS
    'LTYPE - Denotes the Type of the Loan. Can Be:

S	-	Student Loan
P	-	Personal Loan
H	-	Home Loan'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_loan.lpay IS
    'LPAY - Monthly loan back payment amount'; */

ALTER TABLE kjat_loan ADD CONSTRAINT kjat_loan_pk PRIMARY KEY ( acc_no );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE kjat_perloan (
    acc_no  VARCHAR(10) NOT NULL COMMENT 'ACC_NO - Stores the Account Number',

);

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_perloan.acc_no IS
    'ACC_NO - Stores the Account Number'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_perloan.cred_sc IS
    'CRED_SC - Credit Score at time of loan origination'; */

ALTER TABLE kjat_perloan ADD CONSTRAINT kjat_perloan_pk PRIMARY KEY ( acc_no );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE kjat_save (
    acc_no  VARCHAR(10) NOT NULL COMMENT 'ACC_NO - Stores the Account Number',
    intrate DECIMAL(5, 2) NOT NULL COMMENT 'INTRATE - Interest Rate'
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_save.acc_no IS
    'ACC_NO - Stores the Account Number'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_save.intrate IS
    'INTRATE - Interest Rate'; */

ALTER TABLE kjat_save ADD CONSTRAINT kjat_save_pk PRIMARY KEY ( acc_no );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE kjat_stuloan (
    acc_no   VARCHAR(10) NOT NULL COMMENT 'ACC_NO - Stores the Account Number',
    uni_name VARCHAR(30) NOT NULL COMMENT 'UNI_NAME - UNIVERSITY NAME',
    stu_id   VARCHAR(12) NOT NULL COMMENT 'STU_ID - Student ID',
    slevel   CHAR(1) NOT NULL COMMENT 'SLEVEL -  Student''s Level of EDUCATION.
CAN BE:

G	-	Graduate
U	-	UnderGraduate',
    smonth   TINYINT NOT NULL COMMENT 'SMONTH - Graduation Month',
    syear    SMALLINT NOT NULL COMMENT 'SYEAR - GRADUATION YEAR'
);

ALTER TABLE kjat_stuloan
    ADD CONSTRAINT c_stuloan_lvl CHECK ( slevel IN ( 'G', 'U' ) );

ALTER TABLE kjat_stuloan
    ADD CONSTRAINT c_stuloan_smonth CHECK ( smonth BETWEEN 1 AND 12 );

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_stuloan.acc_no IS
    'ACC_NO - Stores the Account Number'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_stuloan.uni_name IS
    'UNI_NAME - UNIVERSITY NAME'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_stuloan.stu_id IS
    'STU_ID - Student ID'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_stuloan.slevel IS
    'SLEVEL -  Student''s Level of EDUCATION.
CAN BE:

G	-	Graduate
U	-	UnderGraduate'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_stuloan.smonth IS
    'SMONTH - Graduation Month'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_stuloan.syear IS
    'SYEAR - GRADUATION YEAR'; */

ALTER TABLE kjat_stuloan ADD CONSTRAINT kjat_stuloan_pk PRIMARY KEY ( acc_no );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE kjat_txn_list (
    txn_id      VARCHAR(12) NOT NULL COMMENT 'TXN_ID - TRANSACTION_ID',
    amount      DECIMAL(7, 2) NOT NULL,
    datetime    DATETIME NOT NULL,
    sender_no   VARCHAR(10) NOT NULL COMMENT 'SENDER_NO - Sender Account No',
    receiver_no VARCHAR(10) NOT NULL COMMENT 'RECEIVER_NO - Receiver Account No'
);

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_txn_list.txn_id IS
    'TXN_ID - TRANSACTION_ID'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_txn_list.sender_no IS
    'SENDER_NO - Sender Account No'; */

/* Moved to CREATE TABLE
COMMENT ON COLUMN kjat_txn_list.receiver_no IS
    'RECEIVER_NO - Receiver Account No'; */

ALTER TABLE kjat_txn_list ADD CONSTRAINT kjat_txn_list_pk PRIMARY KEY ( txn_id );

ALTER TABLE kjat_acc_add
    ADD CONSTRAINT kjat_acc_add_acc_fk FOREIGN KEY ( acc_no )
        REFERENCES kjat_account ( acc_no );

ALTER TABLE kjat_acc_add
    ADD CONSTRAINT kjat_acc_add_add_fk FOREIGN KEY ( add_id )
        REFERENCES kjat_address ( add_id );

ALTER TABLE kjat_account
    ADD CONSTRAINT kjat_account_cust_fk FOREIGN KEY ( cust_id )
        REFERENCES kjat_customer ( cust_id );

ALTER TABLE kjat_check
    ADD CONSTRAINT kjat_check_acc_fk FOREIGN KEY ( acc_no )
        REFERENCES kjat_account ( acc_no );

ALTER TABLE kjat_cust_add
    ADD CONSTRAINT kjat_cust_add_add_fk FOREIGN KEY ( add_id )
        REFERENCES kjat_address ( add_id );

ALTER TABLE kjat_cust_add
    ADD CONSTRAINT kjat_cust_add_cust_fk FOREIGN KEY ( cust_id )
        REFERENCES kjat_customer ( cust_id );

ALTER TABLE kjat_homloan
    ADD CONSTRAINT kjat_homloan_insc_fk FOREIGN KEY ( insc_id )
        REFERENCES kjat_ins_cmpny ( insc_id );

ALTER TABLE kjat_homloan
    ADD CONSTRAINT kjat_homloan_loan_fk FOREIGN KEY ( acc_no )
        REFERENCES kjat_loan ( acc_no );

ALTER TABLE kjat_ins_cmpny
    ADD CONSTRAINT kjat_ins_cmpny_add_fk FOREIGN KEY ( add_id )
        REFERENCES kjat_address ( add_id );

ALTER TABLE kjat_loan
    ADD CONSTRAINT kjat_loan_acc_fk FOREIGN KEY ( acc_no )
        REFERENCES kjat_account ( acc_no );

ALTER TABLE kjat_perloan
    ADD CONSTRAINT kjat_perloan_loan_fk FOREIGN KEY ( acc_no )
        REFERENCES kjat_loan ( acc_no );

ALTER TABLE kjat_save
    ADD CONSTRAINT kjat_save_acc_fk FOREIGN KEY ( acc_no )
        REFERENCES kjat_account ( acc_no );

ALTER TABLE kjat_stuloan
    ADD CONSTRAINT kjat_stuloan_loan_fk FOREIGN KEY ( acc_no )
        REFERENCES kjat_loan ( acc_no );

ALTER TABLE kjat_txn_list
    ADD CONSTRAINT kjat_txn_list_acc_r_fk FOREIGN KEY ( sender_no )
        REFERENCES kjat_account ( acc_no );

ALTER TABLE kjat_txn_list
    ADD CONSTRAINT kjat_txn_list_acc_s_fk FOREIGN KEY ( receiver_no )
        REFERENCES kjat_account ( acc_no );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
DROP TRIGGER IF EXISTS arc_fkarc_2_kjat_loan;

DELIMITER //

-- Trigger for INSERT event
CREATE TRIGGER arc_fkarc_2_kjat_loan_insert
BEFORE INSERT ON kjat_loan
FOR EACH ROW
BEGIN
    DECLARE d CHAR(1);
    
    SELECT a.acc_type INTO d 
    FROM kjat_account a 
    WHERE a.acc_no = NEW.acc_no;
    
    IF (d IS NULL OR d <> 'L') THEN
        SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'FK KJAT_LOAN_ACC_FK in Table KJAT_LOAN violates Arc constraint on Table KJAT_ACCOUNT - discriminator column ACC_TYPE doesn''t have value ''L''';
    END IF;
END //

-- Trigger for UPDATE event
CREATE TRIGGER arc_fkarc_2_kjat_loan_update
BEFORE UPDATE ON kjat_loan
FOR EACH ROW
BEGIN
    DECLARE d CHAR(1);
    
    SELECT a.acc_type INTO d 
    FROM kjat_account a 
    WHERE a.acc_no = NEW.acc_no;
    
    IF (d IS NULL OR d <> 'L') THEN
        SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'FK KJAT_LOAN_ACC_FK in Table KJAT_LOAN violates Arc constraint on Table KJAT_ACCOUNT - discriminator column ACC_TYPE doesn''t have value ''L''';
    END IF;
END //

DELIMITER ;



-- SQLINES LICENSE FOR EVALUATION USE ONLY
DROP TRIGGER IF EXISTS arc_fkarc_2_kjat_save;

DELIMITER //

-- Trigger for INSERT event
CREATE TRIGGER arc_fkarc_2_kjat_save_insert
BEFORE INSERT ON kjat_save
FOR EACH ROW
BEGIN
    DECLARE d CHAR(1);
    
    SELECT a.acc_type INTO d 
    FROM kjat_account a 
    WHERE a.acc_no = NEW.acc_no;
    
    IF (d IS NULL OR d <> 'S') THEN
        SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'FK KJAT_SAVE_ACC_FK in Table KJAT_SAVE violates Arc constraint on Table KJAT_ACCOUNT - discriminator column ACC_TYPE doesn''t have value ''S''';
    END IF;
END //

-- Trigger for UPDATE event
CREATE TRIGGER arc_fkarc_2_kjat_save_update
BEFORE UPDATE ON kjat_save
FOR EACH ROW
BEGIN
    DECLARE d CHAR(1);
    
    SELECT a.acc_type INTO d 
    FROM kjat_account a 
    WHERE a.acc_no = NEW.acc_no;
    
    IF (d IS NULL OR d <> 'S') THEN
        SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'FK KJAT_SAVE_ACC_FK in Table KJAT_SAVE violates Arc constraint on Table KJAT_ACCOUNT - discriminator column ACC_TYPE doesn''t have value ''S''';
    END IF;
END //

DELIMITER ;


-- SQLINES LICENSE FOR EVALUATION USE ONLY
DROP TRIGGER IF EXISTS arc_fkarc_2_kjat_check;

DELIMITER //

-- Trigger for INSERT event
CREATE TRIGGER arc_fkarc_2_kjat_check_insert
BEFORE INSERT ON kjat_check
FOR EACH ROW
BEGIN
    DECLARE d CHAR(1);
    
    SELECT a.acc_type INTO d 
    FROM kjat_account a 
    WHERE a.acc_no = NEW.acc_no;
    
    IF (d IS NULL OR d <> 'C') THEN
        SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'FK KJAT_CHECK_ACC_FK in Table KJAT_CHECK violates Arc constraint on Table KJAT_ACCOUNT - discriminator column ACC_TYPE doesn''t have value ''C''';
    END IF;
END //

-- Trigger for UPDATE event
CREATE TRIGGER arc_fkarc_2_kjat_check_update
BEFORE UPDATE ON kjat_check
FOR EACH ROW
BEGIN
    DECLARE d CHAR(1);
    
    SELECT a.acc_type INTO d 
    FROM kjat_account a 
    WHERE a.acc_no = NEW.acc_no;
    
    IF (d IS NULL OR d <> 'C') THEN
        SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'FK KJAT_CHECK_ACC_FK in Table KJAT_CHECK violates Arc constraint on Table KJAT_ACCOUNT - discriminator column ACC_TYPE doesn''t have value ''C''';
    END IF;
END //

DELIMITER ;



-- SQLINES LICENSE FOR EVALUATION USE ONLY
DROP TRIGGER IF EXISTS arc_fkarc_1_kjat_stuloan;

DELIMITER //

-- Trigger for INSERT event
CREATE TRIGGER arc_fkarc_1_kjat_stuloan_insert
BEFORE INSERT ON kjat_stuloan
FOR EACH ROW
BEGIN
    DECLARE d CHAR(1);
    
    SELECT a.ltype INTO d 
    FROM kjat_loan a 
    WHERE a.acc_no = NEW.acc_no;
    
    IF (d IS NULL OR d <> 'S') THEN
        SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'FK KJAT_STULOAN_LOAN_FK in Table KJAT_STULOAN violates Arc constraint on Table KJAT_LOAN - discriminator column LTYPE doesn''t have value ''S''';
    END IF;
END //

-- Trigger for UPDATE event
CREATE TRIGGER arc_fkarc_1_kjat_stuloan_update
BEFORE UPDATE ON kjat_stuloan
FOR EACH ROW
BEGIN
    DECLARE d CHAR(1);
    
    SELECT a.ltype INTO d 
    FROM kjat_loan a 
    WHERE a.acc_no = NEW.acc_no;
    
    IF (d IS NULL OR d <> 'S') THEN
        SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'FK KJAT_STULOAN_LOAN_FK in Table KJAT_STULOAN violates Arc constraint on Table KJAT_LOAN - discriminator column LTYPE doesn''t have value ''S''';
    END IF;
END //

DELIMITER ;



-- SQLINES LICENSE FOR EVALUATION USE ONLY
DROP TRIGGER IF EXISTS arc_fkarc_1_kjat_perloan;

DELIMITER //

-- Trigger for INSERT event
CREATE TRIGGER arc_fkarc_1_kjat_perloan_insert
BEFORE INSERT ON kjat_perloan
FOR EACH ROW
BEGIN
    DECLARE d CHAR(1);
    
    SELECT a.ltype INTO d 
    FROM kjat_loan a 
    WHERE a.acc_no = NEW.acc_no;
    
    IF (d IS NULL OR d <> 'P') THEN
        SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'FK KJAT_PERLOAN_LOAN_FK in Table KJAT_PERLOAN violates Arc constraint on Table KJAT_LOAN - discriminator column LTYPE doesn''t have value ''P''';
    END IF;
END //

-- Trigger for UPDATE event
CREATE TRIGGER arc_fkarc_1_kjat_perloan_update
BEFORE UPDATE ON kjat_perloan
FOR EACH ROW
BEGIN
    DECLARE d CHAR(1);
    
    SELECT a.ltype INTO d 
    FROM kjat_loan a 
    WHERE a.acc_no = NEW.acc_no;
    
    IF (d IS NULL OR d <> 'P') THEN
        SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'FK KJAT_PERLOAN_LOAN_FK in Table KJAT_PERLOAN violates Arc constraint on Table KJAT_LOAN - discriminator column LTYPE doesn''t have value ''P''';
    END IF;
END //

DELIMITER ;



-- SQLINES LICENSE FOR EVALUATION USE ONLY
DROP TRIGGER IF EXISTS arc_fkarc_1_kjat_homloan;

DELIMITER //

-- Trigger for INSERT event
CREATE TRIGGER arc_fkarc_1_kjat_homloan_insert
BEFORE INSERT ON kjat_homloan
FOR EACH ROW
BEGIN
    DECLARE d CHAR(1);
    
    SELECT a.ltype INTO d 
    FROM kjat_loan a 
    WHERE a.acc_no = NEW.acc_no;
    
    IF (d IS NULL OR d <> 'H') THEN
        SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'FK KJAT_HOMLOAN_LOAN_FK in Table KJAT_HOMLOAN violates Arc constraint on Table KJAT_LOAN - discriminator column LTYPE doesn''t have value ''H''';
    END IF;
END //

-- Trigger for UPDATE event
CREATE TRIGGER arc_fkarc_1_kjat_homloan_update
BEFORE UPDATE ON kjat_homloan
FOR EACH ROW
BEGIN
    DECLARE d CHAR(1);
    
    SELECT a.ltype INTO d 
    FROM kjat_loan a 
    WHERE a.acc_no = NEW.acc_no;
    
    IF (d IS NULL OR d <> 'H') THEN
        SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'FK KJAT_HOMLOAN_LOAN_FK in Table KJAT_HOMLOAN violates Arc constraint on Table KJAT_LOAN - discriminator column LTYPE doesn''t have value ''H''';
    END IF;
END //

DELIMITER ;

DROP TRIGGER IF EXISTS trg_after_update_loan_request;

CREATE PROCEDURE create_homeloan(IN req_id INT)
BEGIN
    DECLARE house_build_year SMALLINT;
    DECLARE home_insurance_account VARCHAR(12);
    DECLARE yearly_insurance_premium DECIMAL(7, 2);
    DECLARE cust_id VARCHAR(12);
    DECLARE acc_no VARCHAR(10);
    DECLARE ltype CHAR(1);
    DECLARE lrate DECIMAL(5, 2);
    DECLARE lamount DECIMAL(9, 3);
    DECLARE lmonths SMALLINT;
    DECLARE lpay DECIMAL(6, 2);
    DECLARE lmonths SMALLINT;
    DECLARE created_at DATETIME;
    DECLARE acc_no VARCHAR(10);
    
    SELECT house_build_year, home_insurance_account, yearly_insurance_premium
    INTO house_build_year, home_insurance_account, yearly_insurance_premium
    FROM kjat_homlnreq
    WHERE req_id = req_id;

    SELECT ltype, lrate, lamount, lmonths, lpay
    INTO ltype, lrate, lamount, lmonths, lpay
    FROM kjat_loanreq 
    WHERE req_id = req_id;

    SELECT cust_id, created_at 
    INTO cust_id, created_at
    FROM kjat_request
    WHERE req_id = req_id;

    INSERT INTO kjat_account (acc_no, date_open, lamount, 'L', cust_id)

    INSERT INTO kjat_loan (acc_no, lrate, lamount, lmonths, ltype, lpay)
    
    INSERT INTO kjat_homloan (acc_no, house_buildyr, hm_ins_accno, yr_ins_prem)
    VALUES (NEW.acc_no, house_build_year, home_insurance_account, yearly_insurance_premium);
END;

DELIMITER //

CREATE TRIGGER trg_after_update_loan_request
AFTER UPDATE ON LoanRequest
FOR EACH ROW
BEGIN
    IF NEW.status = 'approved' THEN
        CASE
            WHEN NEW.ltype = 'H' THEN
                -- Assuming function create_homeloan performs necessary actions
                CALL create_homeloan(NEW.req_id);
            WHEN NEW.ltype = 'S' THEN
                CALL create_stuloan(NEW.req_id);
            WHEN NEW.ltype = 'P' THEN
                CALL create_perloan(NEW.req_id);
        END CASE;
    END IF;
END; //
DELIMITER ;


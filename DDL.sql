-- This SQL script creates a database schema for car dealership operations.
-- It includes seven tables - Salespeople, Finance_Companies, Features, Customers, Cars, Transactions and Car_Features.
-- It handles the creation, dropping, and population of tables

-- Disable foreign key checks and set autocommit to 0
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Drop tables if they exist
DROP TABLE IF EXISTS Car_Features;
DROP TABLE IF EXISTS Features;
DROP TABLE IF EXISTS Finance_Companies;
DROP TABLE IF EXISTS Salespeople;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Transactions;
DROP TABLE IF EXISTS Cars;

-- change to personal ONID when using phpMyAdmin/CLI
USE cs340_tarshany;

-- Create table Salespeople
CREATE OR REPLACE TABLE Salespeople (
  Salesperson_id INT AUTO_INCREMENT PRIMARY KEY,
  Salesperson_fname VARCHAR(50) NOT NULL,
  Salesperson_lname VARCHAR(50) NOT NULL,
  Salesperson_phone VARCHAR(50) NOT NULL,
  Salesperson_email VARCHAR(50) NOT NULL
);

-- Create table Finance_Companies
CREATE OR REPLACE TABLE Finance_Companies (
  Finance_company_id INT AUTO_INCREMENT PRIMARY KEY,
  Finance_company_name VARCHAR(50) NOT NULL,
  Finance_company_email VARCHAR(50) NOT NULL,
  Finance_company_street VARCHAR(50) NOT NULL,
  Finance_company_second_street VARCHAR(50) NULL,
  Finance_company_city VARCHAR(50) NOT NULL,
  Finance_company_state VARCHAR(50) NOT NULL,
  Finance_company_zip VARCHAR(50) NOT NULL
);


-- Create table Features
CREATE OR REPLACE TABLE Features (
  Feature_id INT AUTO_INCREMENT PRIMARY KEY,
  Feature_name VARCHAR(50) NOT NULL
);

-- Create table Customers
CREATE OR REPLACE TABLE Customers (
  Customer_id INT AUTO_INCREMENT PRIMARY KEY,
  Customer_fname VARCHAR(50) NOT NULL,
  Customer_lname VARCHAR(50) NOT NULL,
  Customer_phone VARCHAR(50) NOT NULL,
  Customer_email VARCHAR(50) NOT NULL,
  Customer_street VARCHAR(50) NOT NULL,
  Customer_second_street VARCHAR(50) NOT NULL,
  Customer_city VARCHAR(50) NOT NULL,
  Customer_state VARCHAR(50) NOT NULL,
  Customer_zip VARCHAR(50) NOT NULL
);

-- Create table Cars
CREATE OR REPLACE TABLE Cars (
  Car_id INT AUTO_INCREMENT PRIMARY KEY,
  Car_make VARCHAR(50) NOT NULL,
  Car_model VARCHAR(50) NOT NULL,
  Car_year INT NOT NULL,
  Car_color VARCHAR(50) NOT NULL,
  Car_mileage INT NOT NULL,
  Car_vin VARCHAR(50) UNIQUE NOT NULL,
  Car_price DECIMAL(10, 2) NOT NULL,
  Car_forsale BOOLEAN NOT NULL,
  Customer_id INT NULL,
  FOREIGN KEY (Customer_id) REFERENCES Customers(Customer_id)
);

-- Create table Transactions
CREATE OR REPLACE TABLE Transactions (
  Sale_id INT AUTO_INCREMENT PRIMARY KEY,
  Sale_price DECIMAL(10, 2) NOT NULL,
  Customer_id INT,
  Car_id INT,
  Salesperson_id INT,
  Sale_date DATE NOT NULL,
  Finance_company_id INT,
  Loan_amount INT,
  Loan_duration INT,
  Interest_rate DECIMAL(4, 2),
  Sale_status INT NOT NULL,
  FOREIGN KEY (Customer_id) REFERENCES Customers(Customer_id),
  FOREIGN KEY (Car_id) REFERENCES Cars(Car_id),
  FOREIGN KEY (Salesperson_id) REFERENCES Salespeople(Salesperson_id),
  FOREIGN KEY (Finance_company_id) REFERENCES Finance_Companies(Finance_company_id)
);

-- Create table Car_Features
CREATE OR REPLACE TABLE Car_Features (
  Car_id INT,
  Feature_id INT,
  PRIMARY KEY (Car_id, Feature_id),
  FOREIGN KEY (Car_id) REFERENCES Cars(Car_id),
  FOREIGN KEY (Feature_id) REFERENCES Features(Feature_id)
);



-- Adding placeholder data

-- Insert data into Salespeople
INSERT INTO Salespeople (Salesperson_fname, Salesperson_lname, Salesperson_phone, Salesperson_email)
VALUES
('Mark', 'Smith', '555-555-5555', 'mark.smith@email.com'),
('Sara', 'Davis', '555-666-6666', 'sara.davis@email.com'),
('Paul', 'Johnson', '555-777-7777', 'paul.johnson@email.com'),
('Laura', 'Lee', '555-888-8888', 'laura.lee@email.com'),
('Mike', 'Wilson', '555-999-9999', 'mike.wilson@email.com'),
('Emma', 'Taylor', '555-111-1111', 'emma.taylor@email.com');

-- Insert data into Finance_Companies
INSERT INTO Finance_Companies (Finance_company_name, Finance_company_email, Finance_company_street, Finance_company_second_street, Finance_company_city, Finance_company_state, Finance_company_zip)
VALUES
('Fast Bank', 'contact@fastbank.com', '789 First St', NULL, 'Los Angeles', 'California', '11111'),
('Secure Finance', 'info@securefinance.com', '312 Second St', NULL, 'New York', 'New York', '22222'),
('Prime Credit', 'support@primecredit.com', '654 Third St', 'Suite 5', 'Miami', 'Florida', '33333'),
('Easy Money', 'hello@easymoney.com', '987 Fourth St', NULL, 'Portland', 'Maine', '44444'),
('Trust Capital', 'service@trustcapital.com', '123 Fifth St', NULL, 'Detroit', 'Michigan', '55555'),
('Solid Loan', 'care@solidloan.com', '456 Sixth St', 'Unit 1A', 'Billings', 'Montana', '66666');

-- Insert data into Features
INSERT INTO Features (Feature_name)
VALUES
('Leather seats'),
('Sunroof'),
('Bluetooth'),
('GPS Navigation'),
('Heated seats'),
('Rearview camera');

-- Insert data into Customers
INSERT INTO Customers (Customer_fname, Customer_lname, Customer_phone, Customer_email, Customer_street, Customer_second_street, Customer_city, Customer_state, Customer_zip)
VALUES
('John', 'Doe', '111-123-4567', 'john.doe@email.com', '123 Main St', NULL, 'Los Angeles', 'California', '11111'),
('Jane', 'Doe', '111-765-4321', 'jane.doe@email.com', '456 Elm St', NULL, 'New York', 'New York', '22222'),
('Jim', 'Brown', '111-321-6547', 'jim.brown@email.com', '789 Second St', 'Apt 10', 'Miami', 'Florida', '33333'),
('Lisa', 'Green', '111-987-1234', 'lisa.green@email.com', '321 Third St', NULL, 'Portland', 'Maine', '44444'),
('Bob', 'Black', '111-654-9871', 'bob.black@email.com', '654 Fourth St', NULL, 'Detroit', 'Michigan', '55555'),
('Alice', 'White', '111-789-3216', 'alice.white@email.com', '987 Fifth St', 'Apt 2', 'Billings', 'Montana', '66666');

-- Insert data into Cars
INSERT INTO Cars (Car_make, Car_model, Car_year, Car_color, Car_mileage, Car_vin, Car_price, Car_forsale, Customer_id)
VALUES
('Toyota', 'Corolla', 2020, 'Red', 10000, '1HGCM82633A123456', 20000, TRUE, (SELECT Customer_id FROM Customers WHERE Customer_fname = 'John' AND Customer_lname = 'Doe')),
('Ford', 'F-150', 2021, 'Blue', 5000, '1ZVBP8CF0E5223456', 30000, FALSE, NULL),
('Honda', 'Accord', 2019, 'Black', 15000, '2HGFA16536H123456', 18000, TRUE, (SELECT Customer_id FROM Customers WHERE Customer_fname = 'Jane' AND Customer_lname = 'Doe')),
('Nissan', 'Altima', 2020, 'White', 12000, '1N4AL21E38N123456', 21000, FALSE, NULL),
('BMW', 'M3', 2022, 'Blue', 3000, 'WBS8M9C57J5L123456', 70000, TRUE, (SELECT Customer_id FROM Customers WHERE Customer_fname = 'Alice' AND Customer_lname = 'White')),
('Audi', 'A4', 2023, 'Silver', 0, 'WAUENAF4XJA123456', 60000, TRUE, NULL);

-- Insert data into Transactions
INSERT INTO Transactions (Sale_price, Customer_id, Car_id, Salesperson_id, Sale_date, Finance_company_id, Loan_amount, Loan_duration, Interest_rate, Sale_status)
VALUES
(20000, (SELECT Customer_id FROM Customers WHERE Customer_fname = 'John' AND Customer_lname = 'Doe'), (SELECT Car_id FROM Cars WHERE Car_make = 'Toyota' AND Car_model = 'Corolla'), (SELECT Salesperson_id FROM Salespeople WHERE Salesperson_fname = 'Mark' AND Salesperson_lname = 'Smith'), '2023-07-01', (SELECT Finance_company_id FROM Finance_Companies WHERE Finance_Company_name = 'Fast Bank'), NULL, NULL, NULL, 2),
(25000, (SELECT Customer_id FROM Customers WHERE Customer_fname = 'Jane' AND Customer_lname = 'Doe'), (SELECT Car_id FROM Cars WHERE Car_make = 'Honda' AND Car_model = 'Accord'), (SELECT Salesperson_id FROM Salespeople WHERE Salesperson_fname = 'Mark' AND Salesperson_lname = 'Smith'), '2023-07-10', (SELECT Finance_company_id FROM Finance_Companies WHERE Finance_Company_name = 'Fast Bank'), 15000, 48, 3.2, 1),
(18000, (SELECT Customer_id FROM Customers WHERE Customer_fname = 'Jane' AND Customer_lname = 'Doe'), (SELECT Car_id FROM Cars WHERE Car_make = 'Honda' AND Car_model = 'Accord'), (SELECT Salesperson_id FROM Salespeople WHERE Salesperson_fname = 'Sara' AND Salesperson_lname = 'Davis'), '2023-07-03', (SELECT Finance_company_id FROM Finance_Companies WHERE Finance_Company_name = 'Fast Bank'), NULL, NULL, NULL, 2),
(21000, (SELECT Customer_id FROM Customers WHERE Customer_fname = 'Bob' AND Customer_lname = 'Black'), (SELECT Car_id FROM Cars WHERE Car_make = 'Nissan' AND Car_model = 'Altima'), (SELECT Salesperson_id FROM Salespeople WHERE Salesperson_fname = 'Paul' AND Salesperson_lname = 'Johnson'), '2023-07-07', (SELECT Finance_company_id FROM Finance_Companies WHERE Finance_Company_name = 'Fast Bank'), NULL, NULL, NULL, 1),
(70000, (SELECT Customer_id FROM Customers WHERE Customer_fname = 'Alice' AND Customer_lname = 'White'), (SELECT Car_id FROM Cars WHERE Car_make = 'BMW' AND Car_model = 'M3'), (SELECT Salesperson_id FROM Salespeople WHERE Salesperson_fname = 'Paul' AND Salesperson_lname = 'Johnson'), '2023-07-05', (SELECT Finance_company_id FROM Finance_Companies WHERE Finance_Company_name = 'Secure Finance'), 50000, 60, 2.5, 2),
(40000, (SELECT Customer_id FROM Customers WHERE Customer_fname = 'Lisa' AND Customer_lname = 'Green'), (SELECT Car_id FROM Cars WHERE Car_make = 'Audi' AND Car_model = 'A4'), (SELECT Salesperson_id FROM Salespeople WHERE Salesperson_fname = 'Sara' AND Salesperson_lname = 'Davis'), '2023-07-02', (SELECT Finance_company_id FROM Finance_Companies WHERE Finance_Company_name = 'Fast Bank'), 30000, 48, 3, 1);

-- Insert data into Car_Features
INSERT INTO Car_Features (Car_id, Feature_id)
VALUES
((SELECT Car_id FROM Cars WHERE Car_make = 'Toyota' AND Car_model = 'Corolla'), (SELECT Feature_id FROM Features WHERE Feature_name = 'Leather seats')),
((SELECT Car_id FROM Cars WHERE Car_make = 'Toyota' AND Car_model = 'Corolla'), (SELECT Feature_id FROM Features WHERE Feature_name = 'Sunroof')),
((SELECT Car_id FROM Cars WHERE Car_make = 'Ford' AND Car_model = 'F-150'), (SELECT Feature_id FROM Features WHERE Feature_name = 'Sunroof')),
((SELECT Car_id FROM Cars WHERE Car_make = 'Honda' AND Car_model = 'Accord'), (SELECT Feature_id FROM Features WHERE Feature_name = 'Bluetooth')),
((SELECT Car_id FROM Cars WHERE Car_make = 'Nissan' AND Car_model = 'Altima'), (SELECT Feature_id FROM Features WHERE Feature_name = 'GPS Navigation')),
((SELECT Car_id FROM Cars WHERE Car_make = 'BMW' AND Car_model = 'M3'), (SELECT Feature_id FROM Features WHERE Feature_name = 'Heated seats')),
((SELECT Car_id FROM Cars WHERE Car_make = 'Audi' AND Car_model = 'A4'), (SELECT Feature_id FROM Features WHERE Feature_name = 'Rearview camera'));

-- Enable foreign key checks and commit changes
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

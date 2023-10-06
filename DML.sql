-- Create a new car record
INSERT INTO cars (Car_make, Car_model, Car_year, Car_color, Car_mileage, Car_vin, Car_price, Car_forsale, Customer_id)
VALUES ('GenericMake', 'GenericModel', 2023, 'GenericColor', 10000, 'GenericVIN', 25000, TRUE, NULL);

-- Read all car records
SELECT * FROM cars;

-- Read cars available for sale
SELECT * FROM cars WHERE Car_forsale = TRUE;

-- Update a car record
UPDATE cars
SET Car_make = 'UpdatedMake', Car_model = 'UpdatedModel', Car_year = 2022, Car_price = 22000, Car_forsale = FALSE
WHERE Car_id = 1;

-- Delete a car record
DELETE FROM cars WHERE Car_id = 1;

-- Create a new transaction record
INSERT INTO Transactions (Sale_price, Customer_id, Car_id, Salesperson_id, Sale_date, Finance_company_id, Loan_amount, Loan_duration, Interest_rate, Sale_status)
VALUES (25000.00, 1, 1, 101, '2023-07-22', 201, 20000, 36, 5.25, 1);

-- Read all transaction records
SELECT * FROM Transactions;

-- Update a transaction record
UPDATE Transactions
SET Sale_price = 22000.00, Sale_status = 2
WHERE Sale_id = 1;

-- Delete a transaction record
DELETE FROM Transactions WHERE Sale_id = 1;

-- Create a new customer record
INSERT INTO Customers (Customer_fname, Customer_lname, Customer_phone, Customer_email, Customer_street, Customer_second_street, Customer_city, Customer_state, Customer_zip)
VALUES ('GenericFirstName', 'GenericLastName', '123-456-7890', 'generic.email@example.com', 'Main Street', NULL, 'Cityville', 'Stateville', '12345');

-- Read all customer records
SELECT * FROM Customers;

-- Update a customer record
UPDATE Customers
SET Customer_phone = '987-654-3210', Customer_email = 'updated.generic@example.com'
WHERE Customer_id = 1;

-- Delete a customer record
DELETE FROM Customers WHERE Customer_id = 1;

-- Create a new salesperson record
INSERT INTO Salespeople (Salesperson_fname, Salesperson_lname, Salesperson_phone, Salesperson_email)
VALUES ('GenericSalespersonFname', 'GenericSalespersonLname', '555-123-4567', 'generic.salesperson@example.com');

-- Read all salesperson records
SELECT * FROM Salespeople;

-- Update a salesperson record
UPDATE Salespeople
SET Salesperson_phone = '555-987-6543'
WHERE Salesperson_id = 1;

-- Delete a salesperson record
DELETE FROM Salespeople WHERE Salesperson_id = 1;

-- Create a new finance company record
INSERT INTO Finance_Companies (Finance_company_name, Finance_company_email, Finance_company_street, Finance_company_second_street, Finance_company_city, Finance_company_state, Finance_company_zip)
VALUES ('GenericFinanceCompany', 'finance@example.com', 'Finance Street', NULL, 'Finance City', 'Finance State', '54321');

-- Read all finance company records
SELECT * FROM Finance_Companies;

-- Update a finance company record
UPDATE Finance_Companies
SET Finance_company_email = 'updated.generic@example.com'
WHERE Finance_company_id = 1;

-- Delete a finance company record
DELETE FROM Finance_Companies WHERE Finance_company_id = 1;

-- Create a new feature record
INSERT INTO Features (Feature_name)
VALUES ('GenericFeature');

-- Read all feature records
SELECT * FROM Features;

-- Update a feature record
UPDATE Features
SET Feature_name = 'UpdatedGenericFeature'
WHERE Feature_id = 1;

-- Delete a feature record
DELETE FROM Features WHERE Feature_id = 1;

-- Create a new car_feature record
INSERT INTO Car_Features (Feature_id, Car_id)
VALUES (1, 1);

-- Read all car_feature records
SELECT * FROM Car_Features;

-- Update a car_feature record
UPDATE Car_Features SET Feature_id = 'newFeatureID' WHERE Car_id = 'carID' AND Feature_id = 'featureID'

-- Delete a car_feature record
DELETE FROM Car_Features WHERE Car_id = 1 AND Feature_id = 1;

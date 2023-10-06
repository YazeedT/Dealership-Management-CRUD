// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 1111;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')


// Use Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Handle JSON and Form Data
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))


// ROUTES
app.get('/', function(req, res)
    {
        res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });
    

app.get('/cars', function(req, res) {  
    // Declare queries
    let query1, query2;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.make === undefined) {
        query1 = "SELECT * FROM Cars;";
    }
    // If there is a query string, we assume this is a search, and return desired results
    else {
        query1 = `SELECT * FROM Cars WHERE Car_make LIKE "${req.query.make}%"`;
    }

    query2 = "SELECT * FROM Customers;";  // To fetch all customers

    // First fetch cars
    db.pool.query(query1, function(error1, rows1, fields1) {

        // Then fetch customers
        db.pool.query(query2, function(error2, rows2, fields2) {

            // Render the view with both cars and customers data
            res.render('cars', { 
                data: rows1, 
                customers: rows2
            });
        });
    });
});   
            


app.get('/transactions', function(req, res) { 
    // Declare queries
    let queryTransactions = "SELECT * FROM Transactions;";
    let queryCustomers = "SELECT * FROM Customers;";
    let queryCars = "SELECT * FROM Cars;";
    let querySalespeople = "SELECT * FROM Salespeople;";
    let queryFinanceCompanies = "SELECT * FROM Finance_Companies;";

    // Execute the query for Transactions
    db.pool.query(queryTransactions, function(error, rowsTransactions) { 
        // Execute the query for Customers
        db.pool.query(queryCustomers, function(error, rowsCustomers) {
            // Execute the query for Cars
            db.pool.query(queryCars, function(error, rowsCars) {
                // Execute the query for Salespeople
                db.pool.query(querySalespeople, function(error, rowsSalespeople) {
                    // Execute the query for Finance Companies
                    db.pool.query(queryFinanceCompanies, function(error, rowsFinanceCompanies) {
                        // Finally, render the transactions view with all the fetched data
                        res.render('transactions', {
                            data: rowsTransactions,
                            customers: rowsCustomers,
                            cars: rowsCars,
                            salespeople: rowsSalespeople,
                            financeCompanies: rowsFinanceCompanies
                        });
                    });
                });
            });
        });
    });
});
 

app.get('/customers', function(req, res) {
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.firstName === undefined && req.query.lastName === undefined) {
        query1 = "SELECT * FROM Customers;";
    }

    // If there are both first name and last name query parameters, assume it's a search
    else if (req.query.firstName && req.query.lastName) {
        query1 = `SELECT * FROM Customers WHERE First_Name LIKE "${req.query.firstName}%" AND Last_Name LIKE "${req.query.lastName}%"`;
    }

    // If there is only first name query parameter, search by first name
    else if (req.query.firstName) {
        query1 = `SELECT * FROM Customers WHERE First_Name LIKE "${req.query.firstName}%"`;
    }

    // If there is only last name query parameter, search by last name
    else if (req.query.lastName) {
        query1 = `SELECT * FROM Customers WHERE Last_Name LIKE "${req.query.lastName}%"`;
    }

    db.pool.query(query1, function(error, rows, fields) {
        // Execute the query

        res.render('customers', { data: rows });
        // Render the customers.hbs file, and also send the renderer an object
        // where 'data' is equal to the 'rows' we fetched from the database
    });
});
 

app.get('/salespeople', function(req, res) {
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.firstName === undefined && req.query.lastName === undefined) {
        query1 = "SELECT * FROM Salespeople;";
    }

    // If there are both first name and last name query parameters, assume it's a search
    else if (req.query.firstName && req.query.lastName) {
        query1 = `SELECT * FROM Salespeople WHERE First_Name LIKE "${req.query.firstName}%" AND Last_Name LIKE "${req.query.lastName}%"`;
    }

    // If there is only first name query parameter, search by first name
    else if (req.query.firstName) {
        query1 = `SELECT * FROM Salespeople WHERE First_Name LIKE "${req.query.firstName}%"`;
    }

    // If there is only last name query parameter, search by last name
    else if (req.query.lastName) {
        query1 = `SELECT * FROM Salespeople WHERE Last_Name LIKE "${req.query.lastName}%"`;
    }

    db.pool.query(query1, function(error, rows, fields) {
        // Execute the query

        res.render('salespeople', { data: rows });
        // Render the salespeople.hbs file, and also send the renderer an object
        // where 'data' is equal to the 'rows' we fetched from the database
    });
});


app.get('/financeCompanies', function(req, res) {
        // Declare Query 1
        let query1 = "SELECT * FROM Finance_Companies;";

        db.pool.query(query1, function(error, rows, fields){             // Execute the query

            res.render('financeCompanies', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                              // an object where 'data' is equal to the 'rows' we
    }); 

app.get('/features', function(req, res) {
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.name === undefined) {
        query1 = "SELECT * FROM Features;";
    }

    // If there is a query string, assume it's a case-insensitive search by feature name
    else {
        const featureName = req.query.name.toLowerCase(); // Convert to lowercase
        query1 = `SELECT * FROM Features WHERE LOWER(Feature_Name) LIKE "%${featureName}%"`;
    }

    db.pool.query(query1, function(error, rows, fields) {
        // Execute the query

        res.render('features', { data: rows });
        // Render the features.hbs file, and also send the renderer an object
        // where 'data' is equal to the 'rows' we fetched from the database
    });
});


app.get('/carFeatures', function(req, res) {
    const queryCarFeatures = "SELECT * FROM Car_Features;";
    const queryCars = "SELECT * FROM Cars;";
    const queryFeatures = "SELECT * FROM Features;";

    db.pool.query(queryCarFeatures, function(error1, rowsCarFeatures){
        db.pool.query(queryCars, function(error2, rowsCars){
            db.pool.query(queryFeatures, function(error3, rowsFeatures){
                res.render('carFeatures', {
                    data: rowsCarFeatures,
                    cars: rowsCars,
                    features: rowsFeatures
                });
            });
        });
    });
});


// Adding a Car
app.post('/createCar', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
        
    let year = parseInt(data['year']);
    let mileage = parseInt(data['mileage']);
    let price = parseFloat(data['price']);
    let forSale = data['forSale'] === '1' ? 1 : 0;
    let customerID = parseInt(data['customerID']);
    
    // Create the query. Include customerID if available
    if (isNaN(customerID))
    {
        query1 = `INSERT INTO Cars (Car_make, Car_model, Car_year, Car_color, Car_mileage, Car_vin, Car_price, Car_forsale) 
    VALUES ('${data['make']}', '${data['model']}', '${year}', '${data['color']}', '${mileage}', '${data['vin']}', '${price}', '${forSale}')`;
    } else {
        query1 = `INSERT INTO Cars (Car_make, Car_model, Car_year, Car_color, Car_mileage, Car_vin, Car_price, Car_forsale, Customer_id) 
    VALUES ('${data['make']}', '${data['model']}', '${year}', '${data['color']}', '${mileage}', '${data['vin']}', '${price}', '${forSale}', '${customerID}')`;
    }
    
    // Run the query on the database
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/cars');
        }
    })
})


// Updating a Car
app.post('/updateCar', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data)

    let year = parseInt(data['year']);
    let mileage = parseInt(data['mileage']);
    let price = parseFloat(data['price']);
    let forSale = data['forSale'] === '1' ? 1 : 0;
    let customerID = parseInt(data['customerID']);
    
    // Create the query
    let query;
    
    if (isNaN(customerID)) {
        query = `UPDATE Cars 
                 SET Car_make = '${data['make']}', Car_model = '${data['model']}', Car_year = '${year}', Car_color = '${data['color']}', Car_mileage = '${mileage}', Car_vin = '${data['vin']}', Car_price = '${price}', Car_forsale = '${forSale}' 
                 WHERE Car_id = ${data['CarID']}`;
    } else {
        query = `UPDATE Cars 
                 SET Car_make = '${data['make']}', Car_model = '${data['model']}', Car_year = '${year}', Car_color = '${data['color']}', Car_mileage = '${mileage}', Car_vin = '${data['vin']}', Car_price = '${price}', Car_forsale = '${forSale}', Customer_id = '${customerID}' 
                 WHERE Car_id = ${data['CarID']}`;
    }

    // Run the query on the database
    db.pool.query(query, function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            res.redirect('/cars');
        }
    })
})


// Deleting a Car
app.post('/deleteCar', function(req, res) {
    let data = req.body;
    
    // First, delete the related records in the Car_Features table
    let query1 = `DELETE FROM Car_Features WHERE Car_id = ${data['carID']};`;
    
    db.pool.query(query1, function(error, rows, fields) {
        if(error) {
            console.log(error)
            return res.status(400).send(error.sqlMessage);
        } else {
            // Second, delete the related records in the Transactions table
            let query2 = `DELETE FROM Transactions WHERE Car_id = ${data['carID']};`;
            
            db.pool.query(query2, function(error, rows, fields) {
                if(error) {
                    console.log(error)
                    return res.status(400).send(error.sqlMessage);
                } else {
                    // Now, delete the record in the Cars table
                    let query3 = `DELETE FROM Cars WHERE Car_id = ${data['carID']};`;
                    
                    db.pool.query(query3, function(error, rows, fields) {
                        if(error) {
                            console.log(error)
                            return res.status(400).send(error.sqlMessage);
                        } else {
                            res.redirect('/cars');
                        }
                    });
                }
            });
        }
    });
});

app.post('/createCustomer', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Extract the relevant data fields
    let firstName = data['firstName'];
    let lastName = data['lastName'];
    let phone = data['phone'];
    let email = data['email'];
    let street = data['street'];
    let street2 = data['street2'];
    let city = data['city'];
    let state = data['state'];
    let zip = data['zip'];

    // Create the SQL query to insert the customer record
    let query;
    if (street2 === '') {
        query = `INSERT INTO Customers (Customer_fname, Customer_lname, Customer_phone, Customer_email, Customer_street, Customer_city, Customer_state, Customer_zip) 
        VALUES ('${firstName}', '${lastName}', '${phone}', '${email}', '${street}', '${city}', '${state}', '${zip}')`;
    } else {
        query = `INSERT INTO Customers (Customer_fname, Customer_lname, Customer_phone, Customer_email, Customer_street, Customer_second_street, Customer_city, Customer_state, Customer_zip) 
        VALUES ('${firstName}', '${lastName}', '${phone}', '${email}', '${street}', '${street2}', '${city}', '${state}', '${zip}')`;
    }

    // Run the query on the database
    db.pool.query(query, function(error, rows, fields) {
        // Check if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // If there was no error, redirect back to the '/customers' route to display the updated customer list.
            res.redirect('/customers');
        }
    });
});

app.post('/updateCustomer', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Extract the relevant data fields
    let customerID = parseInt(data['customerID']);
    let firstName = data['firstName'];
    let lastName = data['lastName'];
    let phone = data['phone'];
    let email = data['email'];
    let street = data['street'];
    let street2 = data['street2'];
    let city = data['city'];
    let state = data['state'];
    let zip = data['zip'];

    // Create the SQL query to update the customer record based on the customerID
    let query;
    if (street2 === '') {
        query = `UPDATE Customers 
                 SET Customer_fname = '${firstName}', Customer_lname = '${lastName}', Customer_phone = '${phone}', Customer_email = '${email}', Customer_street = '${street}', Customer_city = '${city}', Customer_state = '${state}', Customer_zip = '${zip}' 
                 WHERE Customer_id = ${customerID}`;
    } else {
        query = `UPDATE Customers 
                 SET Customer_fname = '${firstName}', Customer_lname = '${lastName}', Customer_phone = '${phone}', Customer_email = '${email}', Customer_street = '${street}', Customer_second_street = '${street2}', Customer_city = '${city}', Customer_state = '${state}', Customer_zip = '${zip}' 
                 WHERE Customer_id = ${customerID}`;
    }

    // Run the query on the database
    db.pool.query(query, function(error, rows, fields) {
        // Check if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // If there was no error, redirect back to the '/customers' route to display the updated customer list.
            res.redirect('/customers');
        }
    });
});




app.post('/deleteCustomer', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Extract the customer ID from the submitted form data
    let customerID = parseInt(data['customerID']);

    // First, remove the association of the customer with any car in the Cars table
    db.pool.query(`UPDATE Cars SET Customer_id = NULL WHERE Customer_id = ${customerID}`, function(error, rows, fields) {
        if (error) {
            // Log the error to the terminal and send an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // Now, delete the customer from the Customers table
            db.pool.query(`DELETE FROM Customers WHERE Customer_id = ${customerID}`, function(error, rows, fields) {
                if (error) {
                    // Log the error to the terminal and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    return res.status(400).send(error.sqlMessage);
                } else {
                    // If there was no error, redirect back to the '/customers' route to display the updated customer list.
                    res.redirect('/customers');
                }
            });
        }
    });
});



app.post('/createTransaction', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Extract the relevant data fields
    let salePrice = parseFloat(data['salePrice']);
    let customerId = parseInt(data['customerId']);
    let carId = parseInt(data['carId']);
    let salespersonId = parseInt(data['salespersonId']);
    let saleDate = data['saleDate'];
    let financeCompany = data['financeCompany'];
    let loanAmount = parseFloat(data['loanAmount']);
    let loanDuration = parseInt(data['loanDuration']);
    let interestRate = parseFloat(data['interestRate']);
    let saleStatus = data['saleStatus'];
    
    // Check for NaN values and set them to NULL
    financeCompany = (isNaN(financeCompany) || financeCompany === '') ? `NULL` : financeCompany;
    loanAmount = isNaN(loanAmount) ? `NULL` : loanAmount;
    loanDuration = isNaN(loanDuration) ? `NULL` : loanDuration;
    interestRate = isNaN(interestRate) ? `NULL` : interestRate;

    // Create the SQL query to insert the transaction record
    let query = `INSERT INTO Transactions (Sale_price, Customer_id, Car_id, Salesperson_id, Sale_date, Finance_company_id, Loan_amount, Loan_duration, Interest_rate, Sale_status) 
                VALUES (${salePrice}, ${customerId}, ${carId}, ${salespersonId}, '${saleDate}', ${financeCompany === 'NULL' ? financeCompany : `'${financeCompany}'`}, ${loanAmount}, ${loanDuration}, ${interestRate}, '${saleStatus}')`;


    // Run the query on the database
    db.pool.query(query, function(error, rows, fields) {
        // Check if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // If there was no error, redirect back to the '/transactions' route to display the updated transaction list.
            res.redirect('/transactions');
        }
    });
});

app.post('/updateTransaction', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Extract the relevant data fields
    let transactionID = parseInt(data['transactionID']);
    let salePrice = parseFloat(data['salePrice']);
    let customerId = parseInt(data['customerId']);
    let carId = parseInt(data['carId']);
    let salespersonId = parseInt(data['salespersonId']);
    let saleDate = data['saleDate'];
    let financeCompany = data['financeCompany'];
    let loanAmount = parseFloat(data['loanAmount']);
    let loanDuration = parseInt(data['loanDuration']);
    let interestRate = parseFloat(data['interestRate']);
    let saleStatus = data['saleStatus'];
    
    // Check for NaN values and set them to NULL
    financeCompany = (isNaN(financeCompany) || financeCompany === '') ? `NULL` : financeCompany;
    loanAmount = isNaN(loanAmount) ? `NULL` : loanAmount;
    loanDuration = isNaN(loanDuration) ? `NULL` : loanDuration;
    interestRate = isNaN(interestRate) ? `NULL` : interestRate;

    // Create the SQL query to update the transaction record
    let query = `UPDATE Transactions 
                 SET Sale_price = ${salePrice}, Customer_id = ${customerId}, Car_id = ${carId}, Salesperson_id = ${salespersonId}, Sale_date = '${saleDate}', Finance_company_id = ${financeCompany === 'NULL' ? financeCompany : `'${financeCompany}'`}, Loan_amount = ${loanAmount}, Loan_duration = ${loanDuration}, Interest_rate = ${interestRate}, Sale_status = '${saleStatus}'
                 WHERE Sale_id = ${transactionID}`;

    // Run the query on the database
    db.pool.query(query, function(error, rows, fields) {
        // Check if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // If there was no error, redirect back to the '/transactions' route to display the updated transaction list.
            res.redirect('/transactions');
        }
    });
});

app.post('/deleteTransaction', function(req, res) {
    let data = req.body;
    let transactionID = parseInt(data['transactionID']);

    // Create the SQL query to delete the transaction record
    let query = `DELETE FROM Transactions WHERE Sale_id = ${transactionID}`;

    // Run the query on the database
    db.pool.query(query, function(error, rows, fields) {
        // Check if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // If there was no error, redirect back to the '/transactions' route to display the updated transaction list.
            res.redirect('/transactions');
        }
    });
});

app.post('/createSalesperson', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Extract the relevant data fields
    let firstName = data['firstName'];
    let lastName = data['lastName'];
    let phone = data['phone'];
    let email = data['email'];

    // Create the SQL query to insert the salesperson record
    let query = `INSERT INTO Salespeople (Salesperson_fname, Salesperson_lname, Salesperson_phone, Salesperson_email) 
                 VALUES ('${firstName}', '${lastName}', '${phone}', '${email}')`;

    // Run the query on the database
    db.pool.query(query, function(error, rows, fields) {
        // Check if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // If there was no error, redirect back to the '/salespeople' route to display the updated salesperson list.
            res.redirect('/salespeople');
        }
    });
});

app.post('/updateSalesperson', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data)


    // Extract the salesperson ID and other fields from the form data
    let salespersonID = parseInt(data['salespersonID']);
    let firstName = data['firstName'];
    let lastName = data['lastName'];
    let phone = data['phone'];
    let email = data['email'];

    // Create the SQL query to update the salesperson record
    let query = `UPDATE Salespeople 
                 SET Salesperson_fname = '${firstName}', Salesperson_lname = '${lastName}', Salesperson_phone = '${phone}', Salesperson_email = '${email}' 
                 WHERE Salesperson_id = ${salespersonID}`;

    // Run the query on the database
    db.pool.query(query, function(error, rows, fields) {
        // Check if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // If there was no error, redirect back to the '/salespeople' route to display the updated salesperson list.
            res.redirect('/salespeople');
        }
    });
});

app.post('/deleteSalesperson', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Extract the salesperson ID from the form data
    let salespersonID = parseInt(data['salespersonID']);

    // First, remove the association of the salesperson with any transaction in the Transactions table
    db.pool.query(`UPDATE Transactions SET Salesperson_id = NULL WHERE Salesperson_id = ${salespersonID}`, function(error, rows, fields) {
        if (error) {
            // Log the error to the terminal and send an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // Now, delete the salesperson from the Salespeople table
            db.pool.query(`DELETE FROM Salespeople WHERE Salesperson_id = ${salespersonID}`, function(error, rows, fields) {
                if (error) {
                    // Log the error to the terminal and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    return res.status(400).send(error.sqlMessage);
                } else {
                    // If there was no error, redirect back to the '/salespeople' route to display the updated salesperson list.
                    res.redirect('/salespeople');
                }
            });
        }
    });
});


// Backend code to handle creating a new Finance Company
app.post('/createFinanceCompany', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Extract the relevant data fields
    let name = data['name'];
    let email = data['email'];
    let street = data['street'];
    let secondStreet = data['secondStreet'];
    let city = data['city'];
    let state = data['state'];
    let zip = data['zip'];

    // Create the SQL query to insert the Finance Company record
    let query;
    if (secondStreet === '') {
        query = `INSERT INTO Finance_Companies (Finance_company_name, Finance_company_email, Finance_company_street, Finance_company_city, Finance_company_state, Finance_company_zip) 
        VALUES ('${name}', '${email}', '${street}', '${city}', '${state}', '${zip}')`;
    } else {
        query = `INSERT INTO Finance_Companies (Finance_company_name, Finance_company_email, Finance_company_street, Finance_company_second_street, Finance_company_city, Finance_company_state, Finance_company_zip) 
        VALUES ('${name}', '${email}', '${street}', '${secondStreet}', '${city}', '${state}', '${zip}')`;
    }

    // Run the query on the database
    db.pool.query(query, function(error, rows, fields) {
        // Check if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // If there was no error, redirect back to the '/financecompanies' route to display the updated Finance Companies list.
            res.redirect('/financeCompanies');
        }
    });
});

// Backend code to handle updating a Finance Company
app.post('/updateFinanceCompany', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Extract the relevant data fields
    let financeCompanyID = data['financeCompanyID'];
    let name = data['updateName'];
    let email = data['updateEmail'];
    let street = data['updateStreet'];
    let secondStreet = data['updateSecondStreet'];
    let city = data['updateCity'];
    let state = data['updateState'];
    let zip = data['updateZip'];

    // Create the SQL query to update the Finance Company record
    let query;
    if (secondStreet === '') {
        query = `UPDATE Finance_Companies 
                 SET Finance_company_name = '${name}', Finance_company_email = '${email}', Finance_company_street = '${street}', Finance_company_city = '${city}', Finance_company_state = '${state}', Finance_company_zip = '${zip}' 
                 WHERE Finance_company_id = ${financeCompanyID}`;
    } else {
        query = `UPDATE Finance_Companies 
                 SET Finance_company_name = '${name}', Finance_company_email = '${email}', Finance_company_street = '${street}', Finance_company_second_street = '${secondStreet}', Finance_company_city = '${city}', Finance_company_state = '${state}', Finance_company_zip = '${zip}' 
                 WHERE Finance_company_id = ${financeCompanyID}`;
    }

    // Run the query on the database
    db.pool.query(query, function(error, rows, fields) {
        // Check if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // If there was no error, redirect back to the '/financecompanies' route to display the updated Finance Companies list.
            res.redirect('/financecompanies');
        }
    });
});

// Backend code to handle deleting a Finance Company
app.post('/deleteFinanceCompany', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Extract the selected Finance Company ID
    let financeCompanyID = data['deleteFinanceCompanyID'];

    // First, remove the association of the finance company with any transaction in the Transactions table
    db.pool.query(`UPDATE Transactions SET Finance_company_id = NULL WHERE Finance_company_id = ${financeCompanyID}`, function(error, rows, fields) {
        if (error) {
            // Log the error to the terminal and send an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // Now, delete the finance company from the Finance_Companies table
            db.pool.query(`DELETE FROM Finance_Companies WHERE Finance_company_id = ${financeCompanyID}`, function(error, rows, fields) {
                if (error) {
                    // Log the error to the terminal and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    return res.status(400).send(error.sqlMessage);
                } else {
                    // If there was no error, redirect back to the '/financecompanies' route to display the updated Finance Companies list.
                    res.redirect('/financecompanies');
                }
            });
        }
    });
});


// Backend code to handle creating a new Feature
app.post('/createFeature', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Extract the feature name
    let featureName = data['featureCreate'];

    // Create the SQL query to insert the new Feature record
    let query = `INSERT INTO Features (Feature_name) VALUES ('${featureName}')`;

    // Run the query on the database
    db.pool.query(query, function(error, rows, fields) {
        // Check if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // If there was no error, redirect back to the '/features' route to display the updated Features list.
            res.redirect('/features');
        }
    });
});

// Backend code to handle updating a Feature
app.post('/updateFeature', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Extract the feature ID and updated feature name
    let featureID = parseInt(data['featureID']);
    let updatedFeatureName = data['featureName'];

    // Create the SQL query to update the Feature record
    let query = `UPDATE Features SET Feature_name = '${updatedFeatureName}' WHERE Feature_id = ${featureID}`;

    // Run the query on the database
    db.pool.query(query, function(error, rows, fields) {
        // Check if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // If there was no error, redirect back to the '/features' route to display the updated Features list.
            res.redirect('/features');
        }
    });
});

// Backend code to handle deleting a Feature
app.post('/deleteFeature', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Extract the feature ID to be deleted
    let featureID = parseInt(data['featureID']);

    // Create the SQL query to delete the Feature record
    let query = `DELETE FROM Features WHERE Feature_id = ${featureID}`;

    // Run the query on the database
    db.pool.query(query, function(error, rows, fields) {
        // Check if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // If there was no error, redirect back to the '/features' route to display the updated Features list.
            res.redirect('/features');
        }
    });
});

// Backend code to handle creating a new Car_feature
app.post('/createCarFeature', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Extract the relevant data fields
    let carFK = parseInt(data['carFK']);
    let featureFK = parseInt(data['featureFK']);

    // Create the SQL query to insert the Car_feature record
    let query = `INSERT INTO Car_Features (Car_id, Feature_id) 
                 VALUES ('${carFK}', '${featureFK}')`;

    // Run the query on the database
    db.pool.query(query, function(error, rows, fields) {
        // Check if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // If there was no error, redirect back to the '/car_features' route to display the updated Car_features list.
            res.redirect('/carFeatures');
        }
    });
});


// Backend code to handle updating new Car_feature
app.post('/updateCarFeature', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Handle the hypen splitting both FKs. Split the string into an array e.g. ["1", "5"]
    let ids = data.carFeatureID.split("-"); 
    let carID = parseInt(ids[0]);
    let featureID = parseInt(ids[1]);
    let newFeatureID = parseInt(data["newFeatureID"]);

    // Create the SQL query to update the salesperson record
    let query = `UPDATE Car_Features 
                SET Feature_id = '${newFeatureID}' 
                WHERE Car_id = '${carID}' AND Feature_id = '${featureID}'`;


    // Run the query on the database
    db.pool.query(query, function(error, rows, fields) {
        // Check if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // If there was no error, redirect back to the '/carFeatures' route to display the updated salesperson list.
            res.redirect('/carFeatures');
        }
    });
});


// Backend code to handle deleting a Car_feature
app.post('/deleteCarFeature', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body.carFeatureID;

    // Handle the hypen splitting both FKs. Split the string into an array e.g. ["1", "5"]
    let ids = data.split("-"); 
    let carID = parseInt(ids[0]);
    let featureID = parseInt(ids[1]);
    // Extract the carFeatureID value from the request body

    // Create the SQL query to delete the Car_feature record
    let query = `DELETE FROM Car_Features WHERE Car_id = ${carID} AND Feature_id = ${featureID};`;

    // Run the query on the database
    db.pool.query(query, function(error, rows, fields) {
        // Check if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            return res.status(400).send(error.sqlMessage);
        } else {
            // If there was no error, redirect back to the '/car_features' route to display the updated Car_features list.
            res.redirect('/carFeatures');
        }
    });
});

app.get("/getCustomerDetails", async (req, res) => {
    try {
      const customerID = req.query.id;
  
      // Query the database to retrieve customer details
      const query = "SELECT * FROM Customers WHERE Customer_id = ?";
      db.pool.query(query, [customerID], function (error, rows, fields) {
        if (error) {
          // Log the error for debugging
          console.error("Error fetching customer details:", error);
  
          // Send an error response
          res.status(500).json({ error: "Error fetching customer details" });
        } else {
          if (rows.length === 0) {
            res.status(404).json({ error: "Customer not found" });
          } else {
            res.json(rows[0]);
          }
        }
      });
    } catch (err) {
      // Log the detailed error for debugging
      console.error("Error fetching customer details:", err);
  
      // Send an error response
      res.status(500).json({ error: "Error fetching customer details" });
    }
  });
  
  app.get("/getCarDetails", async (req, res) => {
    try {
        const carID = req.query.id;
      
        // Query the database to retrieve car details
        const query = "SELECT * FROM Cars WHERE Car_id = ?";
        db.pool.query(query, [carID], function (error, rows, fields) {
            if (error) {
                // Log the error for debugging
                console.error("Error fetching car details:", error);
        
                // Send an error response
                res.status(500).json({ error: "Error fetching car details" });
            } else {
                if (rows.length === 0) {
                    res.status(404).json({ error: "Car not found" });
                } else {
                    // Assume the car data retrieved from the database has the following structure
                    const carData = {
                        Car_make: rows[0].Car_make,
                        Car_model: rows[0].Car_model,
                        Car_year: rows[0].Car_year,
                        Car_color: rows[0].Car_color,
                        Car_mileage: rows[0].Car_mileage,
                        Car_vin: rows[0].Car_vin,
                        Car_price: rows[0].Car_price,
                        Car_for_sale: rows[0].Car_for_sale,
                        Customer_id: rows[0].Customer_id
                    };
                    res.json(carData);
                }
            }
        });
    } catch (err) {
        // Log the detailed error for debugging
        console.error("Error fetching car details:", err);
      
        // Send an error response
        res.status(500).json({ error: "Error fetching car details" });
    }
});

app.get("/getTransactionDetails", async (req, res) => {
    try {
        const transactionID = req.query.id;

        // Query the database to retrieve transaction details
        const query = "SELECT * FROM Transactions WHERE Sale_id = ?";
        db.pool.query(query, [transactionID], function (error, rows, fields) {
            if (error) {
                // Log the error for debugging
                console.error("Error fetching transaction details:", error);

                // Send an error response
                res.status(500).json({ error: "Error fetching transaction details" });
            } else {
                if (rows.length === 0) {
                    res.status(404).json({ error: "Transaction not found" });
                } else {
                    res.json(rows[0]);
                }
            }
        });
    } catch (err) {
        // Log the detailed error for debugging
        console.error("Error fetching transaction details:", err);

        // Send an error response
        res.status(500).json({ error: "Error fetching transaction details" });
    }
});

app.get("/getSalespersonDetails", async (req, res) => {
    try {
        const salespersonID = req.query.id;

        // Query the database to retrieve salesperson details
        const query = "SELECT * FROM Salespeople WHERE Salesperson_id = ?";
        db.pool.query(query, [salespersonID], function (error, rows, fields) {
            if (error) {
                // Log the error for debugging
                console.error("Error fetching salesperson details:", error);

                // Send an error response
                res.status(500).json({ error: "Error fetching salesperson details" });
            } else {
                if (rows.length === 0) {
                    res.status(404).json({ error: "Salesperson not found" });
                } else {
                    res.json(rows[0]);
                }
            }
        });
    } catch (err) {
        // Log the detailed error for debugging
        console.error("Error fetching salesperson details:", err);

        // Send an error response
        res.status(500).json({ error: "Error fetching salesperson details" });
    }
});

app.get("/getFinanceCompanyDetails", (req, res) => {
    try {
      const financeCompanyID = req.query.id;
  
      // Query the database to retrieve finance company details
      const query = "SELECT * FROM Finance_Companies WHERE Finance_company_id = ?";
      db.pool.query(query, [financeCompanyID], (error, rows, fields) => {
        if (error) {
          // Log the error for debugging
          console.error("Error fetching finance company details:", error);
  
          // Send an error response
          res.status(500).json({ error: "Error fetching finance company details" });
        } else {
          if (rows.length === 0) {
            res.status(404).json({ error: "Finance company not found" });
          } else {
            res.json(rows[0]);
          }
        }
      });
    } catch (err) {
      // Log the detailed error for debugging
      console.error("Error fetching finance company details:", err);
  
      // Send an error response
      res.status(500).json({ error: "Error fetching finance company details" });
    }
  });

  app.get('/getFeatureDetails', (req, res) => {
    const featureID = req.query.id;


    const query = "SELECT * FROM Features WHERE Feature_id = ?";
    db.pool.query(query, [featureID], (error, results) => {
        if (error) {
            console.error("Error fetching feature details:", error);
            res.status(500).json({ error: "Error fetching feature details" });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: "Feature not found" });
            } else {
                const feature = results[0];
                res.json(feature);
            }
        }
    });
});


// LISTENER
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

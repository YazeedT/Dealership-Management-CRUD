# Digital Dashboard for Automotive Transactions & Management

This is a comprehensive web portal designed for the management of cars and transactions, providing robust CRUD features for efficient data handling.

## Features
- **Comprehensive Dashboard**: Visually appealing interfaces to manage cars, transactions, and related entities.
- **Dynamic Data Management**: Efficient CRUD operations for cars, customers, salespeople, finance companies, features and transactions.
- **Responsive Design**: Ensures optimal user experience across different device sizes.
- **Modular Code Structure**: Separation of routes, database connectors, and views for easier maintenance.

## Technologies Used
- **Back-end**: Node.js with Express.js framework
- **Front-end**: Handlebars templating engine
- **Database**: MySQL
- **Styling**: Custom CSS (see the project's UI in the included PDF)

## Database Configuration
Before running the project, ensure you:

1\. Update the value of the variable 'PORT' in app.js
   
2\. Set up the MySQL credentials:

Update the `db-connector.js` file located in the `database` folder with your MySQL details:

```javascript
var mysql = require('mysql')

var pool = mysql.createPool({
 connectionLimit : 10,
 host            : 'YOUR_MYSQL_HOST',
 user            : 'YOUR_MYSQL_USER',
 password        : 'YOUR_MYSQL_PASSWORD',
 database        : 'YOUR_MYSQL_DATABASE'
})

module.exports.pool = pool;
```

---

**For a detailed overview of the schema and UI design, refer to the included PDF: Schema_and_UI_Design.pdf**

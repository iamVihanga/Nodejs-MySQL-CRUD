const mysql = require('mysql')

const dbConnector = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeedb'
})

module.exports = dbConnector
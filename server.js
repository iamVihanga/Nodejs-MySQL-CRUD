if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const database = require('./dbConnector')
const employeeRoutes = require('./routes/employees')

app.use(bodyparser.json())

// Server endpoints
app.get('/', (req, res) => {
    res.send('mysql CRUD')
})

app.use('/employees', employeeRoutes)



// connect DB & listen to server
const PORT = process.env.PORT || 3000
database.connect(err => {
    if (!err) {
        console.log('MySQL DB Connected..!')
        app.listen(PORT, () => console.log(`Server started on > PORT:${PORT}`))
    } else {
        console.error('DB Connection failure..!' + JSON.stringify(err, undefined, 2))
    }
})
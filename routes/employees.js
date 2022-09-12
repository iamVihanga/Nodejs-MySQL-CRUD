const router = require('express').Router()
const database = require('../dbConnector')

// Get all employees
router.get('/', (req, res) => {
    database.query('SELECT * FROM employee', (err, rows) => {
        if (!err) {
            res.status(200).json(rows)
        } else {
            res.status(500).json(err)
        }
    })
})

// Get single employee
router.get('/:id', (req, res) => {
    database.query(`SELECT * FROM employee WHERE EmpID = ${req.params.id}`, (err, row) => {
        if (!err) {
            res.status(200).json(row)
        } else {
            res.status(500).json(err)
        }
    })
})

// Create new employer
router.post('/create', (req, res) => {
    const sql = `INSERT INTO employee (Name, EmpCode, Salary) VALUES ('${req.body.name}', '${req.body.empCode}', '${req.body.salary}')`

    database.query(sql, (err, row) => {
        if (!err) {
            res.status(200).json(row)
        } else {
            res.status(500).json(err)
        }
    }
    )
})

// Update employer record
router.put('/update/:id', (req, res) => {
    // Check user exsits
    database.query(`SELECT * FROM employee WHERE EmpID = ${req.params.id}`, (err, row) => {
        if (!err) {
            // Update user
            const updateSql = `UPDATE employee SET Name = '${req.body.Name || row[0].Name}', EmpCode = '${req.body.EmpCode || row[0].EmpCode}', Salary = '${req.body.Salary || row[0].Salary}' WHERE EmpID = ${req.params.id}`

            database.query(updateSql, (err, row) => {
                if (!err) {
                    res.status(200).json(row)
                } else {
                    res.status(500).json(err)
                }
            })
        } else {
            res.status(500).json(err)
        }
    })
})


// Delete employer record
router.delete('/delete/:id', (req, res) => {
    const deleteSql = `DELETE FROM employee WHERE employee.EmpID = ${req.params.id}`

    database.query(deleteSql, (err, row) => {
        if (!err) {
            res.status(200).json(row)
        } else {
            res.status(500).json(err)
        }
    })
})


module.exports = router

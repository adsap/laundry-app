const { Employee } = require('../models')

class EmployeesController {
  static list(req, res) {
    Employee.findAll()
    .then(employees => {
      res.render('employees', { employees })
    })
    .catch(err => {
      res.send(err)
    })
  }

  static addForm(req, res) {
    res.render('employeeAddForm')
  }

  static add(req, res) {
    const { name, phone, email, address } = req.body

    Employee.create({ name, phone, email, address })
    .then(employee => {
      res.redirect('/employee')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static editForm(req, res) {
    const { id } = req.params

    Employee.findByPk(+id)
    .then(employee => {
      res.render('employeeEditForm', { employee })
    })
    .catch(err => {
      res.send(err)
    })
  }

  static edit(req, res) {
    const { id } = req.params
    const { name, phone, email, address } = req.body

    Employee.findByPk(+id)
    .then(employee => {
      if(employee) {
        employee.name = name
        employee.phone = phone
        employee.email = email
        employee.address = address

        return employee.save()
      }
      else throw 'employee tidak ditemukan'
    })
    .then(employee => {
      res.redirect('/employee')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static delete(req, res) {
    const { id } = req.params

    Employee.findByPk(+id)
    .then(employee => {
      if(employee) return employee.destroy()
      else throw 'employee tidak ditemukan'
    })
    .then(() => {
      res.redirect('/employee')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static detail(req, res) {
    const { id } = req.params

    Employee.findByPk(+id)
      .then(employee => {
        res.render('employeeDetail', { employee })
      })
      .catch(err => {
        res.send(err)
      })
  }

}

module.exports = EmployeesController
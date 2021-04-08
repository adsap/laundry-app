const { Employee } = require('../models')
const bcrypt = require('bcryptjs')

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

  static registerForm(req, res) {
    res.render('employeeRegisterForm')
  }

  static register(req, res) {
    const { name, phone, email, address, password, role } = req.body

    Employee.create({ name, phone, email, address, password, role })
    .then(employee => {
      res.redirect('/')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static loginForm(req, res) {
    const { error } = req.query

    res.render('loginForm', { error })
  }

  static login(req, res) {
    const { email, password } = req.body
    console.log(req.body);
    Employee.findOne({ where: {email} })
    .then(employee => {
      if(employee) {
        const isValidPassword = bcrypt.compareSync(password, employee.password)

        if(isValidPassword) {
          req.session.employeeId = employee.id
          req.session.employeeRole = employee.role
          return res.redirect('/employee')
        }
        else {
          const error = 'invalid email/password'
          return res.redirect(`/employee/login?error=${error}`)
        }
      }
      else {
        const error = 'invalid email/password'
        return res.redirect(`/employee/login?error=${error}`)
      }
    })
    .catch(err => {
      res.send(err)
    })
  }

  static logout(req, res) {
    req.session.destroy(() => {
      const error = 'Sukses logout'
      res.redirect(`/employee/login?error=${error}`)
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
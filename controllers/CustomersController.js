const { Customer } = require('../models')

class CustomersController {
  static list(req, res) {
    Customer.findAll()
    .then(customers => {
      res.render('customers', { customers })
    })
    .catch(err => {
      res.send(err)
    })
  }

  static addForm(req, res) {
    res.render('customerAddForm')
  }

  static add(req, res) {
    const { name, phone, email, address } = req.body

    Customer.create({ name, phone, email, address })
    .then(customer => {
      res.redirect('/customer')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static editForm(req, res) {
    const { id } = req.params

    Customer.findByPk(+id)
    .then(customer => {
      res.render('customerEditForm', { customer })
    })
    .catch(err => {
      res.send(err)
    })
  }

  static edit(req, res) {
    const { id } = req.params
    const { name, phone, email, address } = req.body

    Customer.findByPk(+id)
    .then(customer => {
      if(customer) {
        customer.name = name
        customer.phone = phone
        customer.email = email
        customer.address = address

        return customer.save()
      }
      else throw 'customer tidak ditemukan'
    })
    .then(customer => {
      res.redirect('/customer')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static delete(req, res) {
    const { id } = req.params

    Customer.findByPk(+id)
    .then(customer => {
      if(customer) return customer.destroy()
      else throw 'customer tidak ditemukan'
    })
    .then(() => {
      res.redirect('/customer')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static detail(req, res) {
    const { id } = req.params

    Customer.findByPk(+id)
      .then(costumer => {
        res.render('customerDetail')
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = CustomersController
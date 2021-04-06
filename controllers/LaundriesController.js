const { Laundry, Customer, Employee } = require('../models')

class LaundriesController {
  static list(req, res) {
    Laundry.findAll({ 
      order: [['entry_date', 'DESC']],
      include: [Customer, Employee]
      })
    .then(laundries => {
      res.render('laundries', { laundries })
    })
    .catch(err => {
      res.send(err)
    })
  }

  static addForm(req, res) {
    let customers
    Customer.findAll()
    .then((customerData) => {
      customers = customerData;
      return Employee.findAll()
    })
    .then((employees) => {
      if (employees && customers) res.render('laundryAddForm', { customers, employees });
      else throw 'data employee dan customer tidak ditemukan';
    })
    .catch((err) => {
      res.send(err)
    });
  }

  static add(req, res) {
    const { CustomerId, EmployeeId, laundry_type, weight, entry_date } = req.body
    let total_cost
    if (laundry_type === "dry cleaning") {
      total_cost = weight * 5000
    } else {
      total_cost = weight * 7000
    }

    Laundry.create({ CustomerId, EmployeeId, laundry_type, weight, entry_date, total_cost })
    .then(laundry => {
      res.redirect('/laundry')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static editForm(req, res) {
    const { id } = req.params
    let customers, employees
    Customer.findAll()
    .then((customerData) => {
      customers = customerData;
      return Employee.findAll()
    })
    .then((employeeData) => {
      employees = employeeData;
      return Laundry.findByPk(+id, { 
        order: [['entry_date', 'DESC']],
        include: [Customer, Employee]
        })
    })
    .then(laundry => {
      res.render('laundryEditForm', { customers, employees, laundry })
    })
    .catch(err => {
      res.send(err)
    })
  }

  static edit(req, res) {
    const { id } = req.params
    const { CustomerId, EmployeeId, laundry_type, weight, entry_date, finish_date } = req.body
    let total_cost
    if (laundry_type === "dry cleaning") {
      total_cost = weight * 5000
    } else {
      total_cost = weight * 7000
    }

    Laundry.findByPk(+id)
    .then(laundry => {
      if(laundry) {
        laundry.CustomerId = CustomerId
        laundry.EmployeeId = EmployeeId
        laundry.laundry_type = laundry_type
        laundry.weight = weight
        laundry.entry_date = entry_date
        if (finish_date) laundry.finish_date = finish_date
        else laundry.finish_date = null
        laundry.total_cost = total_cost

        return laundry.save()
      }
      else throw 'laundry tidak ditemukan'
    })
    .then(laundry => {
      res.redirect('/laundry')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static delete(req, res) {
    const { id } = req.params

    Laundry.findByPk(+id)
    .then(laundry => {
      if(laundry) return laundry.destroy()
      else throw 'laundry tidak ditemukan'
    })
    .then(() => {
      res.redirect('/laundry')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static detail(req, res) {
    const { id } = req.params

    Laundry.findByPk(+id, {
      include: [Customer, Employee]
      })
      .then(laundry => {
        res.render('laundryDetail', { laundry })
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = LaundriesController
const { Laundry, Customer, Employee, sequelize } = require('../models')
const moment = require('moment');
const costFormat = require('../helpers/costFormat')
const priceCalculate = require('../helpers/priceCalculate');
const { createInvoice } = require("../helpers/createInvoice.js");
const Op = require('sequelize').Op;
const nodemailer = require('nodemailer');

class LaundriesController {
  static list(req, res) {
    let laundries
    Laundry.findAll({
      where: {
        finish_date: null
      },
      order: [['entry_date', 'DESC']],
      include: [Customer, Employee]
      })
    .then((laundriesData) => {
      laundries = laundriesData
      return Laundry.findAll({
        where: {
          finish_date: {[Op.not]: null}
        },
        include: [Customer, Employee]
      })
    })
    .then(laundriesFinished => {
      res.render('laundries', { laundries, laundriesFinished, costFormat, moment })
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
    let { CustomerId, EmployeeId, laundry_type, weight, entry_date } = req.body
    let total_cost = priceCalculate(laundry_type, weight);
  
    if (!laundry_type) {
      laundry_type = Laundry.getNoType()
    }

    Laundry.create({ CustomerId, EmployeeId, laundry_type, weight, entry_date, total_cost })
    .then(() => {
      return Laundry.findAll({
        limit: 1,
        order: [[ 'createdAt', 'DESC' ]],
        include: [Customer, Employee]
      })
    })
    .then((laundry) => {
      const invoice = {
        shipping: {
          name: laundry[0].Customer.name,
          address: laundry[0].Customer.address,
          email: laundry[0].Customer.email,
          phone: laundry[0].Customer.phone
        },
        items: [
          {
            entry_date: moment(laundry[0].entry_date).format('DD-MM-YYYY'),
            laundry_type: laundry[0].laundry_type,
            weight: laundry[0].weight,
            costkg: laundry[0].total_cost / laundry[0].weight,
            total: laundry[0].total_cost
          }
        ],
        subtotal: laundry[0].total_cost,
        invoice_nr: laundry[0].id
      }
      createInvoice(invoice, `./invoices/invoice-${laundry[0].id}.pdf`);
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
        include: [Customer, Employee],
        attributes: [
          'id',
          'CustomerId',
          'EmployeeId',
          'laundry_type',
          'weight',
          [sequelize.fn('to_char', sequelize.col('entry_date'), 'YYYY-MM-DD'), 'entry_date'],
          [sequelize.fn('to_char', sequelize.col('finish_date'), 'YYYY-MM-DD'), 'finish_date']
        ]
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
    let total_cost = priceCalculate(laundry_type, weight);

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
        res.render('laundryDetail', { laundry, moment })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static finished(req, res) {
    const { id } = req.params

    Laundry.findByPk(+id)
    .then(laundry => {
      if(laundry) {
        laundry.finish_date = new Date();
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

  static sendEmail(req, res) {
    console.log(process.env.NODEMAILER_SERVICE)
    const {id} = req.params

    Laundry.findByPk(id, {include: [Customer]})
    .then((data) => {
        let mailTransporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: `####`,
                pass: `####`
            }
        });
        
        let mailDetails = {
            from: '####',
            to: `${data.Customer.email}`,
            subject: 'Pemberitahuan Laundry Selesai',
            text: `
              Halo ${data.Customer.name},
              laundry dengan nomor : ${data.id} 
              telah selesai dan bisa diambil.
              Terima Kasih`
        };
        
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log(err)
            } else {
                res.redirect(`/laundry`);
            }
        });
    })
    .catch((err) => {
        res.send(err)    
    });
  }
}

module.exports = LaundriesController
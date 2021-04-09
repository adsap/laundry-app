const router = require('express').Router()
const employeeRouter = require('./employee')
const customerRouter = require('./customer')
const laundryRouter = require('./laundry')

router.get('/', (req, res) => {
  const { notif } = req.query
  res.render('home', { notif })
})
router.use('/employee', employeeRouter)
router.use('/customer', customerRouter)
router.use('/laundry', laundryRouter)

module.exports = router
const router = require('express').Router()
const EmployeesController = require('../controllers/EmployeesController')
const isAdmin = require('../helpers/isAdmin')

router.get('/login', EmployeesController.loginForm)
router.post('/login', EmployeesController.login)
router.get('/register', EmployeesController.registerForm)
router.post('/register', EmployeesController.register)

router.use(function (req, res, next) {
  if(!req.session.employeeId) {
    const error = 'Please login first!'
    res.redirect(`/employee/login?error=${error}`)
  }
  else {
    next()
  }
})

router.get('/', EmployeesController.list)
router.get('/edit/:id', EmployeesController.editForm)
router.post('/edit/:id', EmployeesController.edit)
router.get('/delete/:id', isAdmin, EmployeesController.delete)
router.get('/logout', EmployeesController.logout)
router.get('/:id', EmployeesController.detail)

module.exports = router
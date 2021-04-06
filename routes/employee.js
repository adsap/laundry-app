const router = require('express').Router()
const EmployeesController = require('../controllers/EmployeesController')

router.get('/', EmployeesController.list)
router.get('/add', EmployeesController.addForm)
router.post('/add', EmployeesController.add)
router.get('/edit/:id', EmployeesController.editForm)
router.post('/edit/:id', EmployeesController.edit)
router.get('/delete/:id', EmployeesController.delete)
router.get('/:id', EmployeesController.detail)

module.exports = router
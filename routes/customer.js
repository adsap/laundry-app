const router = require('express').Router()
const CustomersController = require('../controllers/CustomersController')

router.get('/', CustomersController.list)
router.get('/add', CustomersController.addForm)
router.post('/add', CustomersController.add)
router.get('/edit/:id', CustomersController.editForm)
router.post('/edit/:id', CustomersController.edit)
router.get('/delete/:id', CustomersController.delete)
router.get('/:id', CustomersController.detail)

module.exports = router
const router = require('express').Router()

router.get('/', CustomerController.list)
router.get('/add', CustomerController.addFprm)
router.post('/add', CustomerController.add)
router.get('/edit/:id', CustomerController.editForm)
router.post('/edit/:id', CustomerController.edit)
router.get('/delete/:id', CustomerController.delete)
router.get('/:id', CustomerController.detail)

module.exports = router
const router = require('express').Router()

const LaundriesController = require('../controllers/LaundriesController')

router.get('/', LaundriesController.list)
router.get('/add', LaundriesController.addForm)
router.post('/add', LaundriesController.add)
router.get('/edit/:id', LaundriesController.editForm)
router.post('/edit/:id', LaundriesController.edit)
router.get('/delete/:id', LaundriesController.delete)
router.get('/:id', LaundriesController.detail)
router.get('/:id/finished', LaundriesController.finished)

module.exports = router
const Router = require('express')
const router = Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), typeController.create)
router.post('/edit', checkRole('ADMIN'), typeController.edit)
router.get('/', typeController.getAll)
router.get('/:id', typeController.getOne)

module.exports = router
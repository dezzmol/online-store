const Router = require('express')
const router = Router()
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), brandController.create)
router.post('/edit', checkRole('ADMIN'), brandController.edit)
router.get('/', brandController.getAll)
router.get('/:id', brandController.getOne)

module.exports = router
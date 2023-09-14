const Router = require('express')
const router = Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), deviceController.create)
router.post('/edit', checkRole('ADMIN'), deviceController.editDevice)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

module.exports = router
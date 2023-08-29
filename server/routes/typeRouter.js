const Router = require('express')
const router = Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), typeController.create)
router.get('/all', typeController.getAll)
router.get('/one', typeController.getOne)

module.exports = router
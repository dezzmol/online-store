const Router = require('express')
const router = Router()
const cartController = require('../controllers/cartController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/myCart', authMiddleware, cartController.getCart)
router.post('/addToCart', authMiddleware, cartController.addToCart)
router.post('/removeFromCart', authMiddleware, cartController.removeFromCart)
router.post('/changeCount', authMiddleware, cartController.changeCount)

module.exports = router
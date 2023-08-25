const Router = require('express')
const router = Router()
const cartController = require('../controllers/cartController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/myCart', authMiddleware, cartController.getCart)
router.post('/addToCart', authMiddleware, cartController.addToCart)

module.exports = router
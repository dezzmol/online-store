const Router = require('express')
const router = Router()
const rateController = require('../controllers/ratingController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/getRate/:id', rateController.getRating)
router.post('/addRate', authMiddleware, rateController.addRating)

module.exports = router
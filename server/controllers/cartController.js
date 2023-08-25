const ApiError = require('../error/ApiError')
const {Cart, CartDevice} = require('../models/models')

class cartController {
    async addToCart(req, res, next) {
        try {
            const userID = req.user.id
            const deviceID = req.body.deviceID
            const cart = await Cart.findOne({where: {userId: userID}})
            const cartDevice = CartDevice.create({deviceId: deviceID, userId: userID, cartId: cart.id})
            return res.json(cartDevice)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getCart(req, res, next) {
        try {
            const userID = req.user.id
            const cart = await Cart.findOne({where: {userId: userID}})
            const devices = await CartDevice.findAll({where: {cartId: cart.id}})
            return res.json({cart, devices})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new cartController()
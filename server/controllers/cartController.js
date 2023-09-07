const ApiError = require('../error/ApiError')
const {Cart, CartDevice, Device} = require('../models/models')

class cartController {
    async addToCart(req, res, next) {
        try {
            const userID = req.user.id
            const deviceID = req.body.deviceID
            const cart = await Cart.findOne({where: {userId: userID}})
            let device = await Device.findOne({where: {id: deviceID}})
            let cartDevice = await CartDevice.findOne({where: {deviceId: deviceID, cartId: cart.id, price: device.price}})
            if (cartDevice) {
                cartDevice.update({count: cartDevice.count + 1})
                return res.json(cartDevice)
            }
            cartDevice = CartDevice.create({deviceId: deviceID, userId: userID, cartId: cart.id, count: 1, price: device.price})
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

    async changeCount(req, res, next) {
        try {
            const userID = req.user.id
            const {count, deviceId} = req.body
            const cart = await Cart.findOne({where: {userId: userID}})
            const device = await CartDevice.findOne({where: {deviceId, cartId: cart.id}})
            await device.update({count: count})
            await device.save()
            return res.json({device})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async removeFromCart(req, res, next) {
        try {
            const userID = req.user.id
            const {deviceId} = req.body
            const cart = await Cart.findOne({where: {userId: userID}})
            const cartDevice = await CartDevice.findOne({where: {cartId: cart.id, deviceId}})
            if (!cartDevice) {
                return res.json({ success: false, message: "Устройство не найдено в корзине" });
            }
            await cartDevice.destroy();

            return res.json({ success: true, message: "Устройство успешно удалено из корзины" });

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new cartController()
const ApiError = require('../error/ApiError')
const {Device, DeviceInfo, Rating} = require('../models/models')

const updateRating = async (device) => {
    const deviceID = device.id
    const rating = await Rating.findAll({where: {deviceId: deviceID}})
    let sum = 0;
    rating.map(item =>
        sum += item.rate
    )
    sum = (sum / rating.length).toFixed(0)

    device.update({rating: sum})
}

class RatingController {
    async getRating(req, res, next) {
        try {
            const {id} = req.params
            const device = await Device.findOne({where: {id}})
            const rating = device.rating
            return res.json({rating})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async addRating(req, res, next) {
        try {
            const userID = req.user.id
            const deviceID = req.body.deviceID
            const Rate = req.body.rate
            const rating = await Rating.findOne({where: {userId: userID, deviceId: deviceID}})
            if (rating) {
                rating.update({rate: Rate})
            } else {
                const deviceRating = await Rating.create({userId: userID, deviceId: deviceID, rate: Rate})
            }

            const device = await Device.findOne({where: {id: deviceID}})
            await updateRating(device)
            const deviceRating = device.rating
            return res.json({deviceRating})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new RatingController()
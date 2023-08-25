const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const isValidType = Type.findOne({where: {name}})
            if (!isValidType) {
                return next(ApiError.badRequest('Type with this name already exist'))
            }
            const type = await Type.create({name})
            return res.json(type)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
}

module.exports = new TypeController()
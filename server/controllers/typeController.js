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

    async getAll(req, res, next) {
        try {
            const types = await Type.findAll()
            return res.json(types)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const typeId = req.params.id
            const type = await Type.findOne({where: {id: typeId}})
            return res.json(type)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async edit(req, res, next) {
        try {
            const typeId = req.body.type.id
            const newName = req.body.type.name
            const type = await Type.findOne({where: {id: typeId}})
            if (!type) {
                return res.json({message: "Type is not exist"})
            }
            type.update({name: newName})
            return res.json(type)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new TypeController()
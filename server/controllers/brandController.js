const {Brand, Type} = require("../models/models");
const ApiError = require('../error/ApiError')

class BrandController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const isValidBrand = Brand.findOne({where: {name}})
            if (!isValidBrand) {
                return next(ApiError.badRequest('Brand with this name already exist'))
            }
            const brand = await Brand.create({name})
            return res.json(brand)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const brand = await Brand.findAll()
        return res.json(brand)
    }
}

module.exports = new BrandController()
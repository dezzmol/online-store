const {Brand} = require("../models/models");
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

    async getAll(req, res, next) {
        try {
            const brand = await Brand.findAll()
            return res.json(brand)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const brandId = req.params.id
            const type = await Brand.findOne({where: {id: brandId}})
            return res.json(type)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async edit(req, res, next) {
        try {
            const brandId = req.body.brand.id
            const newName = req.body.brand.name
            const brand = await Brand.findOne({where: {id: brandId}})
            if (!brand) {
                return res.json({message: "Brand is not exist"})
            }
            brand.update({name: newName})
            return res.json(brand)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BrandController()
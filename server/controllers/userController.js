const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jsonwt = require('jsonwebtoken')
const {User, Cart} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jsonwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest("Uncorrected email or password"))
        }
        const candidate = await User.findOne({where: {email}})

        if (candidate) {
            return next(ApiError.badRequest("User with this email is exist"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const cart = await Cart.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})
            if (!user) {
                return next(ApiError.internal("User with this email doesn't exist"))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.internal("Uncorrected password"))
            }
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch (e) {
            res.json(e.message)
        }

    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()
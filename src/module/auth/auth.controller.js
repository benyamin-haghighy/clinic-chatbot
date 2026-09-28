const {  DataTypes } = require('sequelize')
const sequelize = require('../../config/db')
const User = require('../../models/user')
const userModel = User(sequelize,DataTypes)
const {loginSchema,registerSchema} = require('./auth.validate')
const getDetailsOtp = require('../../utils/getDetailsOtp')
const otpGenerator = require('../../utils/otpGenerator')
const sendOtpCode = require('../../service/sendOtpCode')
const equalOtp = require('../../utils/equalOtp')
const jwt = require('jsonwebtoken')
const config = require('../../../config.app')

exports.send = async(req,res,next)=>{
    try {
        const {phone} = req.body
        await registerSchema.validate({phone})
        const {expiresIn,timeRemaining}= await getDetailsOtp(phone)
        if (!expiresIn) {
            return res.status(400).json({
                status:400,
                message:`You can request a new OTP after ${timeRemaining}`
            })
        }
        const code = await otpGenerator(phone)
        await sendOtpCode(phone,code)
        return res.status(200).json({
            status:200,
            message:'OTP code sent successfully'
        })
    } catch (error) {
        next(error)
    }
}
exports.login = async(req,res,next)=>{
    try {
        const {phone,code} = req.body
        await loginSchema.validate({phone})
        const {expiresIn}= await getDetailsOtp(phone)
        if (expiresIn) {
            return res.status(400).json({
                status:400,
                message:`please again login otp Code is expire`
            })
        }
        const isValidOtp = await equalOtp(phone,code)
        if (!isValidOtp) {
            return res.status(409).json({
                message:"otp code is wrong"
            })
        }
        const [user, isCreate] = await userModel.findOrCreate({where:{phone},defaults:{phone},raw:true})
        const accessToken = jwt.sign({id:user.id, phone:user.phone},config.accessToken.secret,{
            expiresIn:config.accessToken.expiresIn
        })
        const refreshToken = jwt.sign({id:user.id, phone:user.phone},config.refreshToken.secret,{
            expiresIn:config.refreshToken.expiresIn
        })
        res.cookie('accessToken',accessToken, {
            signed:true,
            sameSite:true,
            httpOnly:true,
            maxAge:24 * 60 * 60 * 1000 
        })
        res.cookie('refreshToken',refreshToken, {
            signed:true,
            sameSite:true,
            httpOnly:true,
            maxAge:48 * 60 * 60 * 1000 
        })
        return res.status(200).json("login is successFully")
    } catch (error) {
        next(error)
    }
}

exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('accessToken', { signed: true, httpOnly: true, sameSite: true });
        res.clearCookie('refreshToken', { signed: true, httpOnly: true, sameSite: true });
        return res.status(200).json({ message: 'logout is successfully' });
    } catch (error) {
        next(error)
    }
}


exports.me = async (req, res, next) => {
    try {
        return res.status(200).json({ user: { id: req.user.id, phone: req.user.phone } })
    } catch (error) {
        next(error)
    }
}

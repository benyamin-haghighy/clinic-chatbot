const redis = require('../redis')

module.exports = async (phone,code) => {
    const otpCode = await redis.get(`otp:${phone}`)
    if (+code === +otpCode) {
        await redis.del(`otp:${phone}`)
        return true
    }
    return false
}
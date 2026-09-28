const redis = require('../redis')
module.exports = async (phone) => {
    const code = Math.floor(100000 + Math.random() * 900000)
    redis.set(`otp:${phone}`, code, 'EX', 120)
    return code
}
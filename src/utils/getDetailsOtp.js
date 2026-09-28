const redis = require('../redis')

module.exports = async(phone)=>{
    const key =await redis.get(`otp:${phone}`)
    if (!key) {
        return {
            expiresIn: true,
            timeRemaining: '00:00'
        }
    }
    const time = await redis.ttl(`otp:${phone}`)
    return{
        expiresIn:false,
        timeRemaining:`${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`
    }
}
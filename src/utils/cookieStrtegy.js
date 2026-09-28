const cookieStrategy = require('passport-cookie').Strategy
const jwt = require('jsonwebtoken')
const config = require('../../config.app')
const {userModel} = require('../../relation')
module.exports = new cookieStrategy({
    cookieName:"accessToken",
    signed:true
},async(token, don)=>{
    try {
        const payload = jwt.verify(token,config.accessToken.secret)
        const user = await userModel.findOne({where:{phone:payload.phone}})
        return don(null,user)
    } catch (error) {
        return don(null,false)
    }
})


const { DataTypes } = require('sequelize')
const sequelize = require('./src/config/db')
const userModel = require('./src/models/user')(sequelize,DataTypes)
const messageModel = require('./src/models/message')(sequelize,DataTypes)
const conversationsModel = require('./src/models/conversations')(sequelize,DataTypes)




userModel.hasMany(messageModel,{
    foreignKey:'user_id'
})
messageModel.belongsTo(userModel,{
    foreignKey:'user_id'
})

userModel.hasMany(conversationsModel, {
    foreignKey:"user_id"
})
conversationsModel.belongsTo(userModel, {
    foreignKey:"user_id"
})

conversationsModel.hasMany(messageModel, {
    foreignKey:"conversation_id"

})
messageModel.belongsTo(conversationsModel, {
    foreignKey:"conversation_id"

})
module.exports = {
    userModel,
    messageModel,
    conversationsModel
}
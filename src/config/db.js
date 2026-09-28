const { Sequelize } = require("sequelize");


const sequelize = new Sequelize('chatBot', 'root', '', {
    host:"localhost",
    dialect:'mysql',
    logging:false
})



module.exports = sequelize
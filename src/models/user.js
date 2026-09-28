'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    freezeTableName:true,
    paranoid:true,
    timestamps:true
  });
  return user;
};
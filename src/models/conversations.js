'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conversations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  conversations.init({
    title: DataTypes.STRING,
    user_id:{
      type:DataTypes.INTEGER,
      references:{
        model:"user",
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'conversations',
    timestamps:true
  });
  return conversations;
};
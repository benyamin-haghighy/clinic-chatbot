'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  message.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      role:{
          type:DataTypes.ENUM('assistant', 'user'),
          defaultValue:"user",
      },
      content:{
        type:DataTypes.TEXT,
        allowNull:false
      },
      conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'conversations',
          key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clinic_documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  clinic_documents.init({
    title:{ type:DataTypes.STRING, allowNull:false},
    content:{ type:DataTypes.TEXT, allowNull:false},
    embedding:{ type:DataTypes.JSON, allowNull:false},
  }, {
    sequelize,
    modelName: 'clinic_documents',
    timestamps:true
  });
  return clinic_documents;
};
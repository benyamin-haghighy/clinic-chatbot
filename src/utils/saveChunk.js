const embeddingText = require('../service/embedding.services')
const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')
const clinicDocumentModel = require('../models/clinic_documents')(sequelize,DataTypes)
module.exports = async({title,content})=>{
    try {
        const response = await embeddingText(`${title}:\n${content}`)
        const clinic_document = await clinicDocumentModel.create({content, title,embedding:response},{raw:true})
        console.log(clinic_document);
        
    } catch (error) {
        console.log(error);
    }
}
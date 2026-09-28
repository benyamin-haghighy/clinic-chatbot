const sequelize = require('../config/db')
const {userModel} = require('../../relation')
const { DataTypes } = require('sequelize')
const cilinic_moedel = require('../models/clinic_documents')(sequelize,DataTypes)
const embedding = require('../service/embedding.services')
const compareEmbedding = require('../utils/compareEmnedding')
module.exports = async(text)=>{
    const embeddingTextUser = await embedding(text)
    let documnets = await cilinic_moedel.findAll({})
    documnets = await Promise.all(documnets.map(async(document)=>{
        return {
            content: `${document.title} : \n${document.content}`,
            embedding:JSON.parse(document.embedding),
            Similarity: await compareEmbedding(JSON.parse(document.embedding), embeddingTextUser)
        }
    }))
    documnets = documnets.sort((a,b)=>b.Similarity-a.Similarity)
    return documnets
}
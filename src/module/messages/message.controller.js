const {messageModel, conversationsModel,userModel} = require('../../../relation')
const {createSchema} = require('./message.validate')
const sendToAi = require('../../service/ai.services')
const embeddingText = require('../../service/embedding.services')
const sequelize = require('../../config/db')
const { DataTypes } = require('sequelize')
const cilinicModel = require('../../models/clinic_documents')(sequelize,DataTypes)
const searchVector = require('../../utils/searchVecto')
exports.createMessage = async(req,res,next)=>{
    try {
        const user= req.user
        const { content}= req.body
        const conversationId = req.params.id
        const isConversationsUser = await conversationsModel.findOne({
            where:{
                id:conversationId,
                user_id:user.id
            }
        })
        if (!isConversationsUser) {
            return res.status(403).json({message:"user is not access to this conversation "})
        }
        await createSchema.validate({content})
        const message = await messageModel.create({content,user_id:req.user.id,conversation_id:conversationId})
        const messages = await messageModel.findAll({attributes:['role', 'content'],where:{conversation_id:conversationId,user_id:req.user.id},raw:true, order:[['id','DESC']], limit:6})
        const  userMessages = messages.filter(message => message.role === 'user')
        let documnets = await searchVector(userMessages[0].content)
       const numberCompareSimilarity = 5/10
        if (userMessages[1]) {
            const new_documnets = await searchVector(
            `${userMessages[1].content}\n${userMessages[0].content}`
            )
            if (documnets[0].Similarity >= new_documnets[0].Similarity-0.05) {
                documnets = documnets.slice(0, 2)
            }else{
                documnets = new_documnets.slice(0, 2)
            }
        }else{
            documnets = documnets.slice(0,2)
        }
        const botContent =(documnets[0].Similarity < numberCompareSimilarity) ?'اطلاعات کافی برای پاسخ به این سوال در اختیار ندارم.':await sendToAi({messages:messages.reverse(),documnets})
        const botMessage = await messageModel.create({content:botContent, role:"assistant", user_id:req.user.id, conversation_id:conversationId})
        return res.status(201).json({
            Message:'the message is create',
            message,
            botMessage
        })
    } catch (error) {
        next(error)
    }
}

exports.getAll = async(req,res,next)=>{
    try {
        const user= req.user
        const conversationId = req.params.id
        const isConversationsUser = await conversationsModel.findOne({where:{id:conversationId, user_id:user.id}})
        if (!isConversationsUser) {
            return res.status(403).json({message:"user is not access to this conversation "})
        }
        const messages = await messageModel.findAll({where:{conversation_id:conversationId},raw:true})
        return res.status(200).json({messages})
    } catch (error) {
        next(error)
    }
}
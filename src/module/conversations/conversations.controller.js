const {conversationsModel,userModel} = require('../../../relation')

exports.getALL = async(req,res,next)=>{
    const conversations = await conversationsModel.findAll({
        where:{
            user_id:req.user.id
        }
        ,
        raw:true
    })
    return res.status(200).json({conversations})
}
exports.get = async(req,res,next)=>{
    const conversationId = req.params.id
    const conversation = await conversationsModel.findOne({
        where:{
            id:conversationId,
            user_id:req.user.id
        }
        ,
        raw:true
    })
    if (!conversation) {
        return res.status(404).json({message:"conversation is not found"})
    }
    return res.status(200).json({conversation})
}
exports.create = async(req,res,next)=>{
    try {
        const {title} = req.body
       const conversation = await conversationsModel.create({
            title,
            user_id:req.user.id
        })
        return res.status(201).json({message:"conversation is create",conversation

        })
    } catch (error) {
        next(error)
    }
}


exports.delete = async(req,res,next)=>{
    const user = req.user
    const conversationId = req.params.id
    const isConversationsUser = await conversationsModel.findOne({
        where:{
            id:conversationId,
            user_id:user.id
        }
    })
    if (!isConversationsUser) {
        return res.status(403).json({
            message:"this conversation is not for user"
        })
    }
    await conversationsModel.destroy({
        where:{
            id:conversationId
        }
    })
    return res.status(200).json({message:"this conversation is remove"})
}

exports.update = async(req,res,next)=>{
    try {
        const {title} = req.body
        const conversationId = req.params.id
         const isExist = await conversationsModel.findOne({
            where:{title,user_id:req.user.id},
            raw:true
         })
         if (isExist) {
            return res.status(400).json({message:"conversation with title is exist"})
         }
         await conversationsModel.update({title},{where:{id:conversationId,
            user_id:req.user.id

         }})
         return res.status(201).json({message:"the conversation is update"})
    } catch (error) {
        next(error)
    }
}


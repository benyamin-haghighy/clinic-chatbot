const axios = require('axios')
const config = require('../../config.app')
module.exports = async(text)=>{
    const response = await axios.post('https://openrouter.ai/api/v1/embeddings',{
        model:'liquid/lfm-2.5-embedding-350m:free',
        input:text
    },{
        headers:{
            Authorization:`Bearer ${config.api_key.key}`
        }
    })
    return response.data.data[0].embedding
}
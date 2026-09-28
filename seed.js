const fs = require('fs')
const path = require('path')
const sequelize = require('./src/config/db')
const { DataTypes } = require('sequelize')
const clinicDocumentModel = require('./src/models/clinic_documents')(sequelize, DataTypes)
const saveChunk = require('./src/utils/saveChunk')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Each document in src/clinic.txt starts with a line like:  ## Title
// and everything below it (until the next "## ") is the document's content.
const readDocuments = () => {
    const raw = fs.readFileSync(path.resolve(__dirname, 'src', 'clinic.txt'), 'utf-8')
    return raw
        .split(/^## /m)
        .map(block => block.trim())
        .filter(Boolean)
        .map(block => {
            const [title, ...rest] = block.split('\n')
            return { title: title.trim(), content: rest.join('\n').trim() }
        })
        .filter(doc => doc.title && doc.content)
}

;(async () => {
    try {
        const documents = readDocuments()

        if (documents.length === 0) {
            console.log('src/clinic.txt has no documents. Nothing was changed.')
            return
        }

        console.log(`found ${documents.length} documents`)

        await clinicDocumentModel.destroy({ where: {}, truncate: true })
        console.log('old documents removed')

        for (const doc of documents) {
            await saveChunk({ title: doc.title, content: doc.content })
            console.log('saved:', doc.title)
            await sleep(1500)   // avoid hitting the rate limit
        }

        console.log('done')
    } catch (error) {
        console.log(error)
    } finally {
        process.exit(0)
    }
})()

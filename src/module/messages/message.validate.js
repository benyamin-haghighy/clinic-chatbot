const yup= require('yup')

exports.createSchema = yup.object().shape({
    content:yup.string().required('role is required')
})
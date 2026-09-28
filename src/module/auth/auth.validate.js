const yup = require('yup');

exports.registerSchema = yup.object().shape({
    phone: yup.string().required('Phone number is required').matches(/^\d{11}$/, 'Phone number must be 11 digits'),
});

exports.loginSchema = yup.object().shape({
    phone: yup.string().required('Phone number is required').matches(/^\d{11}$/, 'Phone number must be 11 digits'),
});
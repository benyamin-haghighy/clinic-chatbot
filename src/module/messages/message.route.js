const express = require('express')
const router = express.Router()
const controller = require('./message.controller')
const passport = require('passport')

router.route('/conversation/:id')
    .get(passport.authenticate('accessToken',{session:false}),controller.getAll)
    .post(passport.authenticate('accessToken',{session:false}),controller.createMessage)

module.exports = router
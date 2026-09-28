const express = require('express')
const router = express.Router()
const controller = require('./conversations.controller')
const passport = require('passport')
router.route('/')
    .get(passport.authenticate('accessToken',{session:false}), controller.getALL)
    .post(passport.authenticate('accessToken',{session:false}),controller.create)

router.route('/:id')
    .get(passport.authenticate('accessToken', {session:false}), controller.get)
    .delete(passport.authenticate('accessToken', {session:false}),controller.delete)
    .put(passport.authenticate('accessToken',{session:false}),controller.update)



module.exports = router
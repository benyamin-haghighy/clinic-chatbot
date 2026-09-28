const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');


router.post('/register', authController.send);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', require('passport').authenticate('accessToken', { session: false }), authController.me);

module.exports = router;
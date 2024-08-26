const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
router
    .post('/register',authController.register)
    .post('/login',authController.login);

module.exports = router;
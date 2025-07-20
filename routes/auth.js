const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Visa register och login-sidor
router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);

router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

router.get('/logout', userController.logout);

module.exports = router;

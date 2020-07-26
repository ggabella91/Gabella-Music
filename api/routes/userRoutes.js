const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Use protect middleware on all routes (middlewares) that come after this point
router.use(authController.protect);

module.exports = router;

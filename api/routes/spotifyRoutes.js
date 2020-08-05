const express = require('express');
const spotifyController = require('../controllers/spotifyController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/login', spotifyController.login);

router.get('/callback', spotifyController.callback);

router.get('/refreshToken', spotifyController.getRefreshToken);

router.post('/getEndpointData', spotifyController.getEndpointData);

module.exports = router;

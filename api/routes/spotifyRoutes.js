const express = require('express');
const spotifyController = require('../controllers/spotifyController');

const router = express.Router();

router.get('/login', spotifyController.login);

router.get('/callback', spotifyController.callback);

router.get('/refreshToken', spotifyController.getRefreshToken);

router.post('/getEndpointData', spotifyController.getEndpointData);

module.exports = router;

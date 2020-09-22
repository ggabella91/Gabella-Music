const axios = require('axios');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const querystring = require('querystring');
const dotenv = require('dotenv');
const catchAsync = require('../utils/catchAsync');

const User = require('../models/userModel');

dotenv.config({ path: '../config.env' });

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let redirectUri;
let redirectToHomepage;
if (process.env.NODE_ENV === 'development') {
  redirectUri = 'http://localhost:8000/api/v1/spotify/callback';
  redirectToHomepage = 'http://localhost:3000/me';
} else {
  redirectUri = 'https://gabellamusic.herokuapp.com/api/v1/spotify/callback';
  redirectToHomepage = 'https://gabellamusic.herokuapp.com/me';
}
const markConnectedToSpotify = catchAsync(async (jwtCookie, refreshToken) => {
  // 1) Verify token
  const decoded = await promisify(jwt.verify)(
    jwtCookie,
    process.env.JWT_SECRET
  );

  const user = await User.findByIdAndUpdate(decoded.id, {
    isConnectedToSpotify: true,
    lastSpotifyAuthToken: new Date(Date.now()),
    spotifyRefreshToken: refreshToken,
  });

  return user;
});

const generateRandomString = function (length) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

exports.login = (req, res, next) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  console.log(req.cookies);

  // Application requests authorization
  const scope =
    'user-read-private user-read-email user-library-read user-top-read user-read-recently-played user-read-playback-position user-read-playback-state user-read-currently-playing playlist-read-collaborative playlist-read-private';

  const redirectParams = querystring.stringify({
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${redirectParams}`);
};

exports.callback = async (req, res, next) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  const jwtCookie = req.cookies.jwt;

  if (state === null || state !== storedState) {
    const stateMismatch = querystring.stringify({
      error: 'state_mismatch',
    });

    res.redirect(`/#${stateMismatch}`);
  } else {
    res.cookie(stateKey, '', {
      expires: new Date(Date.now() + 1000),
      httpOnly: true,
    });

    const postHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const response = await axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
        },
        postHeaders,
      });

      if (response.status === 200) {
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        const getUrl = 'https://api.spotify.com/v1/me';

        const getHeaders = {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        };

        try {
          const getRes = await axios({
            method: 'get',
            url: getUrl,
            getHeaders,
            params: {
              access_token: accessToken,
              refresh_token: refreshToken,
            },
          });

          if (getRes.status === 200) {
            console.log('LOGIN SUCCESSFUL!');
          }

          res.cookie('spotifyAuthToken', accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60),
          });

          res.cookie('spotifyRefreshToken', refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60),
          });

          const user = markConnectedToSpotify(jwtCookie, refreshToken);

          res.redirect(redirectToHomepage).json({
            status: 'success',
            lastRefresh: user.lastSpotifyAuthToken,
          });
        } catch (err) {
          console.log(err.message);
        }
      } else {
        const invalidToken = querystring.stringify({
          error: 'invalid_token',
        });
        res.redirect(400, `/#${invalidToken}`);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
};

exports.getRefreshToken = async (req, res, next) => {
  // requesting access token from refresh token
  const jwtCookie = req.cookies.jwt;

  // 1) Verify token
  const decoded = await promisify(jwt.verify)(
    jwtCookie,
    process.env.JWT_SECRET
  );

  const userRefresh = await User.findById(decoded.id);
  const refreshToken = userRefresh.spotifyRefreshToken;

  const refreshHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    const refreshRes = await axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      refreshHeaders,
    });

    if (refreshRes.status === 200) {
      const accessToken = refreshRes.data.access_token;
      console.log('REFRESH TOKEN REQUEST SUCCESSFUL!');

      res.cookie('spotifyAuthToken', accessToken, {
        httpOnly: true,
        overwrite: true,
      });

      // Update lastSpotifyAuthToken user property
      const decodedRefresh = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const user = await User.findByIdAndUpdate(decodedRefresh.id, {
        isConnectedToSpotify: true,
        lastSpotifyAuthToken: new Date(Date.now() + 10 * 1000),
        spotifyRefreshToken: refreshToken,
      });

      res.status(200).json({
        status: 'success',
        lastRefresh: user.lastSpotifyAuthToken,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

exports.getEndpointData = async (req, res, next) => {
  const accessToken = req.cookies.spotifyAuthToken;
  const { endpoint } = req.body;

  try {
    const endpointRes = await axios.get(
      `https://api.spotify.com/v1/${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (endpointRes.status === 200) {
      res.status(200).send({
        data: endpointRes.data,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

exports.disconnect = catchAsync(async (req, res, next) => {
  // requesting access token from refresh token
  const jwtCookie = req.cookies.jwt;

  // 1) Verify token
  const decoded = await promisify(jwt.verify)(
    jwtCookie,
    process.env.JWT_SECRET
  );

  const userRes = await User.findByIdAndUpdate(decoded.id, {
    isConnectedToSpotify: false,
    spotifyRefreshToken: '',
    lastSpotifyAuthToken: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 10),
  });

  console.log('Disconnected from Spotify successfully.');

  res.status(200).send({
    data: userRes.isConnectedToSpotify,
  });
});

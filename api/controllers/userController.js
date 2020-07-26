const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

exports.getAllUsers = (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
};

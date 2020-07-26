const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email.'],
  },
  photo: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      // Only works for create and save
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match!',
    },
  },
  spotifyAuthToken: String,
  spotifyAuthExpires: Date,
  spotifyRefreshToken: String,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if the password or the Spotify auth token were modified
  if (!this.isModified('password') && !this.isModified('spotifyAuthToken')) {
    return next();
  }

  if (this.isModified('password')) {
    // Hash the password with a cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
  } else if (this.isModified('spotifyAuthToken')) {
    // Hash the Spotify auth token with a cost of 12
    this.spotifyAuthToken = await bcrypt.hash(this.spotifyAuthToken, 12);
    // Hash the Spotify refresh token with a cost of 12
    this.spotifyRefreshToken = await bcrypt.hash(this.spotifyRefreshToken, 12);
    next();
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('spotifyAuthToken')) return next();

  this.spotifyAuthExpires = Date.now() + 60 * 60 * 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  //'this' points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimeStamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

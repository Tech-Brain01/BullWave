const {Schema} = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true , 'Username is required'], 
    minlength: [3, 'Username must be at least 3 characters long'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, 
    lowercase: true, 
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'A password is required.'],
    minlength: [6, 'Password must be at least 6 characters long.'],
  },
  walletBalance: {
    type: Number,
    default: 100000,
    min: [0, 'Wallet balance cannot be negative.'],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {UserSchema};

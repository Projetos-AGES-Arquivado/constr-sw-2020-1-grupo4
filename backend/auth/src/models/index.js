const mongoose = require('mongoose');
const User = require('./user');
const Role = require('./role');

process.env.MONGO_CONNECTION = 'mongodb+srv://user:Ud3QU7wz0T218FLQ@cluster0-pfhhf.mongodb.net/test';

mongoose.connect(
  process.env.MONGO_CONNECTION
);

module.exports = { User, Role };

const mongoose = require('mongoose');
const User = require('./user');
const Role = require('./role');

// process.env.MONGO_CONNECTION = 'mongodb://localhost:27017/users';

mongoose.connect(
  process.env.MONGO_CONNECTION ||
    'mongodb://mongo:27017/users'
);

module.exports = { User, Role };

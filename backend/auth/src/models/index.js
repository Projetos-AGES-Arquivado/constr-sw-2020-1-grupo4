const mongoose = require('mongoose');
const User = require('./user');
const Role = require('./role');

// process.env.MONGO_CONNECTION = 'mongodb://localhost:27017/users';

mongoose.connect(
  process.env.MONGO_CONNECTION ||
    'mongodb://constr-sw-2020-1-grupo4_mongodb_1:27017/users'
);

module.exports = { User, Role };

const mongoose = require('mongoose');

const Role = mongoose.model('Role', {
  name: String,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = Role;

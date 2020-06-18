const mongoose = require('mongoose');

const User = mongoose.model('User', {
  name: String,
  nickname: String,
  email: String,
  createdAt: Date,
  updatedAt: Date,
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  }],
});

module.exports = User;

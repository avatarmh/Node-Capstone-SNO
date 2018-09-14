'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: { type: String, required: true},
  middleInitial: { type: String, maxlength: 2, default: ''},
  lastName: { type: String, required: true },
  membershipChoice: { type: String, required: true },
  memberType: { type: String, required: true },
  street1: { type: String, required: true },
  street2: { type: String, default: '' },
  city: { type: String, required: true },
  stateProvDept: { type: String, required: true },
  country: { type: String, required: true }

});


UserSchema.methods.serialize = function () {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    middleInitial: this.middleInitial || '',
    lastName: this.lastName || '',
    membershipChoice: this.membershipChoice || '',
    memberType: this.memberType || '',
    street1: this.street1 || '',
    street2: this.street2 || '',
    city: this.city || '',
    stateProvDept: this.stateProvDept || '',
    country: this.country || ''
  };
};

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };

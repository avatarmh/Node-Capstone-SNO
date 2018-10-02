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
  // name
  firstName: { type: String, required: true},
  middleInitial: { type: String, maxlength: 2, default: ''},
  lastName: { type: String, required: true },
  // member info
  membershipChoice: { type: String, required: true },
  memberType: { type: String, required: true },
  // address
  street1: { type: String, required: true },
  street2: { type: String, default: '' },
  city: { type: String, required: true },
  stateProvDept: { type: String, required: true },
  country: { type: String, required: true },
  // other info
  phone: {type: String, required: true},
  altEmail: {type: String, default: ''},
  fax: {type: String, default: ''},
  gender: {type: String, default: ''},
  // affiliation info
  affiliation: {type: String, default: ''},
  position: {type: String, default: ''},
  deptUnit: {type: String, default: ''},
  researchFocus: {type: String, default: ''},
  specificSNOInterest: {type: String, default: ''}

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
    country: this.country || '',
    phone: this.phone || '',
    altEmail: this.altEmail || '',
    fax: this.fax || '',
    gender: this.gender || '',
    affiliation: this.affiliation || '',
    position: this.position || '',
    deptUnit: this.deptUnit || '',
    researchFocus: this.researchFocus || '',
    specificSNOInterest: this.specificSNOInterest || ''

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

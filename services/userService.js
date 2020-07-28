const {User} = require('../models/user');
const bcrypt = require('bcrypt');

const userService = {
  generateHash: async (user) => {
    const {_id, email, phone} = user;
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(_id + email.address + phone.number, salt);
  },

  validHash: async (hash, user) => {
    const {_id, email, phone} = user;
    return bcrypt.compare(_id + email.address + phone.number, hash);
  },

};

module.exports = {userService};

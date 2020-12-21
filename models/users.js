const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const usersSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('Users', usersSchema)
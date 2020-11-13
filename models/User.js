const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, unique: true },
    status: { type: Number, default: 1 }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;

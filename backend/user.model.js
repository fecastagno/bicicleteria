const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    usuario: {
        type: String
    },
    clave: {
        type: String
    },
    rol: {
        type: String
    }
});

module.exports = mongoose.model('User', User);
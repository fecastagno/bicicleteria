const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Pieza = new Schema({
    codigo: {
        type: String
    },
    tipo: {
        type: String
    },
    cantidad: {
        type: String
    }
});

module.exports = mongoose.model('Pieza', Pieza);
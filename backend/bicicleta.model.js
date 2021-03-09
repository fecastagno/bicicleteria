const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Bicicleta = new Schema({
    codigo: {
        type: String
    },
    cantidad: {
        type: Number
    }
});

module.exports = mongoose.model('Bicicleta', Bicicleta);
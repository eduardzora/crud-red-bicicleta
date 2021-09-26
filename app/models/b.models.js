const mongoose = require('mongoose');

const BicicletaSchema = mongoose.Schema({
    color: String,
    tipo: String,
    lactitud: String,
    longitud: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Bicicleta', BicicletaSchema);
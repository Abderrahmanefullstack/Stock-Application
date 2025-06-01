const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    produitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produit',
        required: true,
        unique: true
    },
    quantite: { type: Number, default: 0, min: 0 },
    seuilAlert: { type: Number, default: 10, min: 0 }
});

module.exports = mongoose.model('Stock', stockSchema);
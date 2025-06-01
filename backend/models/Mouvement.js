const mongoose = require('mongoose');

const mouvementSchema = new mongoose.Schema({
    produitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produit',
        required: true
    },
    type: { type: String, enum: ['entree', 'sortie'], required: true },
    quantite: { type: Number, required: true, min: 1 },
    date: { type: Date, default: Date.now },
    utilisateurId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Mouvement', mouvementSchema);
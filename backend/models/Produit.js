const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: String,
    prix: { type: Number, min: 0, required: true },
    categorie: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Produit', produitSchema);
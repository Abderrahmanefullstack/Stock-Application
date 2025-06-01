const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Produit = require('../models/Produit');
const Stock = require('../models/Stock');

router.post('/', auth, async (req, res) => {
    try {
        const produit = new Produit(req.body);
        await produit.save();

        const stock = new Stock({ produitId: produit._id });
        await stock.save();

        res.status(201).json(produit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const produits = await Produit.aggregate([
            {
                $lookup: {
                    from: 'stocks',
                    localField: '_id',
                    foreignField: 'produitId',
                    as: 'stock'
                }
            },
            { $unwind: '$stock' }
        ]);
        res.json(produits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const produit = await Produit.findById(req.params.id);
        if (!produit) return res.status(404).json({ message: 'Produit non trouvé' });
        res.json(produit);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!produit) return res.status(404).json({ message: 'Produit non trouvé' });
        res.json(produit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const produit = await Produit.findByIdAndDelete(req.params.id);
        if (!produit) return res.status(404).json({ message: 'Produit non trouvé' });

        await Stock.deleteOne({ produitId: req.params.id });

        res.json({ message: 'Produit supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
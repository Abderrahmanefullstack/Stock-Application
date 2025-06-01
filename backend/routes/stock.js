const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Stock = require('../models/Stock');
const Mouvement = require('../models/Mouvement');

router.post('/entree', auth, async (req, res) => {
    try {
        const { produitId, quantite } = req.body;

        const stock = await Stock.findOne({ produitId });
        if (!stock) return res.status(404).json({ message: 'Stock non trouvé' });

        stock.quantite += quantite;
        await stock.save();

        const mouvement = new Mouvement({
            produitId,
            type: 'entree',
            quantite,
            utilisateurId: req.user.userId
        });
        await mouvement.save();

        res.json({ stock, mouvement });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/sortie', auth, async (req, res) => {
    try {
        const { produitId, quantite } = req.body;

        const stock = await Stock.findOne({ produitId });
        if (!stock) return res.status(404).json({ message: 'Stock non trouvé' });

        if (stock.quantite < quantite) {
            return res.status(400).json({ message: 'Stock insuffisant' });
        }

        stock.quantite -= quantite;
        await stock.save();

        const mouvement = new Mouvement({
            produitId,
            type: 'sortie',
            quantite,
            utilisateurId: req.user.userId
        });
        await mouvement.save();

        res.json({ stock, mouvement });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/alert', auth, async (req, res) => {
    try {
        const alerts = await Stock.find({
            quantite: { $lt: { $expr: '$seuilAlert' } }
        }).populate('produitId');
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
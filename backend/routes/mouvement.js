const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Mouvement = require('../models/Mouvement');

router.get('/', auth, async (req, res) => {
    try {
        const mouvements = await Mouvement.find().populate('produitId').populate('utilisateurId', 'email');
        res.json(mouvements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
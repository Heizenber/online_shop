const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/', (req, res) => {
    res.redirect('/products');
});

module.exports = router;
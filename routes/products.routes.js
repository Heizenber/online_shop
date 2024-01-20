const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/products', (req, res) => {
    res.render('customer/products/all-products', { title: 'Products' });
});

module.exports = router;
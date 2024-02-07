const Product = require('../models/product.model');


async function getAllProducts(req, res, next) {
    try {
        const products = await Product.findAll();
        res.render('customer/products/all-products', { products });
    } catch (error) {
        next(error);
        return;
    }
}

async function getProductById(req, res, next) {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.render('customer/products/product-detail', { product });
    } catch (error) {
        next(error);
        return;
    }
}

module.exports = { 
    getAllProducts,
    getProductById,
}
const Product = require('../models/product.model');

async function addCartItem(req, res, next) {
    const productId = req.params.id;
    let product;
    try {
        product = await Product.findById(productId);
    } catch (error) {
        next(error);
        return;
    }
    const cart = res.locals.cart;
    cart.addItem(product)
    req.session.cart = cart;

    res.status(201).json({
        message: 'Product added to cart successfully',
        totalItems: cart.totalItems
    })
}


module.exports = {
    addCartItem,
}
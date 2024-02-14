class Cart {
    constructor(items = [], totalItems = 0, totalPrice = 0) {
        this.items = items;
        this.totalItems = totalItems;
        this.totalPrice = totalPrice;
    }

    addItem(product) {
        const cartItem = {
            product: product,
            quantity: 1,
            totalPrice: product.price,
        }

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.product._id === product._id) {
                cartItem.quantity = cartItem.quantity + 1;
                cartItem.totalPrice = cartItem.totalPrice + product.price;
                this.items[i] = cartItem;

                this.totalItems++;
                this.totalPrice = this.totalPrice + product.price;
                return;
            }
        }
        this.items.push(cartItem);
    }

    getProducts() {
        return this.items;
    }
}

module.exports = Cart;
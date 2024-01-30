const db = require("../data/database");

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.price = +productData.price;
        this.description = productData.description;
        this.image = productData.image;
        this.summary = productData.summary;
        this.imagePath = `product-data/images/${productData.image}`;
        this.imageUrl = `/products/assets/images/${productData.image}`
    }

    async save() {
        const productData = {
            title: this.title,
            price: this.price,
            description: this.description,
            image: this.image,
            summary: this.summary,
        };
        await db.getDb().collection('products').insertOne(productData);
    }
}

module.exports = Product;
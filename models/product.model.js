const db = require("../data/database");
const { ObjectId } = require("mongodb");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image;
    this.summary = productData.summary;
    this.imagePath = `product-data/images/${productData.image}`;
    this.imageUrl = `/products/assets/images/${productData.image}`;
    if (productData._id) {
      this._id = productData._id.toString();
    }
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();
    return products.map((product) => {
      return new Product(product);
    });
  }

  async save() {
    const productData = {
      title: this.title,
      price: this.price,
      description: this.description,
      image: this.image,
      summary: this.summary,
    };
    await db.getDb().collection("products").insertOne(productData);
  }

  static async findById(id) {
    let productId;
    try {
      productId = new ObjectId(id);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: productId });

    if (!product) {
      const error = new Error("Product not found");
      error.code = 404;
      throw error;
    }
    return product;
  }
}

module.exports = Product;

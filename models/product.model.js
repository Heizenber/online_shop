const db = require("../data/database");
const { ObjectId } = require("mongodb");
const fs = require("fs");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image;
    this.summary = productData.summary;
    this.updateImageData();
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

  updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  async save() {
    const productData = {
      title: this.title,
      price: this.price,
      description: this.description,
      image: this.image,
      summary: this.summary,
    };

    if (this._id) {
      if (!this.image) {
        delete productData.image;
      }
      const productId = new ObjectId(this._id);

      await db
        .getDb()
        .collection("products")
        .updateOne({ _id: productId }, { $set: productData });
    } else {
      await db.getDb().collection("products").insertOne(productData);
    }
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
    return new Product(product);
  }

  replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  static async deleteById(id) {
    const productId = new ObjectId(id);
    try {
      // let product = await db
      // .getDb()
      // .collection("products")
      // .findOne({ _id: productId });

      // product = new Product(product);
      // console.log(product)

      // await fs.unlink(product.imagePath, (error) => {
      //   console.log(error)
      //   throw error;
      // });

      await db.getDb().collection("products").deleteOne({ _id: productId });
    } catch (error) {
      error.code = 500;
      throw error;
    }
  }
}

module.exports = Product;

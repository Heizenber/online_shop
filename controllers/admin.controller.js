const Product = require("../models/product.model");

async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render("admin/products/all-products", { products });
  } catch (error) {
    next(error);
    return;
  }
}

function getNewProduct(req, res) {
  res.render("admin/products/new-product");
}

async function createNewProduct(req, res, next) {
  const newProduct = new Product({ ...req.body, image: req.file.filename });

  try {
    await newProduct.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

async function getUpdateProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    res.render("admin/products/update-product", { product });
  } catch (error) {
    next(error);
  }
}

function updateProduct(req, res) {
  res.redirect("/admin/products");
}

module.exports = {
  getProducts,
  getNewProduct,
  createNewProduct,
  getUpdateProduct,
  updateProduct,
};

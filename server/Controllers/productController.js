const productModel = require("../Models/productModel");

exports.getAllProducts = (req, resp) => {
  productModel
    .getAllProducts()
    .then((res) => {
      resp.send(res);
      console.log("received all products");
    })
    .catch((err) => {
      resp.send(err);
      console.log("error");
    });
};

exports.getProductById = (req, resp) => {
  let id = req.params.id;
  productModel
    .getProductById(id)
    .then((res) => {
      resp.send(res);
      console.log("Received succesfully");
    })
    .catch((err) => {
      console.log("Error");
      resp.send(err);
    });
};

exports.getOrdersByProduct = (req, resp) => {
  let productId = req.params.id;
  productModel
    .getOrdersByProduct(productId)
    .then((res) => {
      resp.send(res);
      console.log("Received succesfully");
    })
    .catch((err) => {
      console.log("Error");
      resp.send(err);
    });
};

exports.createProduct = (req, resp) => {
  let name = req.body.name;
  let price = req.body.price;
  let description = req.body.description;
  productModel
    .createProduct(name, price, description)
    .then((res) => {
      resp.send(res);
      console.log("Received succesfully");
    })
    .catch((err) => {
      resp.send(err);
      console.log("Error");
    });
};

exports.updateProduct = (req, resp) => {
  let id = req.body.id;
  let name = req.body.name;
  let price = req.body.price;
  let description = req.body.description;
  productModel
    .updateProduct(id, name, price, description)
    .then((res) => {
      resp.send(res);
      console.log("Received succesfully");
    })
    .catch((err) => {
      resp.send(err);
      console.log("Error");
    });
};

exports.deleteProduct = (req, resp) => {
  let id = req.params.id;

  productModel
    .deleteProduct(id)
    .then((res) => {
      resp.send(res);
      console.log("Received succesfully");
    })
    .catch((err) => {
      resp.send(err);
      console.log("Error");
    });
};

const shoppingCartModel = require("../Models/shoppingCartModel");

exports.getShoppingCart = (req, resp) => {
  const customerId = req.params.customerId;

  shoppingCartModel
    .getShoppingCart(customerId)
    .then((res) => {
      resp.send(res);
      console.log("successful");
    })
    .catch((err) => {
      resp.send(err);
      console.log("error");
    });
};

exports.addToCart = (req, resp) => {
  const { customerId, productId, quantity } = req.body;
  const isPresent = req.body.isPresent;
  if (isPresent) {
    shoppingCartModel
      .updateCart(productId, quantity)
      .then((res) => {
        resp.send(res);
        console.log("successful");
      })
      .catch((err) => {
        resp.send(err);
        console.log("Error");
      });
  } else {
    shoppingCartModel
      .addToCart(customerId, productId, quantity)
      .then((res) => {
        resp.send(res);
        console.log("Successful");
      })
      .catch((err) => {
        resp.send(err);
        console.log("error");
      });
  }
};

exports.buy = (req, resp) => {
  const customerId = req.body.customerId;
  const address = req.body.address;
  shoppingCartModel
    .buy(customerId, address)
    .then((res) => {
      resp.send(res);
    })
    .catch((err) => {
      resp.send(err);
      console.log("Error");
    });
};

exports.removeFromCart = (req, resp) => {
  const productId = req.params.productId;
  const customerId = req.params.customerId;
  shoppingCartModel
    .removeFromCart(productId, customerId)
    .then((res) => {
      resp.send(res);
      console.log("Successful");
    })
    .catch((err) => {
      resp.send(err);
      console.log("Error");
    });
};

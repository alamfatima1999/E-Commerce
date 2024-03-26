const orderModel = require("../Models/orderModel");

exports.getAllOrders = (req, resp) => {
  orderModel
    .getAllOrders()
    .then((res) => {
      resp.send(res);
      console.log("Successful");
    })
    .catch((err) => {
      resp.send(err);
      console.log("error");
    });
};

exports.getOrderById = (req, resp) => {
  let id = req.params.id;
  orderModel
    .getOrderById(id)
    .then((res) => {
      resp.send(res);
      console.log("Successful");
    })
    .catch((err) => {
      resp.send(err);
      console.log("Error");
    });
};

exports.getProductsByOrderId = (req, resp) => {
  let id = req.params.id;
  orderModel
    .getProductsByOrderId(id)
    .then((res) => {
      resp.send(res);
      console.log("Successful");
    })
    .catch((err) => {
      resp.send(err);
      console.log("Error");
    });
};

exports.getPastOrdersByCustomerId = (req, resp) => {
  let customerId = req.params.customerId;
  orderModel
    .getPastOrdersByCustomerId(customerId)
    .then((res) => {
      resp.send(res);
      console.log("Successful");
    })
    .catch((err) => {
      resp.send(err);
      console.log("Error");
    });
};

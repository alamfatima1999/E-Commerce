const db = require("../databaseConnection/connection");

exports.getAllOrders = () => {
  const query =
    "SELECT O.orderId, U.fname, U.lname, O.createdDate, O.totalPrice " +
    "FROM orders O INNER JOIN users U ON O.userId= U.userId;";
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getOrderById = (id) => {
  const query =
    "SELECT U.fname, U.lname, O.totalPrice, U.createdDate, O.address " +
    "FROM orders O INNER JOIN users U ON O.userId = U.userId " +
    "WHERE O.orderId = ?;";
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, result) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getProductsByOrderId = (id) => {
  const query =
    "SELECT P2.productId, P2.name, P.quantity, P.totalPrice " +
    "FROM orders O INNER JOIN productsinorder P ON O.orderId = P.orderId " +
    "INNER JOIN product P2 ON P.productId = P2.productId " +
    "WHERE O.orderId = ?;";
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getPastOrdersByCustomerId = (customerId) => {
  const query =
    "SELECT O.orderId, P.name, O.createdDate, PIN.quantity, PIN.totalPrice " +
    "FROM orders O INNER JOIN productsinorder PIN ON O.orderId = PIN.orderId  " +
    "INNER JOIN Product P ON PIN.productId = P.productId " +
    "WHERE O.userId = ? " +
    "ORDER BY O.orderID DESC;";

  return new Promise((resolve, reject) => {
    db.query(query, [customerId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

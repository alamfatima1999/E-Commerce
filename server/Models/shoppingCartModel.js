const db = require("../databaseConnection/connection");

exports.getShoppingCart = (customerId) => {
  const query =
    "SELECT S.quantity, P.name, P.price, P.productId FROM shopingcart S INNER JOIN product P ON S.productId = P.productId WHERE S.userId = ?;";
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

exports.updateCart = (productId, quantity) => {
  const query = "UPDATE shopingcart SET quantity = ? WHERE productId = ?;";
  return new Promise((resolve, reject) => {
    db.query(query, [quantity, productId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.addToCart = (customerId, productId, quantity) => {
  const query =
    "INSERT INTO shopingcart (userId, productId, quantity) VALUES (?,?,?);";
  return new Promise((resolve, reject) => {
    db.query(query, [customerId, productId, quantity], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.buy = (customerId, address) => {
  const query = "INSERT INTO orders (userId, address) VALUES (?,?);";
  return new Promise((resolve, reject) => {
    db.query(query, [customerId, address], (err, result) => {
      if (err) {
        reject(err);
      } else {
        db.query(
          "INSERT INTO productsinorder (orderId, productId, quantity, totalPrice) " +
            "SELECT (SELECT max(orderId) FROM orders WHERE userId = ?), S.productId, S.quantity, P.price*S.quantity " +
            "FROM shopingcart S INNER JOIN product P ON S.productId = P.productId " +
            "WHERE S.userId = ?;",
          [customerId, customerId],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              db.query(
                "UPDATE orders O " +
                  "SET totalPrice = (SELECT SUM(P.totalPrice) " +
                  "FROM productsinorder P " +
                  "WHERE O.orderId= P.orderId " +
                  "group by O.orderId) " +
                  "WHERE userId = ? and totalPrice IS null;",
                [customerId],
                (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    db.query(
                      "DELETE FROM shopingcart WHERE userId = ?;",
                      [customerId],
                      (err, result) => {
                        if (err) {
                          reject(err);
                        } else {
                          resolve(result);
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    });
  });
};

exports.removeFromCart = (productId, customerId) => {
  const query = "DELETE FROM shopingcart WHERE productId = ? and userId = ?;";
  return new Promise((resolve, reject) => {
    db.query(query, [productId, customerId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const db = require("../databaseConnection/connection");

exports.getAllProducts = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from product", (err, result) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getProductById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "Select * from product where productId = ?",
      [id],
      (err, result) => {
        if (err) {
          console.log("error");
          reject(err.message);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.getOrdersByProduct = (productId) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT O.orderId, U.fname, U.lname, O.createdDate, PIN.quantity, PIN.totalPrice " +
      "FROM users U INNER JOIN orders O on U.userId  = O.userId " +
      "INNER JOIN productsInOrder PIN on O.orderId = PIN.orderId " +
      "INNER JOIN product P on PIN.productId = P.productId " +
      "WHERE PIN.productId = ?;";

    db.query(query, [productId], (err, result) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(result);
      }
    });
  });
};

exports.createProduct = (name, price, description) => {
  const query =
    "INSERT INTO product (name, price, description) values (?,?,?);";
  return new Promise((resolve, reject) => {
    db.query(query, [name, price, description], (err, result) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(result);
      }
    });
  });
};

exports.updateProduct = (id, name, price, description) => {
  const query =
    "UPDATE product SET name = ? , price = ? , description = ? WHERE productId = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [name, price, description, id], (err, result) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(result);
      }
    });
  });
};

exports.deleteProduct = (id) => {
  const query = "DELETE FROM product WHERE productId = ?;";
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

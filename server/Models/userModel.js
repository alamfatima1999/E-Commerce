const db = require("../databaseConnection/connection");

exports.register = (email, password, isAdmin, fname, lname) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (email, password, isAdmin, fname, lname) VALUES (?,?,?,?,?);",
      [email, password, isAdmin, fname, lname],
      (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          //   console.log("Succesfull Register");
          resolve(result);
        }
      }
    );
  });
};

exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT userId, isAdmin FROM users WHERE email = ? AND password = ?;",
      [email, password],
      (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      }
    );
  });
};

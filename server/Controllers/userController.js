const userModel = require("../Models/userModel");

exports.register = (req, resp) => {
  let email = req.body.email;
  const password = req.body.password;
  const isAdmin = req.body.isAdmin;
  const fname = req.body.fname;
  const lname = req.body.lname;

  userModel
    .register(email, password, isAdmin, fname, lname)
    .then((res) => {
      resp.send(res);
    })
    .catch((err) => {
      resp.status(500).send("Error registering user.");
      //   resp.send(err);
    });
};

exports.login = (req, resp) => {
  let email = req.body.email;
  let password = req.body.password;
  userModel
    .login(email, password)
    .then((res) => {
      console.log("Successfully logged in");
      resp.send(res);
    })
    .catch((err) => {
      resp.status(500).send(err);
    });
};

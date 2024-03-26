const express = require("express");

const cors = require("cors");
// const mysql = require("mysql");

const app = express();

const userRoutes = require("./Routes/userRoutes");
const productRoutes = require("./Routes/productRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const shoppingCartRoutes = require("./Routes/shoppingCartRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/shoppingCart", shoppingCartRoutes);

const port = 3005;

app.listen(port, () => {
  // console.log(`${process.env.USER}`);
  console.log("Server is running on port ", port);
});

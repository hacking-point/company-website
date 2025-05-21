const express = require("express");
const app = express();
const admin = express();
const http = require("http");
const server = http.createServer(app);
const session = require("express-session");
const cors = require("cors");

const User = require("./routes/user");
const Product = require("./routes/product");

// Shared middleware
const sessionMiddleware = session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === "production" },
});

app.use(express.json());
app.use(cors());
app.use(sessionMiddleware);

admin.use(express.json());
admin.use(cors());
admin.use(sessionMiddleware);

app.use("/auth", User);
app.use("/product", Product);
app.use("/admin", admin);
admin.use("/auth", User);
admin.use("/product",Product)

app.get("/", (req, res) => {
  res.send(`Worker is running ${process.pid}`);
});

admin.get("/", (req, res) => {
  res.send(`Welcome to the Admin Panel! ${process.pid}`);
});

module.exports = server;

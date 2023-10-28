const express = require("express");
require("dotenv").config();
const router = require("./Routes");
const cookieParser = require("cookie-parser");
require("./db.conection");

const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use("/", router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

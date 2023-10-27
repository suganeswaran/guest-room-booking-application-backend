const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_DB_URL);
const connection = mongoose.connection;

connection.on("open", () => {
  console.log("Database Connected...");
});

module.exports = connection;

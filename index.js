const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.get('/ping', (req, res) => {
    res.send('Pong');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

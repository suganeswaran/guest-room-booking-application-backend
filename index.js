const express = require("express");

const app = express();

app.get('/ping', (req, res) => {
    res.send('Pong');
});

const PORT = 5555;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

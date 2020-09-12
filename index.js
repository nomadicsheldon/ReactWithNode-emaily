//jshint esversion:6

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({hi: "there"});
});

// ############################## port setting ##############################
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Listening for server started on port 5000');
});

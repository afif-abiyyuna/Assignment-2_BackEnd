const express = require('express');
const mongooseConnect = require('./configuration/mongoose');
const routes = require('./routes/index');

const app = express();
const port = 3000;

mongooseConnect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Apps run on insomnia http://localhost:${port}/`);
});

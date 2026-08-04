const express = require('express');
const app = express();
const homeRouter = require('./routes/home.router');
const inventoryRouter = require('./routes/inventory.router');

app.use(express.json());

app.use('/api/v1', homeRouter);
app.use('/api/v1', inventoryRouter);

module.exports = app; 
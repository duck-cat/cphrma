const express = require('express');
const app = express();
const homeRouter = require('./routes/home.router');
const inventoryRouter = require('./routes/inventory.router');
const approvalsRoute=require("./routes/approvals.router");
const configRoute=require("./routes/config.router");
const cors = require('cors');

app.use(cors());


app.use(express.json());

app.use('/api/v1', homeRouter);
app.use('/api/v1', inventoryRouter);
app.use('/api/v1', approvalsRoute);
app.use('/api/v1', configRoute);

module.exports = app; 
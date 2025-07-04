const express = require('express');
const logger = require('./middleware/logger');
const shortenerRoutes = require('./routes/shortenerRoutes');

const app = express();

app.use(express.json());
app.use(logger); // custom middleware
app.use('/', shortenerRoutes);

module.exports = app;
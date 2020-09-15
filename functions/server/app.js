const express = require('express');
const app = express();

// Loaders
require('./loaders')(app);

module.exports = app;

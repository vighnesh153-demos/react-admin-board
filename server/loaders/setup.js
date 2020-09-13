const express = require('express');
const cors = require('cors');

module.exports = function setup(app) {
  app.use(cors());
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
}

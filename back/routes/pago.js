var express = require('express');
var pagoController = require('../controllers/pagoController');
var auth = require('../middlewares/authenticate');

var app = express.Router();

app.post('/crear_pago_admin', auth.auth, pagoController.crear_pago_admin);

module.exports = app;
var express = require('express');
var configuracionController = require('../controllers/configuracionController');
var auth = require('../middlewares/authenticate');

var app = express.Router();

app.get('/obtener_configuracion_general_admin', auth.auth, configuracionController.obtener_configuracion_general_admin);
app.get('/verificar_token_admin', auth.auth, configuracionController.verificar_token_admin);

module.exports = app;
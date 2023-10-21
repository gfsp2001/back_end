var express = require('express');
var colaboradorController = require('../controllers/colaboradorController');
var auth = require('../middlewares/authenticate');

var app = express.Router();

app.post('/login_admin', colaboradorController.login_admin);
app.get('/listar_asesores_admin', auth.auth, colaboradorController.listar_asesores_admin);

module.exports = app;
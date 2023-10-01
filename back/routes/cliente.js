var express = require('express');
var clienteController = require('../controllers/clienteController');
var auth = require('../middlewares/authenticate');

var app = express.Router();

app.post('/registro_cliente_admin', auth.auth, clienteController.registro_cliente_admin);
app.get('/listar_clientes_filtro_admin/:filtro', auth.auth, clienteController.listar_clientes_filtro_admin);
app.get('/listar_clientes_ultimos30_admin', auth.auth, clienteController.listar_clientes_ultimos30_admin);

module.exports = app;

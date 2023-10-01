var express = require('express');
var productoController = require('../controllers/productoController');
var auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty');
var path = multiparty({ uploadDir: './uploads/productos' });
var app = express.Router();

app.post('/crear_producto_admin', [auth.auth, path], productoController.crear_producto_admin);
app.get('/listar_productos_admin', auth.auth, productoController.listar_productos_admin);
app.get('/obtener_datos_producto_admin/:id', auth.auth, productoController.obtener_datos_producto_admin);
app.put('/cambiar_estado_producto_admin/:id', auth.auth, productoController.cambiar_estado_producto_admin);

module.exports = app;
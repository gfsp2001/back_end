var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.port || 4201;

var app = express();
//ROUTES
var colaborador_routes = require('./routes/colaborador');
var cliente_routes = require('./routes/cliente');
var configuracion_routes = require('./routes/configuracion');
var producto_routes = require('./routes/producto');
var venta_routes = require('./routes/venta');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/negocio', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB connected successfully");
        app.listen(port, function () {
            console.log("Server is running on port: " + port);
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB: " + err);
    });

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', colaborador_routes);
app.use('/api', cliente_routes);
app.use('/api', configuracion_routes);
app.use('/api', producto_routes);
app.use('/api', venta_routes);

module.exports = app;

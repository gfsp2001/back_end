var express = require('express');
var kpiController = require('../controllers/kpiController');
var auth = require('../middlewares/authenticate');
var app = express.Router();

app.get('/kpi_pagos_mensuales', auth.auth, kpiController.kpi_pagos_mensuales);
app.get('/kpi_prospectos_mensuales', auth.auth, kpiController.kpi_prospectos_mensuales);
app.get('/kpi_prospectos_genero', auth.auth, kpiController.kpi_prospectos_genero);
app.get('/kpi_pagos_tipo/:year/:month', auth.auth, kpiController.kpi_pagos_tipo);
app.get('/kpi_categorias_pago/:year/:month', auth.auth, kpiController.kpi_categorias_pago);
app.get('/kpi_metodos_pago/:year/:month', auth.auth, kpiController.kpi_metodos_pago);

module.exports = app;
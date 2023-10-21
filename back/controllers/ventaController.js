var Venta = require('../models/venta');
var Producto = require('../models/producto');
var Variedad = require('../models/variedad');
var Pago = require('../models/pago');
var Venta_detalle = require('../models/venta_detalle');
var moment = require('moment');

const obtener_variedades_admin = async function (req, res) {

    if (req.user) {

        let variedades = await Variedad.find().populate('producto').sort({ titulo: 1 });

        res.status(200).send({ data: variedades });
    } else {
        res.status(404).send({ data: undefined, message: 'NoToken' });

    }

}

const enviar_ventas_hoy = async function (req, res) {

    if (req.user) {

        let today = new Date();
        let dia = today.getDate();
        let mes = today.getMonth() + 1;
        let year = today.getFullYear();

        let ventas = await Venta.find({ dia: dia, mes: mes, year: year }).populate('cliente').populate('asesor').sort({ createdAt: 1 });

        res.status(200).send({ data: ventas });

    } else {
        res.status(403).send({ data: undefined, message: 'NoToken' });
    }

}

const enviar_ventas_fechas = async function (req, res) {

    if (req.user) {

        let inicio = req.params['inicio'];
        let hasta = req.params['hasta'];
        let asesor = req.params['asesor'];
        let ventas = [];
        if (asesor == 'Todos') {
            ventas = await Venta.find({
                createdAt: {
                    $gte: new Date(inicio + 'T00:00:00'),
                    $lt: new Date(hasta + 'T23:59:59')
                }
            }).populate('cliente').populate('asesor').sort({ createdAt: 1 });
        } else {
            ventas = await Venta.find({
                createdAt: {
                    $gte: new Date(inicio + 'T00:00:00'),
                    $lt: new Date(hasta + 'T23:59:59')
                },
                asesor: asesor
            }).populate('cliente').populate('asesor').sort({ createdAt: 1 });
        }

        res.status(200).send({ data: ventas });

    } else {
        res.status(403).send({ data: undefined, message: 'NoToken' });
    }

}

module.exports = {
    obtener_variedades_admin,
    enviar_ventas_hoy,
    enviar_ventas_fechas
}
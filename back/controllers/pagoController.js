var Pago = require('../models/pago');

const crear_pago_admin = async function (req, res) {

    if (req.user) {

        let data = req.body;
        data.asesor = req.user.sub;
        data.estado = 'Aprobado';
        data.matricula_detalle = data.destino_pago;

        let pagos = await Pago.find().sort({ createdAt: -1 });

        if (pagos.length == 0) {
            data.correlativo = 1;
            let pago = await Pago.create(data);
            res.status(200).send({ data: pago });
        } else {
            let last_correlativo = pagos[0].correlativo;
            data.correlativo = last_correlativo + 1;
            let pago = await Pago.create(data);
            res.status(200).send({ data: pago });
        }

    } else {
        res.status(403).send({ data: undefined, message: 'NoToken' });
    }

}

module.exports = {
    crear_pago_admin
};
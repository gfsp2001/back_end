var Configuracion_general = require('../models/configuracion_general');

const obtener_configuracion_general_admin = async function (req, res) {

    if (req.user) {
        let configuracion_general = await Configuracion_general.findById({ _id: '640032547ea6380c242e52d1' });
        res.status(200).send({ data: configuracion_general });
    } else {
        res.status(404).send({ data: undefined, message: 'NoToken' });
    }
}

const verificar_token_admin = async function (req, res) {

    if (req.user) {
        res.status(200).send({ data: true });
    } else {
        res.status(403).send({ data: false, message: 'NoToken' });
    }
}

module.exports = {
    obtener_configuracion_general_admin,
    verificar_token_admin
}
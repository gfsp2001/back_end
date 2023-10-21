var Colaborador = require('../models/colaborador');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const login_admin = async function (req, res) {

    let data = req.body;
    var colaboradores = await Colaborador.find({ email: data.email });
    if (colaboradores.length >= 1) {
        if (colaboradores[0].estado) {
            bcrypt.compare(data.password, colaboradores[0].password, async function (err, check) {
                if (check) {
                    res.status(200).send({
                        data: colaboradores[0],
                        token: jwt.createToken(colaboradores[0])
                    });
                } else {
                    res.status(200).send({ data: undefined, message: 'La contraseña es incorrecta.' });
                }
            });
        } else {
            res.status(200).send({ data: undefined, message: 'Ya no tienes acceso al panel.' });
        }
    } else {
        res.status(200).send({ data: undefined, message: 'El correo electronico no existe.' });
    }
}

const listar_asesores_admin = async function (req, res) {

    if (req.user) {
        let colaboradores = await Colaborador.find({ rol: 'Asesor', estado: true }).select('_id fullnames nombres apellidos');
        res.status(200).send({ data: colaboradores });
    } else {
        res.status(403).send({ data: undefined, message: 'NoToken' });
    }
}

module.exports = {
    login_admin,
    listar_asesores_admin
}
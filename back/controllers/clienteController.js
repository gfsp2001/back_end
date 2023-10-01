var Cliente = require('../models/cliente');
var bcrypt = require('bcrypt-nodejs');

const registro_cliente_admin = async function (req, res) {
    if (req.user) {
        let data = req.body;
        try {

            var clientes = await Cliente.find({ email: data.email });

            bcrypt.hash('123456789', null, null, async function (err, hash) {
                if (err) {
                    res.status(500).send({ data: undefined, message: 'No se pudo generar la contraseña.' });
                } else {
                    if (clientes.length >= 1) {
                        res.status(500).send({ data: undefined, message: 'El correo electrónico ya existe.' });
                    } else {
                        data.fullnames = data.nombres + ' ' + data.apellidos;
                        data.password = hash;
                        let cliente = await Cliente.create(data);
                        enviar_correo_verificacion(cliente.email);
                        res.status(200).send({ data: cliente });
                    }
                }
            });

        } catch (error) {
            res.status(500).send({ data: undefined, message: 'Verifique los campos del formulario.' });
        }

    } else {
        res.status(403).send({ data: undefined, message: 'NoToken' });
    }
}

const listar_clientes_filtro_admin = async function (req, res) {
    if (req.user) {
        let filtro = req.params['filtro'];
        let clientes = await Cliente.find({
            $or: [
                { nombres: new RegExp(filtro, 'i') },
                { apellidos: new RegExp(filtro, 'i') },
                { n_doc: new RegExp(filtro, 'i') },
                { email: new RegExp(filtro, 'i') },
                { telefono: new RegExp(filtro, 'i') },
                { fullnames: new RegExp(filtro, 'i') },
            ]
        });
        res.status(200).send({ data: clientes });
    } else {
        res.status(403).send({ data: undefined, message: 'NoToken' });
    }
}

const listar_clientes_ultimos30_admin = async function (req, res) {

    if (req.user) {
        let clientes = await Cliente.find().select('_id fullnames nombres apellidos email telefono verify estado tipo').sort({ $natural: -1 }).limit(30);
        res.status(200).send({ data: clientes });
    } else {
        res.status(403).send({ data: undefined, message: 'NoToken' });
    }
}

module.exports = {
    registro_cliente_admin,
    listar_clientes_filtro_admin,
    listar_clientes_ultimos30_admin,
}
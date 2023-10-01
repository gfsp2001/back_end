var Producto = require('../models/producto');
var fs = require('fs');

const crear_producto_admin = async function (req, res) {

    if (req.user) {
        let data = req.body;
        try {
            let productos = await Producto.find({ titulo: data.titulo });
            if (productos.length >= 1) {
                var img_path = req.files.portada.path;
                var str_path = img_path.split('\\');
                var img_delete = str_path[2];
                var path_img_delete = './uploads/productos/' + img_delete;
                fs.unlink(path_img_delete, function (err) {
                    if (err) throw new Error('No se pudo eliminar la imagen- ' + err);
                });
                res.status(200).send({ data: undefined, message: 'Ya existe un producto con ese titulo.' });

            } else {
                var img_path = req.files.portada.path;
                var str_path = img_path.split('\\');
                var name = str_path[2];

                data.slug = data.titulo.trim().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                data.portada = name;
                data.stock = 0;
                data.precio = 0;
                let reg = await Producto.create(data);
                res.status(200).send({ data: reg });
            }

        } catch (error) {
            console.log(error);
            res.status(403).send({ data: undefined, message: 'Ocurrio un problema al registrar el producto.' });
        }
    } else {
        res.status(404).send({ data: undefined, message: 'NoToken' });

    }

}

const listar_productos_admin = async function (req, res) {

    if (req.user) {

        let productos = await Producto.find().sort({ createdAt: -1 });
        res.status(200).send({ data: productos });

    } else {
        res.status(404).send({ data: undefined, message: 'NoToken' });

    }

}

const obtener_datos_producto_admin = async function (req, res) {

    if (req.user) {
        let id = req.params.id;
        try {
            let producto = await Producto.findById({ _id: id });
            res.status(200).send({ data: producto });

        } catch (error) {
            res.status(200).send({ data: undefined });
        }

    } else {
        res.status(404).send({ data: undefined, message: 'NoToken' });

    }
}

const cambiar_estado_producto_admin = async function (req, res) {

    if (req.user) {
        let id = req.params['id'];
        let data = req.body;
        let nuevo_estado;

        if (data.estado) {
            nuevo_estado = false;
        } else if (!data.estado) {
            nuevo_estado = true;
        }

        let producto = await Producto.findByIdAndUpdate({ _id: id }, { estado: nuevo_estado });
        res.status(200).send({ data: producto });

    } else {
        res.status(403).send({ data: undefined, message: 'NoToken' });
    }
}


module.exports = {
    crear_producto_admin,
    listar_productos_admin,
    obtener_datos_producto_admin,
    cambiar_estado_producto_admin,
}

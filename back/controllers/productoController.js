var Producto = require('../models/producto');
var Variedad = require('../models/variedad');
var Inventario = require('../models/inventario');
var Venta_detalle = require('../models/venta_detalle');

var fs = require('fs');
var path = require('path');

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

const actualizar_producto_admin = async function (req, res) {
    if (req.user) {

        let id = req.params['id'];
        let data = req.body;
        try {

            let productos = await Producto.find({ titulo: data.titulo });

            if (productos.length >= 1) {
                if (productos[0]._id == id) {

                    if (req.files) {
                        // SI HAY IMAGEN
                        var img_delete = productos[0].portada;
                        var path_img_delete = './uploads/productos/' + img_delete;
                        fs.unlink(path_img_delete, function (err) {
                            if (err) throw new Error('No se pudo eliminar la imagen- ' + err);
                        });

                        var img_path = req.files.portada.path;
                        var str_path = img_path.split('\\');
                        var name = str_path[2];

                        data.slug = data.titulo.trim().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                        data.portada = name;

                        let reg = await Producto.findByIdAndUpdate({ _id: id }, {
                            titulo: data.titulo,
                            slug: data.slug,
                            descripcion: data.descripcion,
                            portada: data.portada,
                            categoria: data.categoria,
                            tipo_variedad: data.tipo_variedad,
                            tipo: data.tipo,
                        });
                        res.status(200).send({ data: reg });
                    } else {
                        //NO HAY IMAGEN
                        data.slug = data.titulo.trim().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                        let reg = await Producto.findByIdAndUpdate({ _id: id }, {
                            titulo: data.titulo,
                            slug: data.slug,
                            descripcion: data.descripcion,
                            categoria: data.categoria,
                            tipo_variedad: data.tipo_variedad,
                            tipo: data.tipo,
                        });
                        res.status(200).send({ data: reg });
                    }

                } else {
                    res.status(200).send({ data: undefined, message: 'Ya existe un producto con ese titulo.' });
                }

            } else {
                if (req.files) {
                    // SI HAY IMAGEN
                    var img_delete = productos[0].portada;
                    var path_img_delete = './uploads/productos/' + img_delete;
                    fs.unlink(path_img_delete, function (err) {
                        if (err) throw new Error('No se pudo eliminar la imagen- ' + err);
                    });

                    var img_path = req.files.portada.path;
                    var str_path = img_path.split('\\');
                    var name = str_path[2];

                    data.slug = data.titulo.trim().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                    data.portada = name;

                    let reg = await Producto.findByIdAndUpdate({ _id: id }, {
                        titulo: data.titulo,
                        slug: data.slug,
                        descripcion: data.descripcion,
                        portada: data.portada,
                        categoria: data.categoria,
                        tipo_variedad: data.tipo_variedad,
                        tipo: data.tipo,
                    });
                    res.status(200).send({ data: reg });
                } else {

                    //NO HAY IMAGEN
                    data.slug = data.titulo.trim().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                    let reg = await Producto.findByIdAndUpdate({ _id: id }, {
                        titulo: data.titulo,
                        slug: data.slug,
                        descripcion: data.descripcion,
                        categoria: data.categoria,
                        tipo_variedad: data.tipo_variedad,
                        tipo: data.tipo,
                    });
                    res.status(200).send({ data: reg });
                }
            }

        } catch (error) {
            console.log(error);
            res.status(403).send({ data: undefined, message: 'Ocurrio un problema al actualizar el producto.' });
        }


    } else {

        res.status(403).send({ data: undefined, message: 'NoToken' });
    }
}

const agregar_variedad_producto_admin = async function (req, res) {

    if (req.user) {

        let data = req.body;

        let variedad = await Variedad.create(data);
        res.status(200).send({ data: variedad });

    } else {
        res.status(404).send({ data: undefined, message: 'NoToken' });

    }
}

const obtener_variedades_producto_admin = async function (req, res) {

    if (req.user) {
        try {
            let id = req.params.id;
            let variedades = await Variedad.find({ producto: id });
            res.status(200).send({ data: variedades });
        } catch (error) {
            console.log(error);
            res.status(200).send({ data: undefined });
        }


    } else {
        res.status(404).send({ data: undefined, message: 'NoToken' });

    }
}

const eliminar_variedad_producto_admin = async function (req, res) {

    if (req.user) {
        try {
            let id = req.params.id;
            let variedad = await Variedad.findById({ _id: id });
            if (variedad.stock == 0) {
                await Variedad.findByIdAndRemove({ _id: id });
                res.status(200).send({ data: true });
            } else {
                res.status(200).send({ data: undefined, message: 'No puede eliminar la variedad.' });
            }

        } catch (error) {
            console.log(error);
            res.status(200).send({ data: undefined });
        }

    } else {
        res.status(404).send({ data: undefined, message: 'NoToken' });

    }
}

const get_image_producto = async function (req, res) {
    var img = req.params['img'];
    fs.stat('./uploads/productos/' + img, function (err) {
        if (!err) {
            let path_img = './uploads/productos/' + img;
            res.status(200).sendFile(path.resolve(path_img));
        } else {
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));

        }
    });
}

const listar_productos_titulo_admin = async function (req, res) {

    if (req.user) {

        let productos = await Producto.find({ estado: true }).select('_id titulo').sort({ createdAt: -1 });
        res.status(200).send({ data: productos });

    } else {
        res.status(404).send({ data: undefined, message: 'NoToken' });

    }

}

const registrar_inventario_admin = async function (req, res) {

    if (req.user) {

        let data = req.body;
        //actualizar stock general
        let inventario = await Inventario.create(data);
        let producto = await Producto.findById({ _id: data.producto });
        let nuevo_stock_producto = producto.stock + data.cantidad;
        await Producto.findByIdAndUpdate({ _id: data.producto }, {
            stock: nuevo_stock_producto
        })
        //actualizar stock variedad
        let variedad = await Variedad.findById({ _id: data.variedad });
        let nuevo_stock_variedad = variedad.stock + data.cantidad;
        await Variedad.findByIdAndUpdate({ _id: data.variedad }, {
            stock: nuevo_stock_variedad
        })
        // calcular margen de ganancia
        let margen_ganancia = data.ganancia_producto;
        let monto_ganancia = Math.round((data.costo_unidad * margen_ganancia) / 100);
        let nuevo_precio_producto = data.costo_unidad + monto_ganancia;

        if (producto.precio == 0) {
            await Producto.findByIdAndUpdate({ _id: data.producto }, { precio: nuevo_precio_producto });
        } else {
            let ganancia_actual = producto.stock * data.costo_unidad;
            let ganancia_nueva = data.cantidad * nuevo_precio_producto;
            let total_stock = producto.stock + data.cantidad;
            let total_ganancia = ganancia_actual + ganancia_nueva;
            let nuevo_precio = Math.round(total_ganancia / total_stock);
            await Producto.findByIdAndUpdate({ _id: data.producto }, { precio: nuevo_precio });
        }
        res.status(200).send({ data: inventario });

    } else {
        res.status(404).send({ data: undefined, message: 'NoToken' });
    }

}

const listar_inventario_admin = async function (req, res) {

    if (req.user) {

        let inventario = await Inventario.find().populate('producto').populate('variedad').sort({ createdAt: -1 });
        res.status(200).send({ data: inventario });

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

const obtener_inventario_admin = async function (req, res) {

    if (req.user) {
        try {
            //gte: greater than equal -> mayor igual q 
            let variedades = await Variedad.find({ stock: { $gte: 1 } }).select('_id sku titulo stock').populate({
                path: 'producto',
                select: '_id titulo categoria precio tipo'
            });
            res.status(200).send({ data: variedades });

        } catch (error) {
            res.status(200).send({ data: undefined });
        }


    } else {
        res.status(404).send({ data: undefined, message: 'NoToken' });

    }
}

const obtener_inventario_entrada_admin = async function (req, res) {
    if (req.user) {
        try {
            let year = req.params.year;
            let month = req.params.month;

            let inventario = await Inventario.find()
                .select('_id cantidad costo_unidad createdAt')
                .populate({
                    path: 'producto',
                    select: '_id titulo'
                })
                .populate({
                    path: 'variedad',
                    select: '_id sku titulo'
                })
                .exec();

            let inventarioArray = inventario.filter(element => {
                let date = new Date(element.createdAt);
                let _year = date.getFullYear();
                let _month = date.getMonth() + 1;
                return year == _year && month == _month;
            });

            res.status(200).send({ data: inventarioArray });
        } catch (error) {
            console.error(error);
            res.status(500).send({ data: undefined });
        }
    } else {
        res.status(404).send({ data: undefined, message: 'NoToken' });
    }
};

const obtener_inventario_salida_admin = async function (req, res) {

    if (req.user) {
        try {
            let year = req.params.year;
            let month = req.params.month;

            let inventario = await Venta_detalle.find()
                .select('venta cantidad precio createdAt')
                .populate({
                    path: 'producto',
                    select: '_id titulo'
                }).populate({
                    path: 'variedad',
                    select: '_id sku titulo'
                }).exec();

            let inventarioArray = inventario.filter(element => {
                let date = new Date(element.createdAt);
                let _year = date.getFullYear();
                let _month = date.getMonth() + 1;
                return year == _year && month == _month
            });

            res.status(200).send({ data: inventarioArray });
        } catch (error) {
            res.status(200).send({ data: undefined });
        }

    } else {
        res.status(404).send({ data: undefined, message: 'NoToken' });

    }
}

module.exports = {
    crear_producto_admin,
    listar_productos_admin,
    get_image_producto,
    obtener_datos_producto_admin,
    actualizar_producto_admin,
    agregar_variedad_producto_admin,
    obtener_variedades_producto_admin,
    eliminar_variedad_producto_admin,
    listar_productos_titulo_admin,
    registrar_inventario_admin,
    listar_inventario_admin,
    cambiar_estado_producto_admin,
    obtener_inventario_admin,
    obtener_inventario_entrada_admin,
    obtener_inventario_salida_admin
}

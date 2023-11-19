var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VariedadSchema = Schema({
    producto: { type: Schema.ObjectId, ref: 'producto', required: true },
    titulo: { type: String, required: true },
    stockMinimo: { type: Number, required: true },
    sku: { type: String, required: true },
    ubicacion: { type: String, required: true },
    stock: { type: Number, default: 0, required: true },

    createdAt: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('variedad', VariedadSchema);
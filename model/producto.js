var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
var Categoria = mongoose.model('Categoria');

var productoSchema = new mongoose.Schema({
	idProducto: String,
	desProducto: String,
	costoUnitario: Number,
	stock: Number,
	precioUnitario: Number,
	urlImagen: String,
	fecCreacion: { type: Date, default: Date.now },
	fecModificacion: { type: Date, default: Date.now },
	categoria: {type: mongoose.Schema.ObjectId, ref: "Categoria"},
	usuario: {type: mongoose.Schema.ObjectId, ref: "Usuario"},
	usuarioMod: {type: mongoose.Schema.ObjectId, ref: "Usuario"},
	esCarrusel: Boolean,
	seSolicita: Boolean,
	esActivo: Boolean
});

module.exports = mongoose.model('Producto', productoSchema);
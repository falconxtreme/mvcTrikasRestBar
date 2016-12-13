var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
var Producto = mongoose.model('Producto');
var Pedido = mongoose.model('Pedido');

var detPedidoSchema = new mongoose.Schema({
	idProducto: String,
	desProducto: String,
	precioUnitario: Number,
	cantidad: Number,
	precioSubtotal: Number,
	estado: String,
	fecCreacion: { type: Date, default: Date.now },
	fecModificacion: { type: Date, default: Date.now },
	pedido: {type: mongoose.Schema.ObjectId, ref: "Pedido"},
	usuario: {type: mongoose.Schema.ObjectId, ref: "Usuario"},
	usuarioMod: {type: mongoose.Schema.ObjectId, ref: "Usuario"},
	producto: {type: mongoose.Schema.ObjectId, ref: "Producto"}
});

module.exports = mongoose.model('DetPedido', detPedidoSchema);
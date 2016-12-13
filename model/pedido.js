var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

var pedidoSchema = new mongoose.Schema({
	numPedido: Number,
	idPedido: String,
	estado: String,
	cantProd: Number,
	precioTotalSIGV: Number,
	IGV: Number,
	precioTotalCIGV: Number,
	fecCreacion: { type: Date, default: Date.now },
	fecModificacion: { type: Date, default: Date.now },
	usuario: {type: mongoose.Schema.ObjectId, ref: "Usuario"},
	usuarioMod: {type: mongoose.Schema.ObjectId, ref: "Usuario"}
});

module.exports = mongoose.model('Pedido', pedidoSchema);
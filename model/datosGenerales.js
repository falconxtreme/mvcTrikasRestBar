var mongoose = require('mongoose');

var datosGeneralesSchema = new mongoose.Schema({
	igv: Number,
	tipoCambio: Number,
	formatoPedido: String,
	fecCreacion: { type: Date, default: Date.now },
	fecModificacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DatosGenerales', datosGeneralesSchema);
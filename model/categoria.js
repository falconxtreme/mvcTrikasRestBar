var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

var categoriaSchema = new mongoose.Schema({
	idCategoria: String,
	desCategoria: String,
	fecCreacion: { type: Date, default: Date.now() },
	fecModificacion: { type: Date, default: Date.now() },
	usuario: {type: mongoose.Schema.ObjectId, ref: "Usuario"},
	esActivo: Boolean
});

module.exports = mongoose.model('Categoria', categoriaSchema);
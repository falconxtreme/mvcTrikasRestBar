var mongoose = require('mongoose');

var rolSchema = new mongoose.Schema({
	idRol: String,
	desRol: String,
	fecCreacion: { type: Date, default: Date.now() },
	fecModificacion: { type: Date, default: Date.now() },
	esActivo: Boolean
});

module.exports = mongoose.model('Rol', rolSchema);
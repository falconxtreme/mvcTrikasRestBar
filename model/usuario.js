var mongoose = require('mongoose');
var Rol = mongoose.model('Rol');

var usuarioSchema = new mongoose.Schema({
	correo: String,
	contrasenha: String,
	nick: String,
	token: String,
	nombre: String,
	dni: String,
	esActivo: Boolean,
	fecNacimiento: { type: Date, default: Date.now },
	fecCreacion: { type: Date, default: Date.now },
	fecModificacion: { type: Date, default: Date.now },
	rol: {type: mongoose.Schema.ObjectId, ref: "Rol"}
});

module.exports = mongoose.model('Usuario', usuarioSchema);
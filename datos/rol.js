var rolModel = require('../model/rol'); //modelo mongoose de categoria

var mongoose = require('mongoose'); //mongo connection

//creamos el objeto daProducto que permitirá interactuar con la bd Mongoose
var daRol = {};

daRol.getRoles = function (){
	rolModel.find({}, function (err, roles) {
		if (err) {
			return console.error(err);
		} else {
			return roles;
		}
	});
}

daRol.getRolCliente = function (fnIn){
	console.log("ingresa a getRolCliente-----");
	var rolCliente = "Cliente";
	rolModel.find({
		desRol: rolCliente
	}, function (err, roles) {
		if (err) {
			console.log("error getRolCliente-----");
			console.error(err);
			fnIn(err, null);
		} else {
			console.log("devuelve rol cliente-----");
			if(roles && roles.length>0){
				console.log("id rol cliente-----" + roles[0]._id);
				fnIn(null, roles[0]._id);
			}
		}
	});
}

daRol.addRol = function(rolIn, fnIn){
	rolModel.create({
	    idRol : rolIn.idRol,
	    desRol : rolIn.desRol,
	    fecCreacion : rolIn.fecCreacion,
	    fecModificacion : rolIn.fecModificacion,
	    esActivo: rolIn.esActivo
    }, function (err, rol) {
		if (err) {
		  fnIn("Hubo un problema agregando la información a la base de datos.");
		} else {
		  //Categoria has been created
		  fnIn("El rol ha sido creado correctamente.");
		}
    })
}

module.exports = daRol;
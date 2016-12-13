var usuarioModel = require('../model/usuario'); //modelo mongoose de usuario
var mongoose = require('mongoose'); //mongo connection

//creamos el objeto daUsuario que permitirá interactuar con la bd Mongoose
var daUsuario = {};

daUsuario.getUsuarios = function (){
	usuarioModel.find({}, function (err, usuarios) {
		if (err) {
			return console.error(err);
		} else {
			return usuarios;
		}
	});
}

daUsuario.addUsuario = function(usuarioIn, fnIn){
	usuarioModel.find({
		correo: usuarioIn.correo.toUpperCase()
	}, function (err, usuarios) {
		if (err) {
			console.error(err);
			fnIn(err);
		} else {
			if(usuarios && usuarios.length>0){
				fnIn("Ya existe una cuenta creada con el mismo correo.")
			} else{
				usuarioModel.create({
				    correo : usuarioIn.correo.toUpperCase(),
				    contrasenha : usuarioIn.contrasenha,
				    nick : usuarioIn.nick,
				    token : usuarioIn.token,
				    nombre : usuarioIn.nombre,
				    dni: usuarioIn.dni,
				    esActivo: usuarioIn.esActivo,
				    fecNacimiento: usuarioIn.fecNacimiento,
				    fecCreacion: usuarioIn.fecCreacion,
				    fecModificacion: usuarioIn.fecModificacion,
				    rol: usuarioIn.rol
			    }, function (err, usuario) {
					if (err) {
					  fnIn("Hubo un problema agregando la información a la base de datos.",null);
					} else {
					  //Categoria has been created
					  if(usuario){
					  	usuario.contrasenha="";
					  	usuario.token="";
					  	usuario.rol="";
					  }
					  fnIn(null, usuario);
					}
			    });
			}
		}
	});
}

daUsuario.activarCuenta = function(usuarioId, fnIn){
	usuarioModel.findById(usuarioId, function (err, usuario) {
        //update it
        usuario.update({
            esActivo : true
        }, function (err, usuario) {
			if (err) {
				console.log(err);
		  		fnIn("Hubo un problema activando la cuenta. Comuníquese con nosotros para poder apoyarlo.",null);
			} 
			else {
				fnIn(null, usuario);
			}
        })
    });
}

daUsuario.autenticarCorreo = function(usuarioIn, fnIn){
	usuarioModel.find({
		correo: usuarioIn.correo.toUpperCase(),
		contrasenha : usuarioIn.contrasenha
	}, function (err, usuarios) {
		if (err) {
			console.error(err);
			fnIn(err);
		} else {
			if(usuarios){
				if (usuarios.length==1){
				  	usuarios[0]._id="";
				  	usuarios[0].contrasenha="";
				  	usuarios[0].token="";
				  	usuarios[0].rol="";
				  	if(!usuarios[0].activo){
				  		fnIn("La cuenta ingresada aún no ha sido activada.")
				  	}else{
				  		fnIn(usuarios[0]);	
				  	}
				} else if(usuarios.length>0){
					fnIn("Existe más de una coincidencia con la información ingresada.")
				}else{
					fnIn("Datos Incorrectos, por favor vuelva a intentarlo.")
				}
			} else{
				fnIn("Datos Incorrectos, por favor vuelva a intentarlo.")
			}
		}
	});
}

daUsuario.getIdUsuario = function (correo, fnIn){
	console.log("ingresa a getIdUsuario-----: " + correo);
	usuarioModel.find({
		correo: correo.toUpperCase()
	}, function (err, usuarios) {
		if (err) {
			console.log("error getIdUsuario-----");
			console.error(err);
			fnIn(err, null);
		} else {
			console.log("devuelve getIdUsuario-----");
			console.log(usuarios);
			if(usuarios && usuarios.length>0){
				console.log("id usuario-----" + usuarios[0]._id);
				fnIn(null, usuarios[0]._id);
			}else{
				fnIn("No es Administrador de la Aplicación", null);
			}
		}
	});
}

module.exports = daUsuario;
var categoriaModel = require('../model/categoria'); //modelo mongoose de categoria

var mongoose = require('mongoose'); //mongo connection

//creamos el objeto daProducto que permitirá interactuar con la bd Mongoose
var daCategoria = {};

daCategoria.getCategorias = function (fnIn){
	categoriaModel.find({}, function (err, categorias) {
		if (err) {
			console.error(err);
			fnIn(err,null);
		} else {
			fnIn(null,categorias);
		}
	});
}

daCategoria.addCategoria = function(categoriaIn, fnIn){
	categoriaModel.create({
	    idCategoria : categoriaIn.idCategoria,
	    desCategoria : categoriaIn.desCategoria,
	    fecCreacion : categoriaIn.fecCreacion,
	    fecModificacion : categoriaIn.fecModificacion,
	    usuario: categoriaIn.usuario,
	    esActivo: categoriaIn.esActivo
    }, function (err, categoria) {
		if (err) {
		  fnIn("Hubo un problema agregando la información a la base de datos. " + err);
		} else {
		  //Categoria has been created
		  fnIn(categoria);
		}
    })
}

daCategoria.updCategoria = function(categoriaIn, fnIn){
	categoriaModel.findById(categoriaIn._id, function (err, categoria) {
        //update it
        categoria.update({
            idCategoria : categoriaIn.idCategoria,
            desCategoria : categoriaIn.desCategoria,
            fecModificacion : categoriaIn.fecModificacion,
	    	usuario: categoriaIn.usuario,
            esActivo : categoriaIn.esActivo
        }, function (err, categoria) {
			if (err) {
		  		fnIn("Hubo un problema actualizando la información de la base de datos. " + err);
			} 
			else {
				fnIn(categoria);
			}
        })
    });
}

daCategoria.delCategoria = function(id, fnIn){
	categoriaModel.findById(id, function (err, categoria) {
        if (err) {
            return console.error(err);
        } else {
        	if(categoria){
        		//remove it from Mongo
	            categoria.remove(function (err, categoria) {
	                if (err) {
	                    console.error(err);
	                    fnIn("Hubo un problema eliminando la información de la base de datos.");
	                } else {
	                    //Returning success messages saying it was deleted
	                    console.log('DELETE removing ID: ' + categoria._id);
	                    fnIn(categoria);
	                }
	            });
        	}else{
        		fnIn("No se encontró la categoría en la base de Datos.");
        	}
        }
    });
}

daCategoria.getCategoriasCatalogo = function (fnIn){
	categoriaModel.find({ esActivo: true }, function (err, categorias) {
		if (err) {
			console.error(err);
			fnIn(err,null);
		} else {
			fnIn(null,categorias);
		}
	});
}

module.exports = daCategoria;
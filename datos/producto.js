var productoModel = require('../model/producto'); //modelo mongoose de producto
var categoriaModel = require('../model/categoria'); //modelo mongoose de categoria
//var usuarioModel = require('../model/usuario'); //modelo mongoose de usuario

var mongoose = require('mongoose'); //mongo connection
var ObjectId = require('mongoose').Types.ObjectId;

//creamos el objeto daProducto que permitirá interactuar con la bd Mongoose
var daProducto = {};

daProducto.getProductos = function (fnIn){
	productoModel.find({}, function (err, productos) {
		if(err){
			console.error(err);
			fnIn(err, null);
		}else{
			if(productos){
				categoriaModel.populate(productos,{path: "categoria"}, function (err, productos) {
					if (err) {
						console.error(err);
						fnIn(err, null);
					} else {
						fnIn(null, productos);
					}	
				});
			}else{
				fnIn("No existen productos", null);
			}
		}
		
	});
}

daProducto.addProducto = function(productoIn, fnIn){
	productoModel.create({
	    idProducto : productoIn.idProducto,
	    desProducto : productoIn.desProducto,
	    costoUnitario : productoIn.costoUnitario,
	    stock : productoIn.stock,
	    precioUnitario : productoIn.precioUnitario,
	    urlImagen : productoIn.urlImagen,
	    fecCreacion : productoIn.fecCreacion,
	    fecModificacion : productoIn.fecModificacion,
	    categoria: productoIn.categoria,
	    usuario: productoIn.usuario,
	    usuarioMod: productoIn.usuarioMod,
	    esCarrusel: productoIn.esCarrusel,
	    seSolicita: productoIn.seSolicita,
	    esActivo: productoIn.esActivo
    }, function (err, producto) {
		if (err) {
		  	fnIn("Hubo un problema agregando la información a la base de datos. " + err);
		} else {
			//Producto has been created
			if(producto){
				categoriaModel.populate(producto,{path: "categoria"}, function (err, producto) {
					if (err) {
						console.error(err);
						fnIn(err);
					} else {
						fnIn(producto);
					}	
				});
			}else{
				fnIn("No se pudo registrar el producto por un problema de datos en BD.");
			}
		}
    })
}

daProducto.updProducto = function(productoIn, fnIn){
	productoModel.findById(productoIn._id, function (err, producto) {
        //update it
        producto.update({
            idProducto : productoIn.idProducto,
		    desProducto : productoIn.desProducto,
		    costoUnitario : productoIn.costoUnitario,
		    stock : productoIn.stock,
		    precioUnitario : productoIn.precioUnitario,
		    urlImagen : productoIn.urlImagen,
		    fecModificacion : productoIn.fecModificacion,
		    categoria: productoIn.categoria,
		    usuarioMod: productoIn.usuarioMod,
		    esCarrusel: productoIn.esCarrusel,
	    	seSolicita: productoIn.seSolicita,
		    esActivo: productoIn.esActivo
        }, function (err, producto) {
			if (err) {
		  		fnIn("Hubo un problema actualizando la información de la base de datos. " + err);
			} 
			else {
				fnIn(producto);
			}
        })
    });
}

daProducto.delProducto = function(id, fnIn){
	productoModel.findById(id, function (err, producto) {
        if (err) {
            return console.error(err);
        } else {
        	if(producto){
        		//remove it from Mongo
	            producto.remove(function (err, producto) {
	                if (err) {
	                    console.error(err);
	                    fnIn("Hubo un problema eliminando la información de la base de datos.");
	                } else {
	                    //Returning success messages saying it was deleted
	                    console.log('DELETE removing ID: ' + producto._id);
	                    fnIn(producto);
	                }
	            });
        	}else{
        		fnIn("No se encontró el producto en la base de Datos.");
        	}
        }
    });
}

daProducto.getProductosCarrusel = function (fnIn){
	productoModel.find({esCarrusel: true, esActivo: true}, function (err, productos) {
		if(err){
			console.error(err);
			fnIn(err, null);
		}else{
			if(productos){
				fnIn(null, productos);
			}else{
				fnIn("No existen productos", null);
			}
		}
		
	});
}

daProducto.getProductosCatalogo = function (fnIn){
	productoModel.find({seSolicita: true, esActivo: true}, function (err, productos) {
		if(err){
			console.error(err);
			fnIn(err, null);
		}else{
			if(productos){
				fnIn(null, productos);
			}else{
				fnIn("No existen productos", null);
			}
		}
		
	});
}

daProducto.getProductosCategoria = function (idCat, fnIn){
	productoModel.find({categoria: new ObjectId(idCat)}, function (err, productos) {
		if(err){
			console.error(err);
			fnIn(err, null);
		}else{
			if(productos){
				fnIn(null, productos);
			}else{
				fnIn("No existen productos", null);
			}
		}
		
	});
}

daProducto.getProductosBusqueda = function (busqueda, fnIn){
	productoModel.find({"idProducto":{$regex: ".*" + busqueda, $options:"i"}},
		{idProducto:1, desProducto:2, precioUnitario:3, urlImagen: 4}, function (err, productos) {
		if(err){
			console.error(err);
			fnIn(err, null);
		}else{
			if(productos){
				fnIn(null, productos);
			}else{
				fnIn("No existen productos", null);
			}
		}
		
	});
}

module.exports = daProducto;
var pedidoModel = require('../model/pedido'); //modelo mongoose de producto

var mongoose = require('mongoose'); //mongo connection

//creamos el objeto daProducto que permitirá interactuar con la bd Mongoose
var daPedido = {};

daPedido.getPedidos = function (fnIn){
	pedidoModel.find({}, function (err, pedidos) {
		if(err){
			console.error(err);
			fnIn(err, null);
		}else{
			if(pedidos){
				fnIn(null, pedidos);
			}else{
				fnIn("No existen pedidos", null);
			}
		}
		
	});
}

daPedido.addPedido = function(pedidoIn, fnIn){
	pedidoModel.create({
	    numPedido : pedidoIn.numPedido,
	    idPedido : pedidoIn.idPedido,
	    estado : pedidoIn.estado,
	    cantProd : pedidoIn.cantProd,
	    precioTotalSIGV : pedidoIn.precioTotalSIGV,
	    IGV : pedidoIn.IGV,
	    precioTotalCIGV : pedidoIn.precioTotalCIGV,
	    fecCreacion : pedidoIn.fecCreacion,
	    fecModificacion : pedidoIn.fecModificacion,
	    usuario: pedidoIn.usuario,
	    usuarioMod: pedidoIn.usuarioMod
    }, function (err, pedido) {
		fnIn(err,pedido);
    })
}

daPedido.getNumPedidos = function(fnIn){
	pedidoModel.count({}, function(err, count){
		fnIn(err,count);
	});
}

module.exports = daPedido;
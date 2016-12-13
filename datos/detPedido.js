var detPedidoModel = require('../model/detPedido'); //modelo mongoose de producto
var mongoose = require('mongoose'); //mongo connection

//creamos el objeto daProducto que permitirá interactuar con la bd Mongoose
var daDetPedido = {};

daDetPedido.getPedidos = function (idPedido, fnIn){
	detPedidoModel.find({pedido: idPedido}, function (err, detPedidos) {
		if(err){
			console.error(err);
			fnIn(err, null);
		}else{
			if(detPedidos){
				fnIn(null, detPedidos);
			}else{
				fnIn("No existe detalle alguno del pedido buscado", null);
			}
		}
	});
}

daDetPedido.addDetPedido = function(detPedidoIn, fnIn){
	console.log("******** inicio add det pedido ***********");
	console.log(detPedidoIn);
	console.log("******** fin add det pedido ***********");
	detPedidoModel.create({
	    idProducto : detPedidoIn.idProducto,
	    desProducto : detPedidoIn.desProducto,
	    precioUnitario : detPedidoIn.precioUnitario,
	    cantidad : detPedidoIn.cantidad,
	    precioSubtotal : detPedidoIn.precioSubtotal,
	    estado : detPedidoIn.estado,
	    fecCreacion : detPedidoIn.fecCreacion,
	    fecModificacion : detPedidoIn.fecModificacion,
	    pedido: detPedidoIn.pedido,
	    usuario: detPedidoIn.usuario,
	    usuarioMod: detPedidoIn.usuarioMod,
	    producto: detPedidoIn.producto
    }, function (err, detPedido) {
		if (err) {
		  	fnIn("Hubo un problema agregando la información a la base de datos. " + err,null);
		} else {
			//detPedido has been created
			if(detPedido){
				fnIn(null, detPedido);
			}else{
				fnIn("No se pudo registrar el detalle de pedido por un problema de datos en BD.", null);
			}
		}
    })
}

module.exports = daDetPedido;
var express = require('express');
var router = express.Router();
var daPedido = require('../datos/pedido'), //mongo connection
    daDetPedido = require('../datos/detPedido'), //mongo connection
    daUsuario = require('../datos/usuario'),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

/*Get Car Page*/
router.get('/', function(req, res, next){
	res.render('carrito/index', 
		{ 
			title: 'Carrito Trikas' , 
			"home": '', 
			"catalogo": '', 
			"carrito": 'active', 
			"login": ''
		});
});

//POST a new Pedido
router.post('/', function(req, res, next) {
    console.log('post  oPedido: ');
    console.log("###############inicio  prods body##############");
    console.log(req.body.productos);
    console.log("###############fin   prods body##############");
    // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
    var oPedido = {};
    	oPedido.numPedido = 0;
    	oPedido.idPedido = "";
        oPedido.productos = JSON.parse(req.body.productos);
        oPedido.estado = "PENDIENTE";
        oPedido.cantProd = req.body.cantProd;
        oPedido.precioTotalCIGV = req.body.totalAPagar;
        oPedido.precioTotalSIGV = oPedido.precioTotalCIGV/1.18;
        oPedido.IGV = oPedido.precioTotalCIGV - oPedido.precioTotalSIGV;
        oPedido.usuario = req.body.correo;
        oPedido.fecCreacion = Date.now();
        oPedido.fecModificacion = Date.now();
    console.log('post  oPedido: getIdUsuario');
    daUsuario.getIdUsuario(oPedido.usuario, function(err, idUsuario){
        //call the create function for our database
        console.log("idUsuario: " + idUsuario);
        if(err){
            res.json(err);
        }else{
            oPedido.usuario= idUsuario;
            oPedido.usuarioMod= idUsuario;
            console.log(oPedido);
            daPedido.getNumPedidos(function(err, numPedidos){
            	if(err){
            		res.json(err);
            	}else{
            		oPedido.numPedido=numPedidos;
            		oPedido.idPedido=numPedidos;
            		daPedido.addPedido(oPedido, function(err, pedido){
            			if(err){
            				res.json(err);
            			}else{
                            console.log("-------------inicio pedido devuelto------------");
                            console.log(pedido);
                            console.log("-------------fin pedido devuelto------------");
            				oPedido.pedido = pedido;
            				var oDetPedido={};
            				var numPedidosProcesados=0;
            				var errProcPedidos="";
                            var nProd = parseInt(oPedido.cantProd);
                            console.log("nprod: " + nProd + "--PRODS: " + oPedido.productos.length);
            				for(var i=0; i<nProd; i++){
            					oDetPedido.pedido = oPedido.pedido._id;
            					oDetPedido.idProducto = oPedido.productos[i].idProducto;
            					oDetPedido.desProducto = oPedido.productos[i].desProducto;
            					oDetPedido.precioUnitario = oPedido.productos[i].precioUnitario;
            					oDetPedido.cantidad = oPedido.productos[i].cantidad;
            					oDetPedido.precioSubtotal = oPedido.productos[i].precioSubtotal;
            					oDetPedido.estado = "PENDIENTE";
            					oDetPedido.fecCreacion = Date.now();
        						oDetPedido.fecModificacion = Date.now();
        						oDetPedido.usuario= oPedido.usuario;
            					oDetPedido.usuarioMod= oPedido.usuario;
            					oDetPedido.producto = oPedido.productos[i].id;

            					daDetPedido.addDetPedido(oDetPedido, function(err, detPedido){
            						if(err){
            							res.json(err);
            						}else{
                                        console.log("**************  inicio det pedido   **************")
                                        console.log(detPedido);
                                        console.log("**************  fin det pedido   **************")
            							if(detPedido){
            								numPedidosProcesados+=1;
                                            console.log("======PEDIDO PROCESADO=====" + numPedidosProcesados);
            								if(numPedidosProcesados==nProd){
            									res.json(oPedido.pedido);
            								}	
            							}
            						}
            					})
            				}
            			}
            		})
            	}
            })
        }
    });
});

module.exports = router;
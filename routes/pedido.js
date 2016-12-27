var express = require('express');
var router = express.Router();
var daPedido = require('../datos/pedido'), //mongo connection
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
}));

/* GET Pedido Page */
router.get('/', function(req, res, next){
    daPedido.getPedidos(function(err, pedidos){
        if(err){
            res.render('pedido/index', 
            { 
                title: 'Pedido Trikas: Error al obtener los pedidos.' , 
                "home": 'active', 
                "catalogo": '', 
                "carrito": '', 
                "login": '',
                "pedidos": null
            });
        }else{
            res.render('pedido/index', 
            { 
                title: 'Pedido Trikas' , 
                "home": 'active', 
                "catalogo": '', 
                "carrito": '', 
                "login": '',
                "pedidos": pedidos
            });
        }
        
    })
	
});

module.exports = router;
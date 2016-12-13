var express = require('express');
var router = express.Router();
var daProducto = require('../datos/producto'), //mongo connection
    daCategoria = require('../datos/categoria'), //mongo connection
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

/* GET Categoria Page */
router.get('/', function(req, res, next){
    daCategoria.getCategorias(function(err, categorias){
        if(err){
            res.render('producto/index', 
            { 
                title: 'Producto Trikas: Error al obtener las categorías.' , 
                "home": '', 
                "catalogo": '', 
                "carrito": '', 
                "login": '',
                "categorias": null,
                "productos": null
            });
        }else{
        	daProducto.getProductos(function(err, productos){
        		if(err){
        			res.render('producto/index', 
		            { 
		                title: 'Producto Trikas: Error al obtener los productos.' , 
		                "home": '', 
		                "catalogo": '', 
		                "carrito": '', 
		                "login": '',
		                "categorias": null,
		                "productos": null
		            });
        		}else{
        			res.render('producto/index', 
		            { 
		                title: 'Producto Trikas' , 
		                "home": '', 
		                "catalogo": '', 
		                "carrito": '', 
		                "login": '',
		                "categorias": categorias,
		                "productos": productos
		            });
        		}
        	})

            
        }
        
    })
	
});

//POST a new Producto
router.post('/', function(req, res) {
    console.log('post  oProducto: ');
    // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
    var oProducto = {};
        oProducto.idProducto = req.body.idProducto;
        oProducto.desProducto = req.body.desProducto;
        oProducto.costoUnitario = req.body.costoUnitario;
        oProducto.stock = req.body.stock;
        oProducto.precioUnitario = req.body.precioUnitario;
        oProducto.urlImagen = req.body.urlImagen;
        oProducto.categoria = req.body.categoria;
        oProducto.fecCreacion = Date.now();
        oProducto.fecModificacion = Date.now();
        oProducto.usuario = req.body.correo;
        oProducto.esCarrusel = (req.body.esCarrusel)? req.body.esCarrusel : false;
        oProducto.seSolicita = (req.body.seSolicita)? req.body.seSolicita : false;
        oProducto.esActivo = (req.body.esActivo)? req.body.esActivo : false;
    
    daUsuario.getIdUsuario(oProducto.usuario, function(err, idUsuario){
        //call the create function for our database
        console.log("idUsuario: " + idUsuario);
        if(err){
            res.json(err);
        }else{
            oProducto.usuario= idUsuario;
            oProducto.usuarioMod= idUsuario;
            console.log('POST creating new oProducto: ' + oProducto);
            daProducto.addProducto(oProducto, function(rptaBD){
                res.json(rptaBD);
            });    
        }
    });
});

//PUT a UPD Categoria
router.put('/', function(req, res) {
    console.log('put  oProducto: ');
    // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
    var oProducto = {};
        oProducto._id = req.body.id;
        oProducto.idProducto = req.body.idProducto;
        oProducto.desProducto = req.body.desProducto;
        oProducto.costoUnitario = req.body.costoUnitario;
        oProducto.stock = req.body.stock;
        oProducto.precioUnitario = req.body.precioUnitario;
        oProducto.urlImagen = req.body.urlImagen;
        oProducto.categoria = req.body.categoria;
        oProducto.fecModificacion = Date.now();
        oProducto.usuarioMod = req.body.correo;
        oProducto.esCarrusel = (req.body.esCarrusel)? req.body.esCarrusel : false;
        oProducto.seSolicita = (req.body.seSolicita)? req.body.seSolicita : false;
        oProducto.esActivo = (req.body.esActivo)? req.body.esActivo : false;
    
    daUsuario.getIdUsuario(oProducto.usuarioMod, function(err, idUsuario){
        //call the create function for our database
        console.log("idUsuario: " + idUsuario);
        if(err){
            res.json(err);
        }else{
            oProducto.usuarioMod= idUsuario;
            console.log('put creating new oProducto: ' + oProducto);
            daProducto.updProducto(oProducto, function(rptaBD){
                res.json(rptaBD);
            });    
        }
    });
});

//delete a Categoria
router.delete('/', function(req, res) {
    console.log('delete  oProducto: ' + req.id + "- "  + req.body.id);
    // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
    var oProducto = {};
        oProducto._id = req.body.id;
    console.log("id: " + oProducto._id);
    daProducto.delProducto(oProducto._id, function(rptaBD){
        res.json(rptaBD);
    }); 
});

module.exports = router;
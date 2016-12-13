var express = require('express');
var router = express.Router();
var daCategoria = require('../datos/categoria'), //mongo connection
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

/* GET Categoria Page */
router.get('/', function(req, res, next){
    daCategoria.getCategorias(function(err, categorias){
        if(err){
            res.render('categoria/index', 
            { 
                title: 'Categoría Trikas: Error al obtener las categorías.' , 
                "home": '', 
                "catalogo": 'active', 
                "carrito": '', 
                "login": '',
                "categorias": null
            });
        }else{
            res.render('categoria/index', 
            { 
                title: 'Categoría Trikas' , 
                "home": '', 
                "catalogo": 'active', 
                "carrito": '', 
                "login": '',
                "categorias": categorias
            });
        }
        
    })
	
});

//POST a new Categoria
router.post('/', function(req, res) {
    // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
    var oCategoria = {};
        oCategoria.idCategoria = req.body.idCategoria;
        oCategoria.desCategoria = req.body.desCategoria;
        oCategoria.fecCreacion = Date.now();
        oCategoria.fecModificacion = Date.now();
        oCategoria.usuario = req.body.correo;
        oCategoria.esActivo = (req.body.esActivo)? req.body.esActivo : false;
    
    daUsuario.getIdUsuario(oCategoria.usuario, function(err, idUsuario){
        //call the create function for our database
        console.log("idUsuario: " + idUsuario);
        if(err){
            res.json(err);
        }else{
            oCategoria.usuario= idUsuario;
            console.log('POST creating new Categoria: ' + oCategoria);
            daCategoria.addCategoria(oCategoria, function(rptaBD){
                res.json(rptaBD);
            });    
        }
    });
});

//PUT a UPD Categoria
router.put('/', function(req, res) {
    console.log('put  Categoria: ');
    // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
    var oCategoria = {};
        oCategoria._id = req.body.id;
        oCategoria.idCategoria = req.body.idCategoria;
        oCategoria.desCategoria = req.body.desCategoria;
        oCategoria.fecModificacion = Date.now();
        oCategoria.usuario = req.body.correo;
        oCategoria.esActivo = (req.body.esActivo)? req.body.esActivo : false;
    
    daUsuario.getIdUsuario(oCategoria.usuario, function(err, idUsuario){
        //call the create function for our database
        console.log("idUsuario: " + idUsuario);
        if(err){
            res.json(err);
        }else{
            oCategoria.usuario= idUsuario;
            console.log('put creating new Categoria: ' + oCategoria);
            daCategoria.updCategoria(oCategoria, function(rptaBD){
                res.json(rptaBD);
            });    
        }
    });
});

//delete a Categoria
router.delete('/', function(req, res) {
    console.log('delete  Categoria: ' + req.id + "- "  + req.body.id);
    // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
    var oCategoria = {};
        oCategoria._id = req.body.id;
    console.log("id: " + oCategoria._id);
    daCategoria.delCategoria(oCategoria._id, function(rptaBD){
        res.json(rptaBD);
    }); 
});

module.exports = router;
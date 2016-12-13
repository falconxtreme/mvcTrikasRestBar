var express = require('express');
var router = express.Router();
var daProducto = require('../datos/producto'), //mongo connection
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

/* GET home page. */
router.get('/', function(req, res, next) {
	daProducto.getProductosCarrusel(function(err, productos){
		if(err){
			res.render('index', 
	  		{ 
	  			title: 'Trikas' , 
	  			"home": 'active', 
	  			"catalogo": '', 
	  			"carrito": '', 
	  			"login": '',
	  			"productos": null
	  		});
		}else{
			res.render('index', 
	  		{ 
	  			title: 'Trikas' , 
	  			"home": 'active', 
	  			"catalogo": '', 
	  			"carrito": '', 
	  			"login": '',
	  			"productos": productos
	  		});
		}
	});	
});

module.exports = router;

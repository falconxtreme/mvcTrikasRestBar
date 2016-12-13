var express = require('express');
var router = express.Router();
var daRol = require('../datos/rol'), //mongo connection
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

/* GET Rol Page */
router.get('/', function(req, res, next){
  res.format({
    //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
    html: function(){
      res.render('rol/index', 
      { 
        title: 'Roles Trikas' , 
        "home": '', 
        "catalogo": '', 
        "carrito": '', 
        "login": '',
        "roles": daRol.getRoles()
      });
    },
    //JSON response will show the newly created blob
    json: function(){
      res.json(daRol.getRoles());
    }
  });
});

//POST a new Rol
router.post('/', function(req, res) {
  // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
  var oRol = {};
      oRol.idRol = req.body.idRol;
      oRol.desRol = req.body.desRol;
      oRol.fecCreacion = Date.now();
      oRol.fecModificacion = Date.now();
      oRol.esActivo = (req.body.esActivo)? req.body.esActivo : false;

  //call the create function for our database
  daRol.addRol(oRol, function(rptaBd){
    console.log('rpta: ' + rptaBd);
    res.render('rol/index', 
      { 
        title: 'Roles Trikas' , 
        "home": '', 
        "catalogo": '', 
        "carrito": '', 
        "login": '',
        "roles": daRol.getRoles()
      });
  });
});


module.exports = router;
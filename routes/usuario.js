var express = require('express');
var router = express.Router();
var daUsuario = require('../datos/usuario'), //mongo connection
    daRol = require('../datos/rol'),
    daCorreo = require('../datos/correo'),
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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('usuario/index', 
		{ 
			title: 'Usuarios Trikas' , 
			"home": '', 
			"catalogo": '', 
			"carrito": '', 
			"login": '',
			"usuarios": daUsuario.getUsuarios()
		});
});

//POST a new User
router.post('/', function(req, res, next) {
    // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
    console.log("ingresa a router post---------- ");
    var oUsuario = {};
        oUsuario.correo = req.body.correo;
        oUsuario.contrasenha = req.body.contrasenha;
        oUsuario.nick = "";
        oUsuario.token = "";
        oUsuario.nombre = "";
        oUsuario.dni = "";
        oUsuario.esActivo = false;
        oUsuario.fecNacimiento = Date.now();
        oUsuario.fecCreacion = Date.now();
        oUsuario.fecModificacion = Date.now();
        oUsuario.rol = "";
    
    daRol.getRolCliente(function(err, idRol){
        //call the create function for our database
        console.log("idrol: " + idRol);
        if(err){
            res.json(err);
        }else{
            oUsuario.rol= idRol;
            console.log('POST creating new USUARIO: ' + oUsuario);
            daUsuario.addUsuario(oUsuario, function(err,usuario){
                if(err){
                    res.json(err);
                }else{
                    daCorreo.enviarEmailActivacionCuenta(usuario.correo, usuario._id, function(err,info){
                        if(err){
                            res.json(err);
                        }else{
                            res.json(usuario);
                        }
                    });
                }
            });
        }
    });
});

//POST a validacion de cuenta
router.post('/autenticacion', function(req, res, next) {
    // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
    var oUsuario = {};
        oUsuario.correo = req.body.correo;
        oUsuario.contrasenha = req.body.contrasenha;
        oUsuario.token = req.body.token;
    
    //call the create function for our database
    console.log("autenticacion usuario: " + oUsuario.correo);
    console.log("autenticacion contrasenha: " + oUsuario.contrasenha);
    daUsuario.autenticarCorreo(oUsuario, function(rptaBD){
    	res.json(rptaBD);
    });
});

/* GET users listing. */
router.get('/activado', function(req, res, next) {
  res.render('usuario/activar', 
        { 
            title: 'Activación de Cuenta Trikas' , 
            "home": '', 
            "catalogo": '', 
            "carrito": '', 
            "login": ''
        });
});

router.get('/activar', function(req, res, next) {
    console.log("+++++++++++++ ingresa a activar cuenta ++++++++");
    // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
    var usuarioId = req.query.q;
    
    //call the create function for our database
    console.log("activacion usuario: " + usuarioId);
    daUsuario.activarCuenta(usuarioId, function(err, usuario){
        if(err){
            //res.location("usuario");
            res.redirect("/usuario/activado");
        }else{
            //res.location("usuario");
            res.redirect("/usuario/activado");
        }
        
    });
});

module.exports = router;

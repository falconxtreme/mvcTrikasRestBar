/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trikasbd');*/

if (!global.hasOwnProperty('db')) {

  var mongoose = require('mongoose');
  var config = require('config');

  var dbHost = config.get('trikasapp.dbConfig.host');
  var dbPort = config.get('trikasapp.dbConfig.port');
  var dbName = config.get('trikasapp.dbConfig.dbName');
  var dbUser = config.get('trikasapp.dbConfig.userdb');
  var dbPass = config.get('trikasapp.dbConfig.passdb');

  // the application is executed on the local machine ...
  if(dbPort==0 || dbPort==27017){
      mongoose.connect('mongodb://'+ dbHost +'/' + dbName);
  }else{
      mongoose.connect('mongodb://'+ dbUser + ':' + dbPass +'@' + dbHost + ':' + dbPort + '/' + dbName);
  }

  global.db = {

    mongoose: mongoose,

    //models
    Rol:              require('./rol')(mongoose),
    Usuario:          require('./usuario')(mongoose),
    Categoria:        require('./categoria')(mongoose),
    Producto:         require('./producto')(mongoose),
    Pedido:           require('./pedido')(mongoose),
    DetPedido:        require('./detPedido')(mongoose),
    DatosGenerales:   require('./datosGenerales.js')(mongoose)
    
  };

}

module.exports = global.db;
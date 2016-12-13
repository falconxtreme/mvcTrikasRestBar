function productosCategoria(id){
	var prodsCat = [];
	$.ajax({
		type: 'GET',
		url: obtenerHostname() + '/catalogo/cat?idCat=' + id ,
		async: false,
		beforeSend: function(xhr){
			if(xhr && xhr.overrideMimeType){
				xhr.overrideMimeType('application/json;charset=utf-8');
			}
		},
		dataType: 'json',
		success: function(data){
			if(data){
				if(typeof (data) == 'string'){
					//alert("Registro inválido! " + data);
					agregarMsj("msjValidacion", data, false);
				}else{
					//alert("Registro válido!");
					console.log(data);
					prodsCat=data;
					crearCardsProductos(prodsCat);
				}
			}else{
				agregarMsj("msjValidacion", "Ocurrió un error al momento de traer los productos de la Categoría.", false);
			}
		}
	});
}

function crearCardsProductos(prods){
	if(prods){
		var $divProdsCatalogo = $("#divProdsCatalogo");
		limpiarCatalogo($divProdsCatalogo);
		for(var i=0; i<prods.length; i++){
			agregarProdCatalogo($divProdsCatalogo, crearCardProducto(prods[i]));
		}
	}
}

function limpiarCatalogo(oProdsCatalogo){
	oProdsCatalogo.empty();
}

function agregarProdCatalogo(oProdsCatalogo, prodHtml){
	oProdsCatalogo.append(prodHtml);
}

function crearCardProducto(oProd){
	var html = 	'<div class="col-xs-12 col-md-6 col-lg-4">'+
					'<div class="card">'+
						'<img src="'+ oProd.urlImagen +'" alt="Trikas" class="card-img-top img-fluid">'+
						'<div class="card-block">'+
							'<h4 class="card-title">'+ oProd.idProducto +'</h4>'+
							'<p class="card-text">'+ oProd.desProducto +'</p>'+
							'<div class="input-group">'+
								'<span class="input-group-addon">S/. '+ oProd.precioUnitario +'</span>'+
								'<input type="text" aria-label="Cantidad" value="1" class="form-control">'+
								'<span class="input-group-btn">'+
									'<button type="button" onclick="agregarACarrito(this,'+ String.fromCharCode(39) +
										oProd._id + String.fromCharCode(39) + ', '+ String.fromCharCode(39) + 
										oProd.idProducto + String.fromCharCode(39) + ', '+ String.fromCharCode(39) + 
										oProd.desProducto + String.fromCharCode(39) + ', ' + String.fromCharCode(39) + 
										oProd.precioUnitario + String.fromCharCode(39) + ', '+ String.fromCharCode(39) +
										oProd.urlImagen + String.fromCharCode(39) + ')" class="btn btn-primary">Agregar</button>'+
								'</span>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>';
	return html;
}
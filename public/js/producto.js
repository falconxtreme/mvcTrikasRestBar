$(document).ready(function(){
	$("#frmAddProduct").submit(function(ev){
		ev.preventDefault();
		guardarProducto();
	});

	function agregarProducto(oPro){
		var $detProductos = $("#detProductos");
		var html = '<div class="row rowProducto">' +
						'<div class="col-xs-12 col-md-1">' + oPro.idProducto + '</div>' +
						'<div class="col-xs-12 col-md-2">' + oPro.desProducto + '</div>' +
						'<div class="col-xs-12 col-md-1">' + oPro.costoUnitario + '</div>' +
						'<div class="col-xs-12 col-md-1">' + oPro.stock + '</div>' +
						'<div class="col-xs-12 col-md-1">' + oPro.precioUnitario + '</div>' +
						'<div class="col-xs-12 col-md-2">' + oPro.urlImagen + '</div>' +
						'<div class="col-xs-12 col-md-1">' + oPro.categoria.desCategoria + '</div>' +
						'<div class="col-xs-12 col-md-1"><input type="checkbox" checked="' + oPro.esCarrusel + 
						'">&nbsp;<input type="checkbox" checked="' + oPro.seSolicita + 
						'">&nbsp;<input type="checkbox" checked="' + oPro.esActivo + '"></div>' +
						'<div class="col-xs-12 col-md-3">' +
							'<button onclick="editarProducto(' + oPro._id + ', '+ oPro.idProducto +' , '+ 
							oPro.desProducto +' , '+ oPro.costoUnitario +' , '+ oPro.stock +' , '+ 
							oPro.precioUnitario +' , '+ oPro.urlImagen +' , '+ oPro.categoria._id +' , '+ 
							oPro.esCarrusel + ' , ' + oPro.seSolicita + ' , ' + oPro.esActivo +')" class="btn btn-trikas">' +
								'<i class="fa fa-pencil"></i>' +
							'</button>&nbsp;' +
							'<button onclick="eliminarProducto('+ oPro._id +', this)" class="btn btn-trikas">' +
								'<i class="fa fa-trash"></i>' +
							'</button>' +
						'</div>' +
					'</div>';
		$detProductos.append(html);
	}

	function guardarProducto(){
		var idProducto = $("#txtIdProducto").val().trim();
		var desProducto = $("#txtDesProducto").val().trim();
		var costoUnitario = $("#txtCostoUnitario").val().trim();
		var stock = $("#txtStock").val().trim();
		var precioUnitario = $("#txtPrecioUnitario").val().trim();
		var urlImagen = $("#txtUrlImagen").val().trim();
		var categoria = $("#ddlCategoria").val().trim();
		var esCarrusel = $("#chkCarrusel").is(":checked");
		var seSolicita = $("#chkSolicitar").is(":checked");
		var esActivo = $("#chkActivo").is(":checked");

		var dataIn = {
			idProducto: idProducto,
			desProducto: desProducto,
			costoUnitario: costoUnitario,
			stock: stock,
			precioUnitario: precioUnitario,
			urlImagen: urlImagen,
			categoria: categoria,
			esCarrusel: esCarrusel,
			seSolicita: seSolicita,
			esActivo: esActivo,
			correo: localStorage.usuarioTrikas
		};

		console.log("*********** guardar producto **************");
		console.log("idProducto: " + idProducto);
		console.log("desProducto: " + desProducto);
		console.log("costoUnitario: " + costoUnitario);
		console.log("stock: " + stock);
		console.log("precioUnitario: " + precioUnitario);
		console.log("urlImagen: " + urlImagen);
		console.log("categoria: " + categoria);
		console.log("esCarrusel: " + esCarrusel);
		console.log("seSolicita: " + seSolicita);
		console.log("esActivo: " + esActivo);

		$.ajax({
			type: 'POST',
			url: obtenerHostname() + '/producto',
			data: dataIn,
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
						console.log("**objeto guardado******");
						console.log(data);
						agregarProducto(data);
						agregarMsj("msjValidacion", "Se ha registrado correctamente el Producto.", true);
					}
				}else{
					agregarMsj("msjValidacion", "Ocurrió un error al momento de guardar el Producto.", false);
				}
			}
		});
	};
	
	function nuevoProducto(){
		var $btnGuardarProducto = $("#btnGuardarProducto");
		var $btnActualizarProducto = $("#btnActualizarProducto");
		var $btnNuevoProducto = $("#btnNuevoProducto");
		$btnGuardarProducto.removeClass("noDisplay");
		if(!$btnActualizarProducto.hasClass("noDisplay")){
			$btnActualizarProducto.addClass("noDisplay");
		}
		$btnNuevoProducto.addClass("noDisplay");
	}

	$("#btnNuevoProducto").click(function(){
		nuevoProducto();
	})

	function actualizarProducto(){
		var id = $("#txtId").val().trim();
		var idProducto = $("#txtIdProducto").val().trim();
		var desProducto = $("#txtDesProducto").val().trim();
		var costoUnitario = $("#txtCostoUnitario").val().trim();
		var stock = $("#txtStock").val().trim();
		var precioUnitario = $("#txtPrecioUnitario").val().trim();
		var urlImagen = $("#txtUrlImagen").val().trim();
		var categoria = $("#ddlCategoria").val().trim();
		var esCarrusel = $("#chkCarrusel").is(":checked");
		var seSolicita = $("#chkSolicitar").is(":checked");
		var esActivo = $("#chkActivo").is(":checked");

		console.log("id: " + id);
		console.log("idProducto: " + idProducto);
		console.log("desProducto: " + desProducto);
		console.log("stock: " + stock);
		console.log("precioUnitario: " + precioUnitario);
		console.log("urlImagen: " + urlImagen);
		console.log("categoria: " + categoria);
		console.log("esActivo: " + esActivo);
		console.log("correo: " + localStorage.usuarioTrikas);

		var dataIn = {
			id: id,
			idProducto: idProducto,
			desProducto: desProducto,
			costoUnitario: costoUnitario,
			stock: stock,
			precioUnitario: precioUnitario,
			urlImagen: urlImagen,
			categoria: categoria,
			esCarrusel: esCarrusel,
			seSolicita: seSolicita,
			esActivo: esActivo,
			correo: localStorage.usuarioTrikas
		};

		$.ajax({
			type: 'PUT',
			url: obtenerHostname() + '/producto',
			data: dataIn,
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
						agregarMsj("msjValidacion", "Se ha actualizado correctamente el Producto.", true);
					}
				}else{
					agregarMsj("msjValidacion", "Ocurrió un error al momento de actualizar el Producto.", false);
				}
			}
		});
	}

	$("#btnActualizarProducto").click(function(){
		actualizarProducto();
	})
});



function editarProducto(id, idProducto, desProducto,costoUnitario,stock,precioUnitario,urlImagen,
	categoria,esCarrusel,seSolicita, esActivo){
	$("#txtId").val(id);
	$("#txtIdProducto").val(idProducto);
	$("#txtDesProducto").val(desProducto);
	$("#txtCostoUnitario").val(costoUnitario);
	$("#txtStock").val(stock);
	$("#txtPrecioUnitario").val(precioUnitario);
	$("#txtUrlImagen").val(urlImagen);
	$("#ddlCategoria").val(categoria);
	$("#chkCarrusel").attr("checked", esCarrusel);
	$("#chkSolicitar").attr("checked", seSolicita);
	$("#chkActivo").attr("checked", esActivo);

	var $btnGuardarProducto = $("#btnGuardarProducto");
	var $btnActualizarProducto = $("#btnActualizarProducto");
	var $btnNuevoProducto = $("#btnNuevoProducto");
	if(!$btnGuardarProducto.hasClass("noDisplay")){
		$btnGuardarProducto.addClass("noDisplay");
	}
	$btnActualizarProducto.removeClass("noDisplay");
	$btnNuevoProducto.removeClass("noDisplay");
}

function eliminarProducto(id, el){
	var $btnEli = $(el);
	var dataIn = {
		id: id
	};

	$.ajax({
		type: 'DELETE',
		url:  obtenerHostname() + '/producto',
		data: dataIn,
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
					agregarMsj("msjValidacionGen", data, false);
				}else{
					//alert("Registro válido!");
					$btnEli.parent().parent().remove();
					agregarMsj("msjValidacionGen", "Se ha eliminado correctamente el Producto.", true);
				}
			}else{
				agregarMsj("msjValidacionGen", "Ocurrió un error al momento de eliminar el Producto.", false);
			}
		}
	});
}
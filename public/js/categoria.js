$(document).ready(function(){
	$("#frmAddCategory").submit(function(ev){
		ev.preventDefault();
		guardarCategoria();
	});


	function agregarCategoria(oCat){
		var $detCategorias = $("#detCategorias");
		var html = '<div class="row">' +
						'<div class="col-xs-12 col-md-2">' + oCat.idCategoria + '</div>' +
						'<div class="col-xs-12 col-md-5">' + oCat.desCategoria + '</div>' +
						'<div class="col-xs-12 col-md-2"><input type="checkbox" checked="' + oCat.esActivo + '"></div>' +
						'<div class="col-xs-12 col-md-3">' +
							'<button onclick="editarCategoria(' + oCat._id + ', '+ oCat.idCategoria +' , '+ 
							oCat.desCategoria +' , '+ oCat.esActivo +')" class="btn btn-trikas">' +
								'<i class="fa fa-pencil"></i>' +
							'</button>&nbsp;' +
							'<button onclick="eliminarCategoria('+ oCat._id +', this)" class="btn btn-trikas">' +
								'<i class="fa fa-trash"></i>' +
							'</button>' +
						'</div>' +
					'</div>';
		$detCategorias.append(html);
	}

	function guardarCategoria(){
		var idCategoria = $("#txtIdCategoria").val().trim();
		var desCategoria = $("#txtDesCategoria").val().trim();
		var esActivo = $("#chkActivo").is(":checked");

		var dataIn = {
			idCategoria: idCategoria,
			desCategoria: desCategoria,
			esActivo: esActivo,
			correo: localStorage.usuarioTrikas
		};

		$.ajax({
			type: 'POST',
			url: obtenerHostname() + '/categoria',
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
						agregarCategoria(data);
						agregarMsj("msjValidacion", "Se ha registrado correctamente la Categoría.", true);
					}
				}else{
					agregarMsj("msjValidacion", "Ocurrió un error al momento de guardar la Categoría.", false);
				}
			}
		});
	};
	
	function nuevaCategoria(){
		var $btnGuardarCategoria = $("#btnGuardarCategoria");
		var $btnActualizarCategoria = $("#btnActualizarCategoria");
		var $btnNuevaCategoria = $("#btnNuevaCategoria");
		$btnGuardarCategoria.removeClass("noDisplay");
		if(!$btnActualizarCategoria.hasClass("noDisplay")){
			$btnActualizarCategoria.addClass("noDisplay");
		}
		$btnNuevaCategoria.addClass("noDisplay");
	}

	$("#btnNuevaCategoria").click(function(){
		nuevaCategoria();
	})

	function actualizarCategoria(){
		var id = $("#txtId").val().trim();
		var idCategoria = $("#txtIdCategoria").val().trim();
		var desCategoria = $("#txtDesCategoria").val().trim();
		var esActivo = $("#chkActivo").is(":checked");

		console.log("id: " + id);
		console.log("idCategoria: " + idCategoria);
		console.log("desCategoria: " + desCategoria);
		console.log("esActivo: " + esActivo);
		console.log("correo: " + localStorage.usuarioTrikas);

		var dataIn = {
			id: id,
			idCategoria: idCategoria,
			desCategoria: desCategoria,
			esActivo: esActivo,
			correo: localStorage.usuarioTrikas
		};

		$.ajax({
			type: 'PUT',
			url: obtenerHostname() + '/categoria',
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
						agregarMsj("msjValidacion", "Se ha actualizado correctamente la Categoría.", true);
					}
				}else{
					agregarMsj("msjValidacion", "Ocurrió un error al momento de actualizar la Categoría.", false);
				}
			}
		});
	}

	$("#btnActualizarCategoria").click(function(){
		actualizarCategoria();
	})
});



function editarCategoria(id, idCategoria, desCategoria, esActivo){
	$("#txtId").val(id);
	$("#txtIdCategoria").val(idCategoria);
	$("#txtDesCategoria").val(desCategoria);
	$("#chkActivo").attr("checked", esActivo);

	var $btnGuardarCategoria = $("#btnGuardarCategoria");
	var $btnActualizarCategoria = $("#btnActualizarCategoria");
	var $btnNuevaCategoria = $("#btnNuevaCategoria");
	if(!$btnGuardarCategoria.hasClass("noDisplay")){
		$btnGuardarCategoria.addClass("noDisplay");
	}
	$btnActualizarCategoria.removeClass("noDisplay");
	$btnNuevaCategoria.removeClass("noDisplay");
}



function eliminarCategoria(id, el){
	var $btnEli = $(el);
	var dataIn = {
		id: id
	};

	$.ajax({
		type: 'DELETE',
		url: obtenerHostname() + '/categoria',
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
					agregarMsj("msjValidacionGen", "Se ha eliminado correctamente la Categoría.", true);
				}
			}else{
				agregarMsj("msjValidacionGen", "Ocurrió un error al momento de eliminar la Categoría.", false);
			}
		}
	});
}
function atenderPedido(id){
	var dataIn = {
		id: id
	};

	$.ajax({
		type: 'PUT',
		url: obtenerHostname() + '/pedidoat',
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
					agregarMsj("msjValidacionGen", data, false);
				}else{
					agregarMsj("msjValidacionGen", "Se ha atendido correctamente el Pedido.", true);
				}
			}else{
				agregarMsj("msjValidacionGen", "Ocurrió un error al momento de atender el Pedido.", false);
			}
		}
	});
}



function anularPedido(id){
	var dataIn = {
		id: id
	};

	$.ajax({
		type: 'PUT',
		url: obtenerHostname() + '/pedido',
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
					agregarMsj("msjValidacionGen", data, false);
				}else{
					agregarMsj("msjValidacionGen", "Se ha anulado correctamente el Pedido.", true);
				}
			}else{
				agregarMsj("msjValidacionGen", "Ocurrió un error al momento de anular el Pedido.", false);
			}
		}
	});
}
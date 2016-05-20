window.onload = function() {
  document.onkeypress = muestraInformacion;
  document.onkeydown = muestraInformacion;
}
 
function muestraInformacion(elEvento) {
  var evento = window.event || elEvento;
 
 if(evento==37)
 camara.position.x+=1;
 environment.add(camera);
 
  var mensaje = "Tipo de evento: " + evento.type + "<br>" +
                "Propiedad keyCode: " + evento.keyCode + "<br>" +
                "Propiedad charCode: " + evento.charCode + "<br>" +
                "Carácter pulsado: " + String.fromCharCode(evento.charCode);
 
  info.innerHTML += "<br>--------------------------------------<br>" + mensaje
}

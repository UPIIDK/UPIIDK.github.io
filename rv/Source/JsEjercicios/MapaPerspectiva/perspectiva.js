//keyCode=40 FlechaAbajo, keyCode=39 FlechaDerecha, keyCode=38 FlechaArriba, keyCode=37 FlechaIzq
window.onload = function() {
  document.onkeydown = muestraInformacion;
}
 
function muestraInformacion(elEvento) {
  var evento = window.event || elEvento;
 
 if(evento.keyCode==39){
 camara.position.x+=1;
 environment.add(camera);
 }
 if(evento.keyCode==37){
 camara.position.x-=1;
 environment.add(camera);
 }
  var mensaje = "Tipo de evento: " + evento.type + "<br>" +
                "Propiedad keyCode: " + evento.keyCode + "<br>" +
                "Carácter pulsado: " + String.fromCharCode(evento.charCode);

  info.innerHTML += "<br>--------------------------------------<br>" + mensaje
}

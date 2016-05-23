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
 if(evento.keyCode==40){
 camara.position.y-=1;
 environment.add(camera);
 }
  if(evento.keyCode==38){
 camara.position.y+=1;
 environment.add(camera);
 }
 if(evento.keyCode==68){
 camara.rotation.x+=1;
 environment.add(camera);
 }
 if(evento.keyCode==65){
 camara.rotation.x-=1;
 environment.add(camera);
 }
 if(evento.keyCode==87){
 camara.rotation.y-=1;
 environment.add(camera);
 }
  if(evento.keyCode==83){
 camara.rotation.y+=1;
 environment.add(camera);
 }
  /*var mensaje = "Tipo de evento: " + evento.type + "<br>" +
                "Propiedad keyCode: " + evento.keyCode + "<br>"
  info.innerHTML += "<br>--------------------------------------<br>" + mensaje
*/}

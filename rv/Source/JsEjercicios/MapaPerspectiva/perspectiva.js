//keyCode=40 FlechaAbajo, keyCode=39 FlechaDerecha, keyCode=38 FlechaArriba, keyCode=37 FlechaIzq
window.onload = function() {
  document.onkeydown = muestraInformacion;
}
 
function muestraInformacion(elEvento) {
  var evento = window.event || elEvento;
 //Mover Camara
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
 //Girar Camara
 if(evento.keyCode==87//A){
 camara.rotation.x+=0.01;
 environment.add(camera);
 }
 if(evento.keyCode==83//D){
 camara.rotation.x-=0.01;
 environment.add(camera);
 }
 if(evento.keyCode==68//S){
 camara.rotation.y-=0.01;
 environment.add(camera);
 }
  if(evento.keyCode==65//W){
 camara.rotation.y+=0.01;
 environment.add(camera);
 }
 //ZOOM
   if(evento.keyCode==32//Space){
 camara.position.z-=1;
 environment.add(camera);
 }
 if(evento.keyCode==90//Z){
 camara.position.z+=1;
 environment.add(camera);
 }
/*  var mensaje = "Tipo de evento: " + evento.type + "<br>" +
                "Propiedad keyCode: " + evento.keyCode + "<br>"
  info.innerHTML += "<br>--------------------------------------<br>" + mensaje
*/}

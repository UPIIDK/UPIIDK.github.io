
//keyCode=40 FlechaAbajo, keyCode=39 FlechaDerecha, keyCode=38 FlechaArriba, keyCode=37 FlechaIzq
window.onload = function() {
  document.onkeydown = muestraInformacion;
  var mensaje1 = "Teclas de Control " + "<br>" + "Tecla Esc: Reinicia la Camara" + "<br>" +
                "Tecla Z: Zoom out " + "<br>" + "Barra Espaciadora, Zoom In" + "<br>" + "Flecha, Mueven la camara" + 
                "<br>" + "Letras AWSDQE, Rotan la Camara" 
  info.innerHTML += "<br>--------------------------------------<br>" + mensaje1
}
 
function muestraInformacion(elEvento,robot) {
  var evento = window.event || elEvento;
 //Mover Camara
 if(evento.keyCode==39){
 camara.position.x+=1;
 }
 if(evento.keyCode==37){
 camara.position.x-=1;
 }
 if(evento.keyCode==40){
 camara.position.y-=1;
 }
  if(evento.keyCode==38){
 camara.position.y+=1;
 }
 //Girar Camara
 if(evento.keyCode==81){//Q
 camara.rotation.x+=Math.PI/16;
 }
 if(evento.keyCode==69){//E
 camara.rotation.x-=Math.PI/16;
 }
 if(evento.keyCode==68){//D
 camara.rotation.y-=Math.PI/16;
 }
  if(evento.keyCode==65){//A
 camara.rotation.y+=Math.PI/16;
 }
 if(event.keyCode==83){//S
 camara.rotation.z+=Math.PI/16;
 }
 if(evento.keyCode==87){//W
 camara.rotation.z-=Math.PI/16;
 }
 //ZOOM
   if(evento.keyCode==32){//Space
 camara.position.z-=0.5;
 }
 if(evento.keyCode==90){//Z
 camara.position.z+=0.5;
 }
 
 if(evento.keyCode==27){ //ESC
  camara.position.z=(0.5/1)+(1/1)+(0.3/1);
  camara.position.y=yR;
  camara.position.x=xR;
  //camara.rotation=robot.rotation;
luzPuntual.position=camara.position;
luzPuntual.rotation=camara.rotation;
 }
 //Captar variables
  if(evento.keyCode==91){ //ESC
  var mensaje = "Position camara x: " + camara.position.x + "<br>" +
  		"Position camara y: " + camara.position.y + "<br>" +
  		"Position camara z: " + camara.position.z + "<br>" +
                "Rotation camara x: " + camara.rotation.x + "<br>" +
                "Rotation camara y: " + camara.rotation.y + "<br>" +
                "Rotation camara z: " + camara.rotation.z + "<br>"
  info.innerHTML += "<br>--------------------------------------<br>" + mensaje
 }
 
 /*var mensaje = "Tipo de evento: " + evento.type + "<br>" +
                "Propiedad keyCode: " + evento.keyCode + "<br>"
  info.innerHTML += "<br>--------------------------------------<br>" + mensaje
*/}

//keyCode=40 FlechaAbajo, keyCode=39 FlechaDerecha, keyCode=38 FlechaArriba, keyCode=37 FlechaIzq
window.onload = function() {
  document.onkeydown = muestraInformacion;
  var mensaje = "Teclas de Control " + "<br>" + "Tecla Esc: Reinicia la Camara" + "<br>" +
                "Tecla Z: Zoom out " + "<br>" + "Barra Espaciadora, Zoom In" + "<br>" + "Flecha, Mueven la camara" + 
                "<br>" + "Letras AWSD, Rotan la Camara" 
  info.innerHTML += "<br>--------------------------------------<br>" + mensaje
}
 
function muestraInformacion(elEvento) {
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
 if(evento.keyCode==87){//A
 camara.rotation.x+=Math.PI/16;
 }
 if(evento.keyCode==83){//D
 camara.rotation.x-=Math.PI/16;
 }
 if(evento.keyCode==68){//S
 camara.rotation.y-=Math.PI/16;
 }
  if(evento.keyCode==65){//W
 camara.rotation.y+=Math.PI/16;
 }
 //ZOOM
   if(evento.keyCode==32){//Space
 camara.position.z-=1;
 }
 if(evento.keyCode==90){//Z
 camara.position.z+=1;
 }
 
 if(evento.keyCode==27){ //ESC
  camara.position.z=10;
  camara.position.y=-31;
  camara.position.x=-1;
  camara.rotation.x= 1.16;
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
//----------------------------------Resize de la Pantalla------------------------------------------------

		var tipo_evento = 'resize';
		//Es equivalente a function listener(){
		var listener = function(){
			//se actualiza la relacion de aspectos
			camara.aspect = window.innerWidth/window.innerHeight;
			
			//Se recomputa la matrix de proyección
			camara.updateProjectionMatrix();
			
			//Se ajusta el tamaño del renderer
			renderer.setSize( window.innerWidth , window.innerHeight );
		}
			
			//La variable capturarp se puede entender como "¿Desea capturar de 
			//forma directa los siguientes eventos?". La 'p' al final del nombre es 
			//una notación tradicional en ciertos circulos de programadores para 
			//indicar un predicado, en este caso un verbo.
			
			//desea capturar
			var capturarp = false;
			window.addEventListener(tipo_evento, listener, capturarp);
Status API Training Shop Blog About
© 2016 GitHub, Inc. Terms Privacy Security Contact Help

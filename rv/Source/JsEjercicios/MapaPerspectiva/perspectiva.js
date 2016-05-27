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
 if(evento.keyCode==87){//A
 camara.rotation.x+=0.01;
 environment.add(camera);
 }
 if(evento.keyCode==83){//D
 camara.rotation.x-=0.01;
 environment.add(camera);
 }
 if(evento.keyCode==68){//S
 camara.rotation.y-=0.01;
 environment.add(camera);
 }
  if(evento.keyCode==65){//W
 camara.rotation.y+=0.01;
 environment.add(camera);
 }
 //ZOOM
   if(evento.keyCode==32){//Space
 camara.position.z-=1;
 environment.add(camera);
 }
 if(evento.keyCode==90){//Z
 camara.position.z+=1;
 environment.add(camera);
 }
 
 if(evento.keyCode==27){ //ESC
  camara.position.z=30;
  camara.position.y=0;
  camara.position.x=0;
  camara.rotation=0;
 }
 //Captar variables
  if(evento.keyCode==91){ //ESC
  var mensaje = "Position camara: " + camara.position + "<br>" +
                "Rotation camara: " + camara.rotation + "<br>"
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

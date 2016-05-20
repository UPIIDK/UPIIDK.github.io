function manejador(elEvento) {
  var evento = elEvento || window.event;
  var caracter = evento.charCode || evento.keyCode;
  alert("El carácter pulsado es: " + String.fromCharCode(caracter));
}
 
document.onkeypress = manejador;

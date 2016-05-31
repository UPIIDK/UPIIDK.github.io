
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


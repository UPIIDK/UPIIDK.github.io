
function setupLuz(){
	var forma = new THREE.BoxGeometry(1,1,1);
	var material = new THREE.MeshLambertMaterial({color: '#ffffff'});
	mallaLuz =  new THREE.Mesh(forma, material);
	
	var luzPuntual = new THREE.PointLight(0xCC00CC);
	luzPuntual.position.x = 10;
	luzPuntual.position.y = 10;
	luzPuntual.position.z = 10;

	escenaLuz= new THREE.Scene();
	escenaLuz.add(mallaLuz);
	escenaLuz.add(luzPuntual);
	
	camaraLuz = new THREE.PerspectiveCamera();
	camaraLuz.position.z=5;
	
	rendererLuz = new THREE.WebGLRenderer();
	rendererLuz.setSize(window.innerHeight*.95, window.innerHeight*.95);
	document.body.appendChild(rendererLuz.domElement);
	}
	
function loopLuz(){
	requestAnimationFrame(loopLuz);
	
	mallaLuz.rotation.x += 0.01;
	mallaLuz.rotation.y +=0.01;
	
	rendererLuz.render (escenaLuz,camaraLuz);
	}
	var rendererLuz, mallaLuz, camaraLuz, escenaLuz;	
	setupLuz();
	loopLuz();

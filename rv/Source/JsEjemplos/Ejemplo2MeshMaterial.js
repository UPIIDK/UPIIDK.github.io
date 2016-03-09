function setup2(){
	var forma = new THREE.BoxGeometry(1,1,1);
	var material = new THREE.MeshNormalMaterial(4);
	malla2=  new THREE.Mesh(forma, material);
	
	escena2= new THREE.Scene();
	escena2.add(malla2);
	
	camara2 = new THREE.PerspectiveCamera();
	camara2.position.z=5;
	
	renderer2 = new THREE.WebGLRenderer();
	renderer2.setSize(window.innerHeight*.95, window.innerHeight*.95);
	document.body.appendChild(renderer2.domElement);
	}
	
function loop2(){
	requestAnimationFrame(loop2);
	
	malla2.rotation.x += 0.01;
	malla2.rotation.y +=0.01;
	
	renderer2.render (escena2,camara2);
	}
	var malla2, escena2, camara2, renderer2;
	setup2();
	loop2();


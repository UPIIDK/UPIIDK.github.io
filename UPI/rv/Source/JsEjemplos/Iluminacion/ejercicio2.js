function setup(){
	malla= new THREE.Mesh(new THREE.SphereGeometry(1),new THREE.MeshPhongMaterial({color: 0xff0000}));
	malla.position.y +=2;
	malla.position.z +=0.25;

	var base = new THREE.Mesh(new THREE.BoxGeometry(5,.1,5),new THREE.MeshPhongMaterial({color: 0x00ff00}));

	var iluminacion = new THREE.PointLight(0xffffff);
	iluminacion.position.y=20;

	escena= new THREE.Scene();
	escena.add(malla);
	escena.add(base);
	escena.add(iluminacion);

	camara= new THREE.PerspectiveCamera();
	camara.position.z=15;
	camara.position.y=5;

	renderer= new THREE.WebGLRenderer();
	renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
	document.body.appendChild(renderer.domElement);
	
	renderer.shadowMapEnabled = true;
	malla.castShadow = true;
	base.receiveShadow = true;
	iluminacion.castShadow = true;
}

function loop(){
	requestAnimationFrame(loop);

	malla.rotation.y += 0.01;

	renderer.render(escena,camara);
}

var camara, escena, renderer, malla;
setup();
loop();

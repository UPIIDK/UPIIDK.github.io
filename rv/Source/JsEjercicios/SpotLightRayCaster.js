function createSpotlight( color ) {
				var newObj = new THREE.SpotLight( color, 2 );
				newObj.castShadow = true;
				newObj.angle = 0.3;
				newObj.penumbra = 0.2;
				newObj.decay = 2;
				newObj.distance = 50;
				newObj.shadow.mapSize.width = 480;
				newObj.shadow.mapSize.height = 480;
				return newObj;
			};

function setup2(){
  
cubo3 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial());
cubo4 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1),new THREE.MeshNormalMaterial());
pelota = new THREE.Mesh(new THREE.SphereGeometry(0.5),new THREE.MeshNormalMaterial());

cubo3.position.x=3;
cubo4.position.x=-3;

camara2= new THREE.PerspectiveCamera();
camara2.position.z=10;


raycaster1 = new THREE.Raycaster(pelota.position,new THREE.Vector3(1,0,0));
raycaster2 = new THREE.Raycaster(pelota.position,new THREE.Vector3(-1,0,0));

spotLight = createSpotlight( 0xffffff );
escena2= new THREE.Scene();
escena2.add(pelota);
escena2.add(cubo3);
escena2.add(cubo4);
escena2.add(camara2);


renderer2 = new THREE.WebGLRenderer();
renderer2.setSize(window.innerHeight*.95,window.innerHeight*.95);

document.body.appendChild(renderer2.domElement);
step2=0.1;
}

function loop2(){
//Mueve al objeto pelota cuando intersecta con un cubo
obstaculo1=raycaster1.intersectObject(cubo3);
obstaculo2=raycaster2.intersectObject(cubo4);

if((obstaculo1.length > 0 && obstaculo1[0].distance <= 0.5) || (obstaculo2.length > 0 && obstaculo2[0].distance <= 0.5)){
cubo3 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshPhongMaterial());
cubo3.position.x=3;
escena2.add(cubo3);
step2=-step2;
}else{
cubo3 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalgMaterial());
cubo3.position.x=3;
escena2.add(cubo3);
}
pelota.position.x += step2;

raycaster1.set(pelota.position, new THREE.Vector3(1,0,0));
raycaster2.set(pelota.position, new THREE.Vector3(-1,0,0));
spotLight.position.set(raycaster1.position);
escena2.add(spotLight);
renderer2.render( escena2, camara2);
requestAnimationFrame(loop2);
}
var cubo3,cubo4,pelota,escena2,camara2,renderer2;
var raycaster1,raycaster2,step2,spotlight;

setup2();
loop2();

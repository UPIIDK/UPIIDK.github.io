function createSpotlight( color ) {
				var newObj = new THREE.SpotLight( color, 2 );
				newObj.castShadow = true;
				newObj.angle = 0.5;
				newObj.penumbra = 0.2;
				newObj.decay = 1;
				newObj.distance = 10;
				newObj.shadow.mapSize.width = 480;
				newObj.shadow.mapSize.height = 480;
				return newObj;
			};

function setup2(){
 
cubo3 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial());
cubo4 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1),new THREE.MeshNormalMaterial());
pelota = new THREE.Mesh(new THREE.SphereGeometry(0.5),new THREE.MeshNormalMaterial());

cubo3.position.x=4;
cubo4.position.x=-4;

camara2= new THREE.PerspectiveCamera();
camara2.position.z=20;


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

if((obstaculo1.length > 0 && obstaculo1[0].distance <= 0.5) && a==0) {
cubo3 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshPhongMaterial());
cubo3.position.x=4;
escena2.add(cubo3);
step2=-step2;
a=1;
}
if((obstaculo1.length > 0 && obstaculo1[0].distance <= 0.5) && a==1) {
cubo3 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial());
cubo3.position.x=4;
escena2.add(cubo3);
step2=-step2;
a=0;
}
if((obstaculo2.length > 0 && obstaculo2[0].distance <= 0.5) && b==0){
cubo4 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshLambertMaterial());
cubo4.position.x=-4;
escena2.add(cubo4);
step2=-step2;
b=1;
}
if((obstaculo2.length > 0 && obstaculo2[0].distance <= 0.5) && b==1){
cubo4 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormaltMaterial());
cubo4.position.x=-4;
escena2.add(cubo4);
step2=-step2;
b=0;
}
pelota.position.x += step2;

raycaster1.set(pelota.position, new THREE.Vector3(1,0,0));
raycaster2.set(pelota.position, new THREE.Vector3(-1,0,0));
spotLight.position.set(-step2,0,0);
escena2.add(spotLight);
renderer2.render( escena2, camara2);
requestAnimationFrame(loop2);
}
var cubo3,cubo4,pelota,escena2,camara2,renderer2;
var raycaster1,raycaster2,step2,spotlight;
var a=0,b=0;
setup2();
loop2();

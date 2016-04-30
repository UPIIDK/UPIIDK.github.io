function setup2(){

var Material = new THREE.MeshNormalMaterial();
cubo3 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), Material;
cubo4 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1),new THREE.MeshLambertMaterial());
pelota = new THREE.Mesh(new THREE.SphereGeometry(0.5),new THREE.MeshNormalMaterial());

cubo3.position.x=3;
cubo4.position.x=-3;

camara2= new THREE.PerspectiveCamera();
camara2.position.z=100;


raycaster1 = new THREE.Raycaster(pelota.position,new THREE.Vector3(1,0,0));
raycaster2 = new THREE.Raycaster(pelota.position,new THREE.Vector3(-1,0,0));

spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );
spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

escena2= new THREE.Scene();
escena2.add(cubo3);
escena2.add(cubo4);
escena2.add(pelota);
escena2.add(camara2);
escena2.add(spotLight);

renderer2 = new THREE.WebGLRenderer();
renderer2.setSize(window.innerHeight*.95,window.innerHeight*.95);

document.body.appendChild(renderer2.domElement);
step2=0.1;
}

function loop2(){
//Mueve al objeto pelota cuando intersecta con un cubo
obstaculo1=raycaster1.intersectObject(cubo3);
obstaculo2=raycaster2.intersectObject(cubo4);

if((obstaculo1.length > 0 && obstaculo1[0].distance <= 0.5) || (obstaculo2.length > 0 && obstaculo2[0].distance <= 0.5))
step2=-step2;

pelota.position.x += step2;


raycaster1.set(pelota.position, new THREE.Vector3(1,0,0));
raycaster2.set(pelota.position, new THREE.Vector3(-1,0,0));
spotLight.position.set(raycaster1.position);

renderer2.render( escena2, camara2);
requestAnimationFrame(loop2);
}
var cubo3,cubo4,pelota,escena2,camara2,renderer2;
var raycaster1,raycaster2,step2,spotlight;

setup2();
loop2();

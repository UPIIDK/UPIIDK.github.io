
function setup3(){
 THREE.ImageUtils.crossOrigin='';
 var textura=THREE.ImageUtils.loadTexture('http://threejs.org/examples/textures/brick_diffuse.jpg');
 var material=new THREE.MeshLambertMaterial({map:textura});
 var forma=new THREE.BoxGeometry(1,1,1);
 malla3=new THREE.Mesh(forma,material);
 malla3.scale.set(1,4,9);

escena3= new THREE.Scene();
escena3.add(malla3);

var luzPuntual3=new THREE.PointLight(0xffffff);
	luzPuntual3.position.x=10;
	luzPuntual3.position.y=10;
	luzPuntual3.position.z=10;
	escena3.add(luzPuntual3);

camara3=new THREE.PerspectiveCamera();
camara3.position.z=15;

renderer3=new THREE.WebGLRenderer();
renderer3.setSize(window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderer3.domElement);
}

function loop3(){
  requestAnimationFrame(loop3);
  malla3.rotation.x += 0.01;
  malla3.rotation.y += 0.01;
  renderer3.render(escena3,camara3);
}

var camara3,escena3,renderer3,malla3;

setup3();
loop3();

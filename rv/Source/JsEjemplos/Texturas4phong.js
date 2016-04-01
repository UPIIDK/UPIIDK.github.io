function setup4(){
 THREE.ImageUtils.crossOrigin='';
 var textura=THREE.ImageUtils.loadTexture('http://threejs.org/examples/textures/cube/pisa/nz.png');
 var material=new THREE.MeshPhongMaterial({map:textura});
 var forma=new THREE.BoxGeometry(1,1,1);
 malla4=new THREE.Mesh(forma,material);

escena4= new THREE.Scene();
escena4.add(malla4);

var luzPuntual4=new THREE.PointLight(0xffffff);
	luzPuntual4.position.x=10;
	luzPuntual4.position.y=10;
	luzPuntual4.position.z=10;
	escena4.add(luzPuntual4);

camara4=new THREE.PerspectiveCamera();
camara4.position.z=5;

renderer4=new THREE.WebGLRenderer();
renderer4.setSize(window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderer4.domElement);
}

function loop4(){
  requestAnimationFrame(loop4);
  malla4.rotation.x += 0.01;
  malla4.rotation.y += 0.01;
  renderer4.render(escena4,camara4);
}

var camara4,escena4,renderer4,malla4;

setup4();
loop4();

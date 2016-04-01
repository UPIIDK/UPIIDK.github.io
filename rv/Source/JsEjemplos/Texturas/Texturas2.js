function setup2(){
 THREE.ImageUtils.crossOrigin='';
 var textura=THREE.ImageUtils.loadTexture('http://threejs.org/examples/textures/brick_diffuse.jpg');
 var material=new THREE.MeshLambertMaterial({map:textura});
 var forma=new THREE.BoxGeometry(1,4,9);
 malla2=new THREE.Mesh(forma,material);

escena2= new THREE.Scene();
escena2.add(malla2);

var luzPuntual2=new THREE.PointLight(0xffffff);
	luzPuntual2.position.x=10;
	luzPuntual2.position.y=10;
	luzPuntual2.position.z=10;
	escena2.add(luzPuntual2);

camara2=new THREE.PerspectiveCamera();
camara2.position.z=15;

renderer2=new THREE.WebGLRenderer();
renderer2.setSize(window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderer2.domElement);
}

function loop2(){
  requestAnimationFrame(loop2);
  malla2.rotation.x += 0.01;
  malla2.rotation.y += 0.01;
  renderer2.render(escena2,camara2);
}

var camara2,escena2,renderer2,malla2;

setup2();
loop2();

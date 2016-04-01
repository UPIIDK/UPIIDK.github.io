function setup5(){
 THREE.ImageUtils.crossOrigin='';
 var textura=THREE.ImageUtils.loadTexture('E:/UPIITA/RealidadVirtual/Ejemplos/planetatierra-copy.jpg');
 var material=new THREE.MeshPhongMaterial({map:textura});
 var forma=new THREE.SphereGeometry(1);
 malla5=new THREE.Mesh(forma,material);
malla5.rotation.z +=0.25;
escena5= new THREE.Scene();
escena5.add(malla5);

var luzPuntual5=new THREE.PointLight(0xffffff);
	luzPuntual5.position.x=10;
	luzPuntual5.position.y=10;
	luzPuntual5.position.z=10;
	escena5.add(luzPuntual5);

camara5=new THREE.PerspectiveCamera();
camara5.position.z=5;

renderer5=new THREE.WebGLRenderer();
renderer5.setSize(window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderer5.domElement);
}

function loop5(){
  requestAnimationFrame(loop5);
  malla5.rotation.x += 0.01;
  malla5.rotation.y += 0.01;
  renderer5.render(escena5,camara5);
}

var camara5,escena5,renderer5,malla5;

setup5();
loop5();

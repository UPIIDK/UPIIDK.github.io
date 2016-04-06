function Llanta(angx,angy,angz){
 THREE.Object3D.call(this);
 THREE.ImageUtils.crossOrigin='';
 var texturaLlanta=THREE.ImageUtils.loadTexture('E:\ \UPIITA\RealidadVirtual\Imagenes\LLanta.jpg');
 this.llanta=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,1),new THREE.MeshLambertMaterial({map:texturaLlanta}));
 var rotx=new THREE.Matrix4().makeRotationX(angx);
 var roty=new THREE.Matrix4().makeRotationY(angy);
 var rotz=new THREE.Matrix4().makeRotationZ(angz);
 this.llanta.applyMatrix(rotx);
 this.llanta.applyMatrix(roty);
 this.llanta.applyMatrix(rotz);
 this.add(this.llanta);
}

function posicionLlanta(cosa,xp,yp,zp){
 cosa.position.x=xp;
 cosa.position.y=yp;
 cosa.position.z=zp;
}

function Cuerpo(){
 THREE.Object3D.call(this);
 THREE.ImageUtils.crossOrigin='';
 var texturaPlaca=THREE.ImageUtils.loadTexture('E:\ \UPIITA\RealidadVirtual\Imagenes\LLanta.jpg');
 var texturaCaja=THREE.ImageUtils.loadTexture('E:\ \UPIITA\RealidadVirtual\Imagenes\MetalRayado.jpg');
 var texturaCabeza=THREE.TextureLoader('E:\ \UPIITA\RealidadVirtual\Imagenes\Helmet.jpg');
 this.placa=new THREE.Mesh(new THREE.BoxGeometry(3,10,6),new THREE.MeshPhongMaterial({map:texturaPlaca})); //Color CÁFE 
 this.caja=new THREE.Mesh(new THREE.BoxGeometry(3,4,14),new THREE.MeshPhongMaterial({map:texturaCaja})); //Color Azul
 this.cam=new THREE.Mesh(new THREE.SphereGeometry(2),new THREE.MeshLambertMaterial({map:texturaCabeza})); //Color Rosa
 var rotcam= new THREE.Matrix4().makeRotationZ(Math.PI/2);
 this.placa.position.y=4;
 this.caja.position.y=11;
 this.cam.applyMatrix(rotcam);
 this.cam.position.y=15;
 this.add(this.placa);
 this.add(this.caja);
 this.add(this.cam);
}

function Robot(){
 THREE.Object3D.call(this);
 this.llanta1=new Llanta(Math.PI/2,0,0);
 this.llanta3=new Llanta(Math.PI/2,0,0);
 this.llanta4=new Llanta(Math.PI/2,0,0);
 this.llanta6=new Llanta(Math.PI/2,0,0);
 posicionLlanta(this.llanta1,-1.5,-0.75,1.75);
 posicionLlanta(this.llanta3,1.5,-0.75,1.75);
 posicionLlanta(this.llanta4,-1.5,-0.75,-1.75);
 posicionLlanta(this.llanta6,1.5,-0.75,-1.75);
 this.cuerpobot=new Cuerpo();
 this.add(this.llanta1,this.llanta3,this.llanta4,this.llanta6);
 this.add(this.cuerpobot);
}

Llanta.prototype=new THREE.Object3D();
Cuerpo.prototype=new THREE.Object3D();
Robot.prototype=new THREE.Object3D();

function setup(){
 var luzPuntual=new THREE.PointLight(0xffffff);
 luzPuntual.position.x=15;
 luzPuntual.position.y=15;
 luzPuntual.position.z=15;
 rob=new Robot();
 escena=new THREE.Scene();
 escena.add(rob,luzPuntual);
 camara=new THREE.PerspectiveCamera();
 camara.position.y=22;
 renderer=new THREE.WebGLRenderer();
 renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
 document.body.appendChild(renderer.domElement);
}

function loop(){
var timer = Date.now() * 0.0002;
camara.position.x = Math.cos( timer ) * 35;
camara.position.z = Math.sin( timer ) * 15;
camara.lookAt( escena.position );
requestAnimationFrame(loop);
renderer.render(escena,camara);
rob.llanta1.rotation.z+=0.01;
rob.llanta3.rotation.z+=0.01;
rob.llanta4.rotation.z+=0.01;
rob.llanta6.rotation.z+=0.01;
}

var escena,camara,renderer,rob;
setup();
loop();

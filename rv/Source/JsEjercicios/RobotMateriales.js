function Llanta(angx,angy,angz){
 THREE.Object3D.call(this);
 this.llanta=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,1),new THREE.MeshLambertMaterial({color:0x3f3f3f}));
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
 this.placa=new THREE.Mesh(new THREE.BoxGeometry(3,10,6),new THREE.MeshPhongMaterial({color:0x7A5100})); //Color CÁFE 
 this.caja=new THREE.Mesh(new THREE.BoxGeometry(3,4,14),new THREE.MeshPhongMaterial({color:0x3332FE})); //Color Azul
 this.cam=new THREE.Mesh(new THREE.SphereGeometry(2),new THREE.MeshLambertMaterial({color:0xff97A7})); //Color Rosa
 var rotcam= new THREE.Matrix4().makeRotationZ(Math.PI/2);
 this.placa.position.y=4;
 this.caja.position.y=13;
 this.cam.applyMatrix(rotcam);
 this.cam.position.y=18;
 this.add(this.placa);
 this.add(this.caja);
 this.add(this.cam);
}

function Robot(){
 THREE.Object3D.call(this);
 this.llanta1=new Llanta(Math.PI/2,0,0);
 this.llanta2=new Llanta(Math.PI/2,0,0);
 this.llanta3=new Llanta(Math.PI/2,0,0);
 this.llanta4=new Llanta(Math.PI/2,0,0);
 this.llanta5=new Llanta(Math.PI/2,0,0);
 this.llanta6=new Llanta(Math.PI/2,0,0);
 posicionLlanta(this.llanta1,-1,0,1);
 posicionLlanta(this.llanta3,1,0,1);
 posicionLlanta(this.llanta4,-1,0,-1);
 posicionLlanta(this.llanta6,1,0,-1);
 this.cuerpobot=new Cuerpo();
 this.add(this.llanta1,this.llanta3,this.llanta4,this.llanta6);
 this.add(this.cuerpobot);
}

Llanta.prototype=new THREE.Object3D();
Cuerpo.prototype=new THREE.Object3D();
Robot.prototype=new THREE.Object3D();

function setup(){
 var luzPuntual=new THREE.PointLight(0xffffff);
 luzPuntual.position.x=10;
 luzPuntual.position.y=10;
 luzPuntual.position.z=10;
 rob=new Robot();
 escena=new THREE.Scene();
 escena.add(rob,luzPuntual);
 camara=new THREE.PerspectiveCamera();
 camara.position.y=40;
 renderer=new THREE.WebGLRenderer();
 renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
 document.body.appendChild(renderer.domElement);
}

function loop(){
var timer = Date.now() * 0.0002;
camara.position.x = Math.cos( timer ) * 10;
camara.position.z = Math.sin( timer ) * 10;
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


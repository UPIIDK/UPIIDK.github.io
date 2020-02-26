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
 this.llanta2=new Llanta(Math.PI/2,0,0);
 this.llanta3=new Llanta(Math.PI/2,0,0);
 this.llanta4=new Llanta(Math.PI/2,0,0);
 this.llanta5=new Llanta(Math.PI/2,0,0);
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

function setupRobot(){
 oluzPuntual=new THREE.PointLight(0xffffff);
 oluzPuntual.position.x=15;
 oluzPuntual.position.y=15;
 oluzPuntual.position.z=15;
 orob=new Robot();
 oescena=new THREE.Scene();
 oescena.add(orob,oluzPuntual);
 ocamara=new THREE.PerspectiveCamera();
 ocamara.position.y=22;
 let myCanvas = document.getElementById("RobotDK");
 orenderer=new THREE.WebGLRenderer({canvas: myCanvas});
 orenderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
 //document.body.appendChild(renderer.domElement); Use only when dont have nothing on body for add a canvas.
}

function loopRobot(){
var timer = Date.now() * 0.0002;
ocamara.position.x = Math.cos( timer ) * 35;
ocamara.position.z = Math.sin( timer ) * 15;
oluzPuntual.position.x = Math.cos( timer ) * 35;
oluzPuntual.position.z = Math.sin( timer ) * 15;
oluzPuntual.lookAt(oescena.position);
ocamara.lookAt( oescena.position );
requestAnimationFrame(loopRobot);
orenderer.render(oescena,ocamara);
orob.llanta1.rotation.z+=0.01;
orob.llanta3.rotation.z+=0.01;
orob.llanta4.rotation.z+=0.01;
orob.llanta6.rotation.z+=0.01;
}

var oescena, ocamara, orenderer, orob, oluzPuntual;
setupRobot();
loopRobot();


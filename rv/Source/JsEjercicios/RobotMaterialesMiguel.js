function Robot(){

THREE.Object3D.call(this);
this.cab=new THREE.Mesh(new THREE.BoxGeometry( 5, 2, 2.5 ),new THREE.MeshNormalMaterial() );

this.cab.position.x=-7;
this.cab.position.y=-9;

this.add(this.cab);


}
///////////////////////////////////////////////
function Robot1(){

THREE.Object3D.call(this);
//this.cab=new THREE.Mesh(new THREE.BoxGeometry( 5, 2, 2.5 ));
this.pierna=new THREE.Mesh(new THREE.BoxGeometry(3,10,1),new THREE.MeshPhongMaterial({color: '#00cc00'}));
this.pie=new THREE.Mesh(new THREE.BoxGeometry(3,3,4),new THREE.MeshNormalMaterial({color: '#00cc00'}));
//this.brazo=new THREE.Mesh(new THREE.BoxGeometry(3,5,1));
//this.esfera= new THREE.Mesh(new THREE.SphereGeometry(2));
//this.pie= new THREE.Mesh(new THREE.BoxGeometry(2,1,1));

this.pierna.position.y=-30;
this.pierna.position.x=-2;
this.pie.position.y=-35;
this.pie.position.x=-2;

this.add(this.pierna);
this.add(this.pie);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////
Robot.prototype=new THREE.Object3D();
Robot1.prototype=new THREE.Object3D();

//Braz.prototype=new THREE.Object3D();
function setup(){
  var esfera= new THREE.Mesh(new THREE.SphereGeometry(2),new THREE.MeshNormalMaterial());
  var cilindro=new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5,4),new THREE.MeshPhongMaterial({color: '#00ff00'}));
 var caja=new THREE.Mesh(new THREE.BoxGeometry(10,10,2.5),new THREE.MeshNormalMaterial());
 var caja1=new THREE.Mesh(new THREE.BoxGeometry( 3, 3, 2.5 ),new THREE.MeshPhongMaterial({color: '#00ffff'}));
 var caja2=new THREE.Mesh(new THREE.BoxGeometry( 9, 9, 5 ),new THREE.MeshNormalMaterial());
 
 var luzPuntual=new THREE.PointLight(0xFFFFFF);
luzPuntual.position.x=10;
luzPuntual.position.y=10;
luzPuntual.position.z=10;
//var cuerpo= new THREE.Mesh(new THREE.CylinderGeometry(1,2,5,10));
cabD= new Robot();
cabI= new Robot();

piernaD=new Robot1();
piernaI=new Robot1();


//piernaI=new Robot();
//brazoD=new Braz();
//brazoI=new Braz();


esfera.position.y=2;
cilindro.position.y=-2;
caja.position.y=-9;
cabI.position.x=14;
cabI.position.y=0;
caja1.position.y=-15;
caja2.position.y=-20;
piernaI.position.x=4;
//brazoI.position.x=-6;

//brazoI.position.y=-26;
//brazoI.position.x=3;
//piernaD.position.z=-1;
//piernaI.position.z=1;

step=0.01;
escena= new THREE.Scene();
escena.add(esfera);
escena.add(cilindro);
escena.add(caja);
escena.add(cabD);
escena.add(cabI);
escena.add(caja1);
escena.add(caja2);
escena.add(piernaD);
escena.add(piernaI);

escena.add(luzPuntual);

//escena.add(brazoD);
//escena.add(brazoI);

//escena.add(piernaD);
//escena.add(piernaI);

camara=new THREE.PerspectiveCamera();
camara.position.z=90;

renderer= new THREE.WebGLRenderer();
renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderer.domElement);
}

function loop(){
requestAnimationFrame(loop);

//malla.rotation.x +=0.01;
renderer.render(escena,camara);

if(Math.abs(piernaD.rotation.x)>.3)
step=-step;

piernaD.rotation.x +=step;
piernaI.rotation.x -=step;

//if(Math.abs(pieD.rotation.x)>.3)
//step=-step;
//pieD.rotation.x +=step;

}

var escena,camara, renderer;
var step, piernaD,piernaI;

setup();
loop();

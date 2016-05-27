function Sensor(position, direction) {
  THREE.Raycaster.call(this,position, direction);
  this.colision = false;
}

Sensor.prototype = new THREE.Raycaster();

function Robot (size, x,y){
  Agent.call(this,x,y);
  this.sensor = new Sensor();
  this.actuator = new THREE.Mesh(new THREE.SphereGeometry(size),new THREE.MeshNormalMaterial({color:'#aa0000'}));
  this.actuator.commands=[];
  this.add(this.actuator);
//  iNICIO
  THREE.ImageUtils.crossOrigin=' ';
var textura= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen1.jpg');
var material= new THREE.MeshPhongMaterial({map: textura});
var forma= new THREE.SphereGeometry(2);
malla= new THREE.Mesh(forma,material);
malla.position.y=y+2;

THREE.ImageUtils.crossOrigin=' ';
var textura1= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen2.JPG');
var material1= new THREE.MeshPhongMaterial({map: textura1});
var forma1=new THREE.CylinderGeometry(1.5, 1.5,4);
malla1= new THREE.Mesh(forma1,material1);
malla1.position.y=y-2;

var textura2= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen4.jpg');
var material2= new THREE.MeshPhongMaterial({map: textura2});
var forma2=new THREE.BoxGeometry(10,10,2.5);
malla2= new THREE.Mesh(forma2,material2);
malla2.position.y=y-9;

var textura3= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen3.jpg');
var material3= new THREE.MeshPhongMaterial({map: textura3});
var forma3=new THREE.BoxGeometry( 5, 2, 2.5 )
malla3= new THREE.Mesh(forma3,material3);
malla3.position.x=x-7.5;
malla3.position.y=y-9;

var textura4= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen3.jpg');
var material4= new THREE.MeshPhongMaterial({map: textura4});
var forma4=new THREE.BoxGeometry( 5, 2, 2.5 )
malla4= new THREE.Mesh(forma4,material4);
malla4.position.x=x+7.5;
malla4.position.y=y-9;

var textura5= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen3.jpg');
var material5= new THREE.MeshPhongMaterial({map: textura5});
var forma5=new THREE.BoxGeometry( 3, 3, 2.5);
malla5= new THREE.Mesh(forma5,material5);
//malla5.position.x=7;
malla5.position.y=y-15;

var textura6= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen5.JPG');
var material6= new THREE.MeshPhongMaterial({map: textura6});
var forma6=new THREE.BoxGeometry( 9, 9, 5 )
malla6= new THREE.Mesh(forma6,material6);
//malla5.position.x=7;
malla6.position.y=y-20;

var textura7= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen7.jpg');
var material7= new THREE.MeshPhongMaterial({map: textura7});
var forma7=new THREE.BoxGeometry(3,10,1);
malla7= new THREE.Mesh(forma7,material7);
malla7.position.x=x-3;
malla7.position.y=y-30;

var textura8= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen7.jpg');
var material8= new THREE.MeshPhongMaterial({map: textura8});
var forma8=new THREE.BoxGeometry(3,10,1);
malla8= new THREE.Mesh(forma8,material8);
malla8.position.x=x+3;
malla8.position.y=y-30;

var textura9= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen8.jpg');
var material9= new THREE.MeshPhongMaterial({map: textura9});
var forma9=new THREE.BoxGeometry(3,5,3);
malla9= new THREE.Mesh(forma9,material9);
malla9.position.x=x-6;
malla9.position.y=y-21;

var textura10= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen8.jpg');
var material10= new THREE.MeshPhongMaterial({map: textura10});
var forma10=new THREE.BoxGeometry(3,5,3);
malla10= new THREE.Mesh(forma10,material10);
malla10.position.x=x+6;
malla10.position.y=y-21;

/*var luzPuntual=new THREE.PointLight(0xFFFFFF);
luzPuntual.position.x=500;
luzPuntual.position.y=500;
luzPuntual.position.z=500;
*/

escena=new THREE.Scene();
escena.add(malla);
escena.add(malla1);
escena.add(malla2);
escena.add(malla3);
escena.add(malla4);
escena.add(malla5);
escena.add(malla6);
escena.add(malla7);
escena.add(malla8);
escena.add(malla9);
escena.add(malla10);
//escena.add(luzPuntual);

/*camara=new THREE.PerspectiveCamera();
camara.position.z=90;*/
step=0.01;
step1=0.02;
}


//FiN


Robot.prototype = new Agent();

Robot.prototype.sense = function(environment){
  this.sensor.set(this.position, new THREE.Vector3(Math.cos(this.rotation.z),Math.sin(this.rotation.z),0));
  var obstaculo= this.sensor.intersectObjects(environment.children,true);
  if((obstaculo.length>0 && (obstaculo[0].distance<=.5)))
    this.sensor.colision=true;
  else
    this.sensor.colision=false;
}
Robot.prototype.plan=function (environment){
  this.actuator.commands=[];
  if (this.sensor.colision==true)
    this.actuator.commands.push('rotateCCW');
  else
    this.actuator.commands.push('goStraight');
}
Robot.prototype.act=function(environment){
  var command=this.actuator.commands.pop();
  if( command==undefined)
    console.log('Undefined command');
  else if(command in this.operations)
    this.operations[command](this);
  else
    console.log('Unknown command');
}
  
  //las operaciones posibles con este robot son
  //goStraight()
  //rotateCW()
  //rotateCCW()
  
  Robot.prototype.operations={};
  
  Robot.prototype.operations.goStraight= function(robot, distance){
  if(distance== undefined)
    distance= .05;
  robot.position .x+= distance*Math.cos(robot.rotation.z);
  robot.position .y+= distance*Math.sin(robot.rotation.z);
  
}

Robot.prototype.operations.rotateCW= function (robot,angle){
  if(angle==undefined)
   angle = -Math.PI/2;
  robot.rotation.z+=angle;
}

Robot.prototype.operations.rotateCCW=function(robot,angle){
  if(angle== undefined)
    angle = Math.PI/2;
  robot.rotation.z+=angle;
}

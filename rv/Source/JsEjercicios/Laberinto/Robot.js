function CuerpoRobot(Tmaño,x,y,z){
THREE.Object3D.call(this);
  //  iNICIO
THREE.ImageUtils.crossOrigin=' ';
var texturaC= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen1.jpg');
this.Camara= new THREE.Mesh(new THREE.SphereGeometry(0.2/Tmaño) ,new THREE.MeshPhongMaterial({map: texturaC}));
this.Camara.position.y=0.5/y;
this.Camara.position.z=z+(0.4/Tmaño)+(0.5/Tmaño)+(1/Tmaño)+(0.3/Tmaño)+(0.5/Tmaño);

var texturaA= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen2.JPG');
this.Antena= new THREE.Mesh(new THREE.CylinderGeometry(0.15/Tmaño,0.15/Tmaño,0.4/Tmaño),new THREE.MeshPhongMaterial({map: texturaA}));
var AA=0.4/Tmaño;
this.Antena.position.y=0.5/y;
this.Antena.rotation.x=Math.PI/2;
this.Antena.position.z=z+(0.5/Tmaño)+(1/Tmaño)+(0.3/Tmaño)+(0.5/Tmaño);

var texturaR= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen4.jpg');
this.Rostro= new THREE.Mesh(new THREE.BoxGeometry(0.6/Tmaño,0.6/Tmaño,0.5/Tmaño),new THREE.MeshPhongMaterial({map: texturaR}));
this.Rostro.position.y=0.5/y;
var AR=1/Tmaño;//Altura Rostro
this.Rostro.position.z=z+(0.5/Tmaño)+(1/Tmaño)+(0.3/Tmaño);
this.Rostro.rotation.x=Math.PI/2;

var texturaO= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen3.jpg');
this.OrejaI= new THREE.Mesh(new THREE.BoxGeometry(0.5/Tmaño, 0.25/Tmaño, 0.2/Tmaño ),new THREE.MeshPhongMaterial({map: texturaO}));
this.OrejaI.position.x=((-0.6/Tmaño)+(-0.5/Tmaño))/x;
this.OrejaI.position.y=0.5/y;
this.OrejaI.position.z=z+(0.5/Tmaño)+(1/Tmaño)+(0.3/Tmaño);

this.OrejaD= new THREE.Mesh(new THREE.BoxGeometry( 0.5/Tmaño, 0.25/Tmaño, 0.2/Tmaño ),new THREE.MeshPhongMaterial({map: texturaO}));
this.OrejaD.position.x=((0.6/Tmaño)+(0.5/Tmaño))/x;
this.OrejaD.position.y=0.5/y;
this.OrejaD.position.z=z+(0.5/Tmaño)+(1/Tmaño)+(0.3/Tmaño);

this.Cuello= new THREE.Mesh(new THREE.BoxGeometry(0.25/Tmaño,0.3/Tmaño,0.25/Tmaño),new THREE.MeshPhongMaterial({map: texturaO}));
var AC=0.25/Tmaño;//Altura Cuello
this.Cuello.position.y=0.5/y;
this.Cuello.position.z=z+(0.5/Tmaño)+(1/Tmaño);

var texturaB= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen8.jpg');
this.BrazoI= new THREE.Mesh(new THREE.BoxGeometry(0.5/Tmaño,0.3/Tmaño,0.5/Tmaño),new THREE.MeshPhongMaterial({map: texturaB}));
this.BrazoI.position.x=-0.6/x;
this.BrazoI.position.y=0.5/y;
this.BrazoI.position.z=z+(1/Tmaño);

this.BrazoD= new THREE.Mesh(new THREE.BoxGeometry(0.5/Tmaño,0.3/Tmaño,0.5/Tmaño),new THREE.MeshPhongMaterial({map: texturaB}));
this.BrazoD.position.x=0.6/x;
this.BrazoD.position.y=0.5/y;
this.BrazoD.position.z=z+(1/Tmaño);

var texturaP= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen5.JPG');
this.Panza= new THREE.Mesh(new THREE.BoxGeometry(0.5/Tmaño,0.5/Tmaño,0.9/Tmaño ),new THREE.MeshPhongMaterial({map: texturaP}));
var AP=0.5/Tmaño;
this.Panza.position.y=0.5/y;
this.Panza.position.z=z+(1/Tmaño);
this.Panza.rotation.z=Math.PI;

var texturaPn= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen7.jpg');
this.PiernaI= new THREE.Mesh(new THREE.BoxGeometry(0.25/Tmaño,0.25/Tmaño,1/Tmaño),new THREE.MeshPhongMaterial({map: texturaPn}));
this.PiernaI.position.x=-0.75/x;
this.PiernaI.position.y=0.5/y;
this.PiernaI.position.z=z;
this.PiernaI.rotation.z=Math.PI/2;
var APS=1/Tmaño;

this.PiernaD= new THREE.Mesh(new THREE.BoxGeometry(0.25/Tmaño,0.25/Tmaño,1/Tmaño),new THREE.MeshPhongMaterial({map: texturaPn}));
this.PiernaD.position.x=0.75/x;
this.PiernaD.position.y=0.5/y;
this.PiernaD.position.z=z;
this.PiernaD.rotation.z=Math.PI/2;

step=0.01;
step1=0.02;
//FiN
this.add(this.Camara,this.Rostro,this.Antena,this.PiernaI,this.PiernaD,this.BrazoD,this.BrazoI,this.Panza,this.OrejaI,this.OrejaD,this.Cuello);
}
CuerpoRobot.prototype=new THREE.Object3D();

function Sensor(position, direction) {
  THREE.Raycaster.call(this,position, direction);
  this.colision = false;
}

Sensor.prototype = new THREE.Raycaster();

function Robot (size, x,y,z){
  Agent.call(this,x,y);
  //var texturar=THREE.ImageUtils.loadTexture('https://UPIIDK.github.io/rv/Imagenes/LLanta.jpg');
  this.sensor = new Sensor();
  //this.actuator = new THREE.Mesh(new THREE.SphereGeometry(size),new THREE.MeshBasicMaterial({map: texturar}));
  this.actuator=new CuerpoRobot(size,x,y,z);
  this.actuator.rotation.z=Math.PI/2;
  this.actuator.commands=[];
  this.actuator.size=size;
  this.add(this.actuator);
}

Robot.prototype = new Agent();

Robot.prototype.sense = function(environment){
  this.sensor.set(this.position, new THREE.Vector3(Math.cos(this.rotation.z),Math.sin(this.rotation.z),0));
  var obstaculo= this.sensor.intersectObjects(environment.children,true);
  if((obstaculo.length>0 && (obstaculo[0].distance<=.5)))
    this.sensor.colision=true;
  else
    this.sensor.colision=false;
    /*
    this.sensor.set(this.position, new THREE.Vector3(Math.cos(this.rotation.z),Math.sin(this.rotation.z),0));
//this.sensor.set(this.position, new THREE.Vector3(12,12,0));
this.sensor2.set(this.position, new THREE.Vector3(1,0,0));
this.sensor3.set(this.position, new THREE.Vector3(-1,0,0));
this.sensor4.set(this.position, new THREE.Vector3(0,1,0));
this.sensor5.set(this.position, new THREE.Vector3(0,-1,0));
 var obstaculo = this.sensor.intersectObjects(environment.children,true);
 var obstaculo2 = this.sensor2.intersectObjects(environment.children,true);
var obstaculo3 = this.sensor3.intersectObjects(environment.children,true);
var obstaculo4 = this.sensor4.intersectObjects(environment.children,true);
var obstaculo5 = this.sensor5.intersectObjects(environment.children,true);
 if ((obstaculo.length>0&&(obstaculo[0].distance<=1))){
  this.sensor.colision=true;
  console.log(px);
  console.log(py);}
 else
  this.sensor.colision=false;

 if((obstaculo2.length>0&&(obstaculo2[0].distance<=1)))
  this.sensor2.colision=true;
 else
  this.sensor2.colision=false;

if((obstaculo3.length>0&&(obstaculo3[0].distance<=1)))
  this.sensor3.colision=true;
 else
  this.sensor3.colision=false;

if((obstaculo4.length>0&&(obstaculo4[0].distance<=1)))
  this.sensor4.colision=true;
 else
  this.sensor4.colision=false;

if((obstaculo5.length>0&&(obstaculo5[0].distance<=1)))
  this.sensor5.colision=true;
 else
  this.sensor5.colision=false;

    */
}
//las operaciones posibles con este robot son
  //goStraight()
  //rotateCW()
  //rotateCCW()
  //Stop()
Robot.prototype.plan=function (environment){
  this.actuator.commands=[];
  if (this.sensor.colision==true){
    this.actuator.commands.push('Stop');
    this.actuator.commands.push('rotateCCW')
    //if(this.sensor.colision==true)
    //this.actuator.commands.push('Animation');
}
  else{
    this.actuator.commands.push('goStraight');
    //this.actuator.commands.push('Animation');
  }
  /*
   this.actuator.commands=[];


  if(this.sensor.colision==false)
  this.actuator.commands.push('Sigue');

else if(px==10.499999999999975 && py==11.599999999999953)
this.actuator.commands.push('Para');
else if(this.sensor3.colision==true && this.sensor5.colision==true)
  this.actuator.commands.push('Derecha');

else if(this.sensor3.colision==true && this.sensor4.colision==true)
  this.actuator.commands.push('Derecha');

else if(this.sensor2.colision==true && this.sensor4.colision==false)
  this.actuator.commands.push('Izquierda');


 else if(this.sensor.colision==true && this.sensor2.colision==true)
   this.actuator.commands.push('Izquierda');

else if(this.sensor.colision==true )
  this.actuator.commands.push('Izquierda');
  */
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
  //Stop()
  
  Robot.prototype.operations={};
  Robot.prototype.operations.Animation= function(robot){
//CuerpoRobot.Camara.rotation.x +=0.01;
/*robot.Camara.rotation.y +=0.01;
robot.OrejaD.rotation.x +=0.01;
robot.OrejaI.rotation.x +=0.01;
/*if(Math.abs(robot.PiernaD.rotation.x)>.3){
step1=-step1;
robot.PieraD.rotation.x +=step1;
robot.BrazoD.rotation.x -=step1;
}
if(Math.abs(robot.PiernaI.rotation.x)>.3){
step=-step;
robot.PiernaI.rotation.x +=step;
robot.BrazoI.rotation.x -=step;
}
//FIN*/
  }
  Robot.prototype.operations.goStraight= function(robot, distance){
  if(distance== undefined)
    distance= .01;
  robot.position.x+= distance*Math.cos(robot.rotation.z);
  robot.position.y+= distance*Math.sin(robot.rotation.z);
  camara.position.x+=distance*Math.cos(robot.rotation.z);
  camara.position.y+=distance*Math.sin(robot.rotation.z);
  luzPuntual.position.x+=distance*Math.cos(robot.rotation.z);
  luzPuntual.position.y+=distance*Math.cos(robot.rotation.z);
}

Robot.prototype.operations.rotateCW= function (robot,angle){
  if(angle==undefined)
   angle = -Math.PI/2;
   //Primera Persona
  robot.rotation.z+=angle;
  camara.rotation.y+=angle;
   luzPuntual.rotation.z+=angle;
   camara.updateProjectionMatrix();
}

Robot.prototype.operations.rotateCCW=function(robot,angle){
  if(angle== undefined)
    angle = Math.PI/2;
  //Primera Persona
  robot.rotation.z+=angle;
  camara.rotation.y-=angle;
  camara.updateProjectionMatrix();
  luzPuntual.rotation.z+=angle;
}
Robot.prototype.operations.Stop=function(robot, distance){
   if(distance== undefined)
    distance= .05;
    //Primera Persona
  robot.position .x+= 0;
  robot.position .y+= 0;
  camara.position.x+=0;
  camara.position.y+= 0;
 luzPuntual.position.x+=distance*Math.cos(robot.rotation.z);
  luzPuntual.position.y+=distance*Math.cos(robot.rotation.z);
}

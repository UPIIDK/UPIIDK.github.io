function CuerpoRobot(Tmaño,x,y){
var Bot=new Array();
THREE.Object3D.call(this);
  //  iNICIO
THREE.ImageUtils.crossOrigin=' ';
var texturaC= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen1.jpg');
this.Bot[0]=Camara= new THREE.Mesh(new THREE.SphereGeometry(Tmaño+2) ,new THREE.MeshPhongMaterial({map: texturaC}));
this.Camara.position.y=y+2;

var texturaA= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen2.JPG');
this.Bot[1]=Antena= new THREE.Mesh(new THREE.CylinderGeometry(Tmaño+1.5, Tmaño+1.5,Tmaño+4),new THREE.MeshPhongMaterial({map: texturaA}));
this.Antena.position.y=y-2;

var texturaR= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen4.jpg');
this.Bot[2]=Rostro= new THREE.Mesh(new THREE.BoxGeometry(Tmaño+10,Tmaño+10,Tmaño+2.5),new THREE.MeshPhongMaterial({map: texturaR}));
this.Rostro.position.y=y-9;

var texturaO= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen3.jpg');
this.Bot[3]=OrejaI= new THREE.Mesh(new THREE.BoxGeometry( Tmaño+5, Tmaño+2, Tmaño+2.5 ),new THREE.MeshPhongMaterial({map: texturaO}));
this.OrejaI.position.x=x-7.5;
this.OrejaI.position.y=y-9;

this.Bot[4]=OrejaD= new THREE.Mesh(new THREE.BoxGeometry( Tmaño+5, Tmaño+2, Tmaño+2.5 ),new THREE.MeshPhongMaterial({map: texturaO}));
this.OrejaD.position.x=x+7.5;
this.OrejaD.position.y=y-9;

this.Bot[5]=Cuello= new THREE.Mesh(new THREE.BoxGeometry( Tmaño+3, Tmaño+3, Tmaño+2.5),new THREE.MeshPhongMaterial({map: texturaO}));
//malla5.position.x=7;
this.Cuello.position.y=y-15;

var texturaP= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen5.JPG');
this.Bot[6]=Panza= new THREE.Mesh(new THREE.BoxGeometry( Tmaño+9, Tmaño+9, Tmaño+5 ),new THREE.MeshPhongMaterial({map: texturaP}));
//malla5.position.x=7;
this.Panza.position.y=y-20;

var texturaPn= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen7.jpg');
this.Bot[7]=PiernaI= new THREE.Mesh(new THREE.BoxGeometry(Tmaño+3,Tmaño+10,Tmaño+1),new THREE.MeshPhongMaterial({map: texturaPn}));
this.PiernaI.position.x=x-3;
this.PiernaI.position.y=y-30;

this.Bot[8]=PiernaD= new THREE.Mesh(new THREE.BoxGeometry(Tmaño+3,Tmaño+10,Tmaño+1),new THREE.MeshPhongMaterial({map: texturaPn}));
this.PiernaD.position.x=x+3;
this.PiernaD.position.y=y-30;

var texturaB= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen8.jpg');
this.Bot[9]=BrazoI= new THREE.Mesh(new THREE.BoxGeometry(Tmaño+3,Tmaño+5,Tmaño+3),new THREE.MeshPhongMaterial({map: texturaB}));
this.BrazoI.position.x=x-6;
this.BrazoI.position.y=y-21;

this.Bot[10]=BrazoD= new THREE.Mesh(new THREE.BoxGeometry(Tmaño+3,Tmaño+5,Tmaño+3),new THREE.MeshPhongMaterial({map: texturaB}));
this.BrazoD.position.x=x+6;
this.BrazoD.position.y=y-21;

/*escena=new THREE.Scene();
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
escena.add(malla10);*/
//escena.add(luzPuntual);

/*camara=new THREE.PerspectiveCamera();
camara.position.z=90;*/
step=0.01;
step1=0.02;
//FiN
this.add(this.Bot)
}

function Sensor(position, direction) {
  THREE.Raycaster.call(this,position, direction);
  this.colision = false;
}

Sensor.prototype = new THREE.Raycaster();

function Robot (size, x,y){
  Agent.call(this,x,y);
  //var texturar=THREE.ImageUtils.loadTexture('https://UPIIDK.github.io/rv/Imagenes/LLanta.jpg');
  this.sensor = new Sensor();
  //this.actuator = new THREE.Mesh(new THREE.SphereGeometry(size),new THREE.MeshBasicMaterial({map: texturar}));
  this.actuator=new CuerpoRobot(size,x,y);
  this.actuator.commands=[];
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

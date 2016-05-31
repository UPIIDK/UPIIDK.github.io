
function Wall(size,x,y,z){
  THREE.ImageUtils.crossOrigin=' ';
var texturaW= THREE.ImageUtils.loadTexture('http://miguel26.github.io/rv/imagen3.jpg');
  THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,size),new THREE.MeshBasicMaterial({map: texturaW}));
  this.size=size;
  this.position.x=x;
  this.position.y=y;
  this.position.z=z;
}

Wall.prototype=new THREE.Mesh();

Environment.prototype.setMap=function(map){
  var _offset=Math.floor(map.length/2);
  for(var i=0;i<map.length;i++)
  for(var j=0;j<(map.length)-1;j++){
    if(map[i][j] === "x")
      this.add(new Wall(1,j-_offset,-(i-_offset),0));
         if(map[i][j] === "r"){
    this.add(new Robot(1,j-_offset,-(i-_offset)));
    this.add(new Wall(1,j-_offset,-(i-_offset),-1));}
    if(map[i][j]!=="'\0'")
    {
    this.add(new Wall(1,j-_offset,-(i-_offset),-1));
    }
  }
}

function setup(){
  var mapa = new Array();
  mapa[0]  = "xxxxxxxxxxxxxxxxxxxx";
  mapa[1]  = "x  x               x";
  mapa[2]  = "x                  x";
  mapa[3]  = "x                  x";
  mapa[4]  = "x                  x";
  mapa[5]  = "x                  x";
  mapa[6]  = "x                  x";
  mapa[7]  = "x       x          x";
  mapa[8]  = "xxx   xxxx     xxxxx";
  mapa[9]  = "x                  x";
  mapa[10] = "x                  x";
  mapa[11] = "x                  x";
  mapa[12] = "x                  x";
  mapa[13] = "x                  x";
  mapa[14] = "x                  x";
  mapa[15] = "x                  x";
  mapa[16] = "xx   xxxxxxx    xxxx";
  mapa[17] = "x                  x";
  mapa[18] = "x             x    x";
  mapa[19] = "xr            x    x";
  mapa[20] = "xxxxxxxxxxxxxxxxxxxx";
  
  environment = new Environment();
  
  environment.setMap(mapa);
  
  camara=new THREE.PerspectiveCamera();
  camara.position.z=10;
  camara.position.y=-31;
  camara.position.x=-1;
  camara.rotation.x= 1.16;
  
  var luzPuntual=new THREE.PointLight(0xFFFFFF);
luzPuntual.position.x=-10;
luzPuntual.position.y=-300;
luzPuntual.position.z=100;
luzPuntual.rotation.x=1.16;
  
  renderer=new THREE.WebGLRenderer();
  renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
  document.body.appendChild(renderer.domElement);
  
  environment.add(camara,luzPuntual);
}

function loop(){
  requestAnimationFrame(loop);
  
  environment.sense();
  environment.plan();
  environment.act();
  
  renderer.render(environment,camara);
//INICIO
//Robot.Camara.rotation.x +=0.01;
//Camara.rotation.y +=0.01;
//malla.rotation.x +=0.01;
//malla.rotation.y +=0.01;

//Robot.OrejaD.rotation.x +=0.01;
/*OrejaI.rotation.x +=0.01;

//renderer.render(escena);

if(Math.abs(PiernaD.rotation.x)>.3)
step1=-step1;
PieraD.rotation.x +=step1;
BrazoD.rotation.x -=step1;

if(Math.abs(PiernaI.rotation.x)>.3)
step=-step;

PiernaI.rotation.x +=step;
BrazoI.rotation.x -=step;
//FIN*/
}

var environment, camara, renderer;

setup();
loop();

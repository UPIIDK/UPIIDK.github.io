function Wall(size,x,y,z){
  THREE.ImageUtils.crossOrigin=' ';
var texturaW= THREE.ImageUtils.loadTexture('http://UPIIDK.github.io/rv/Imagenes/hoja-metalica.jpg');
  THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,size),new THREE.MeshLambertMaterial({map: texturaW}));
  this.size=size;
  this.position.x=x;
  this.position.y=y;
  this.position.z=z;
}

Wall.prototype=new THREE.Mesh();

function Piso(size,x,y,z){
  THREE.ImageUtils.crossOrigin=' ';
var texturaP= THREE.ImageUtils.loadTexture('http://UPIIDK.github.io/rv/Imagenes/MetalRayado.jpg');
  THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,0.1),new THREE.MeshPhongMaterial({map: texturaP}));
  this.size=size;
  this.position.x=x;
  this.position.y=y;
  this.position.z=z;
}
Piso.prototype=new THREE.Mesh();

Environment.prototype.setMap=function(map){
  var _offset=Math.floor(map.length/2);
  for(var i=0;i<map.length;i++)
  for(var j=0;j<(map.length)-1;j++){
    if(map[i][j] === "x")
      this.add(new Wall(1,j-_offset,-(i-_offset),0));
         if(map[i][j] === "r"){
    this.add(new Robot(1,j-_offset,-(i-_offset)));
    this.add(new Piso(1,j-_offset,-(i-_offset),-0.1));}
    if(map[i][j]!=="'\0'")
    {
    this.add(new Piso(1,j-_offset,-(i-_offset),-0.1));
    }
    if(map[i][j]==="F"){
    var luzMeta=new THREE.PointLight(0x00FF00);
luzMeta.position.z=10;
luzMeta.position.x=i;
luzMeta.position.y=j;
environment.add(luzMeta);
  }
  }
}

function setup(){
  var mapa = new Array();
  mapa[0]  = "xxxxxxxxxxxxxxxxxxxx";
  mapa[1]  = "x  x              Fx";
  mapa[2]  = "x                  x";
  mapa[3]  = "x                  x";
  mapa[4]  = "x     x            x";
  mapa[5]  = "x      x           x";
  mapa[6]  = "x                  x";
  mapa[7]  = "x       x          x";
  mapa[8]  = "xxx   xxxx     xxxxx";
  mapa[9]  = "x                  x";
  mapa[10] = "x       x          x";
  mapa[11] = "x       x          x";
  mapa[12] = "x       xx         x";
  mapa[13] = "x                  x";
  mapa[14] = "x                  x";
  mapa[15] = "x                  x";
  mapa[16] = "xx   xxx  xx    xxxx";
  mapa[17] = "x                  x";
  mapa[18] = "x     r       x    x";
  mapa[19] = "x             x    x";
  mapa[20] = "xxxxxxxxxxxxxxxxxxxx";
  
  environment = new Environment();
  
  environment.setMap(mapa);
  var cara=new Sensor();
  camara=new THREE.PerspectiveCamera();
  /*camara.position.z=(0.5/1)+(1/1)+(0.3/1);
  camara.rotation.x=Math.PI/2;
  camara.rotation.z=-Math.PI/2;
  */
  camara.position=cara.position;
  camara.rotation=cara.rotation;
  
  var luzPuntual=new THREE.PointLight(0xFFFFFF);
luzPuntual.position.z=camara.position.z;
luzPuntual.rotation.x=camara.rotation.x;

  
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

}

var environment, camara, renderer;

setup();
loop();

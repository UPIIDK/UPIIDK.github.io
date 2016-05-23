
function Wall(size,x,y,z){
  THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,size),new THREE.MeshBasicMaterial());
  this.size=size;
  this.position.x=x;
  this.position.y=y;
  this.position.z=z;
}

Wall.prototype=new THREE.Mesh();

Environment.prototype.setMap=function(map){
  var _offset=Math.floor(map.length/2);
  for(var i=0;i<map.length;i++)
  for(var j=0;j<map.length;j++){
    if(map[i][j] === "x")
      this.add(new Wall(1,j-_offset,-(i-_offset)));
        else if(map[i][j] === "r")
    this.add(new Robot(0.5,j-_offset,-(i-_offset)));
  }
}

Environment.prototype.setMap=function(map){
  var _offset=Math.floor(map.length/2);
  for(var i=0;i<map.length;i++)
  for(var j=0;j<map.length;j++){
    if(map[i][j] === "x")
      this.add(new Wall(1,j-_offset,-(i-_offset),-3));
        else if(map[i][j] === "r")
    this.add(new Robot(0.5,j-_offset,-(i-_offset)));
  }
}
function setup(){
  var mapa = new Array();
  mapa[0]  = "xxxxxxxxxxxxxxxxxxxx";
  mapa[1]  = "xr x               x";
  mapa[2]  = "x                  x";
  mapa[3]  = "x                  x";
  mapa[4]  = "x                  x";
  mapa[5]  = "x                  x";
  mapa[6]  = "x                  x";
  mapa[7]  = "x                  x";
  mapa[8]  = "xxx   xxxx     xxxxx";
  mapa[9]  = "x                  x";
  mapa[10] = "x     r            x";
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
  
  var mapaF = new Array();
  mapaF[0]  = "";
  mapaF[1]  = " xxxxxxxxxxxxxxxxxx ";
  mapaF[2]  = " xxxxxxxxxxxxxxxxxx ";
  mapaF[3]  = " xxxxxxxxxxxxxxxxxx ";
  mapaF[4]  = " xxxxxxxxxxxxxxxxxx ";
  mapaF[5]  = " xxxxxxxxxxxxxxxxxx ";
  mapaF[6]  = " xxxxxxxxxxxxxxxxxx ";
  mapaF[7]  = " xxxxxxxxxxxxxxxxxx ";
  mapaF[8]  = " xxxxxxxxxxxxxxxxxx ";
  mapaF[9]  = " xxxxxxxxxxxxxxxxxx ";
  mapaF[10] = " xxxxxxxxxxxxxxxxxx ";
  mapaF[11] = " xxxxxxxxxxxxxxxxxx ";
  mapaF[12] = " xxxxxxxxxxxxxxxxxx ";
  mapaF[13] = " xxxxxxxxxxxxxxxxxx ";
  mapaF[14] = " xxxxxxxxxxxxxxxxxx ";
  mapaF[15] = " xxxxxxxxxxxxxxxxxx ";
  mapaF[16] = " xxxxxxxxxxxxxxxxxx ";
  mapaF[17] = " xxxxxxxxxxxxxxxxxx ";
  mapaF[18] = " xxxxxxxxxxxxxxxxxx ";
  mapaF[19] = " xxxxxxxxxxxxxxxxxx ";
  mapaF[20] = "";
  environment.setMap(mapaF);
  
  camara=new THREE.PerspectiveCamera();
  camara.position.z=30;
  
  renderer=new THREE.WebGLRenderer();
  renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
  document.body.appendChild(renderer.domElement);
  
  environment.add(camera);
}

function loop(){
  requestAnimationFrame(loop);
  
  environment.sense();
  environment.plan();
  environment.act();
  
  renderer.render(environment,camara);
}

var environment, camera, renderer;

setup();
loop();

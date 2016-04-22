wall.prototype = new THREE.Mesh();

Environment.prototype.setMap = function(map){
	var _offset = Math.floor(map.length/2);
	
	for(var i=0; i < map.length; i++)
	for(var j=0; j < map.length; j++){
			if (map[i][j] === "x")
			this.add(new Wall(1,j - _offset, -(i-_offset) ) );}
			else if (map[i][j] === "r")
			this.add (new Robot(0.5, j -_offset, -(i-_offset)));
		}
	}
function setup(){
	var mapa=new Array();
	mapa
environment = new Environment();

environment.setMap(mapa);

camera = new THREE.PerspectiveCamera();
camera.position.z=30;

renderer = new THREE.WebGlRenderer();
renderer.setSize(window.innerHeight*.95, window.innerHeight*.95);
document.body.appendChild(renderer.domElement);
environment.add(camera);
}

function loop(){
	request 

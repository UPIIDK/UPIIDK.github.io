function Agent(x=0, y=0){
	THREE.Object3D.call(this);
	this.position.x=x;
	this.position.y=y;
	}
	
	//prototipo es un OBJECT3D
	
	Agent.prototype = new THREE.Object3D();
	
	//Las primitivas del Agente son: Percibir, planificar y Activar
	
	Agent.prototype.sense=function(environment){};
	Agent.prototype.plan = function(environment){};
	Agent.prototype.act = function(environment){};
	
	//Constructor Enviroment()
	
	function Enviroment(){
	THREE.Scene.call(this);
	}
	
	Environment.prototype=new THREE.Scene();
	
	Environment.prototype.sense=function(){
		for (var i=0; i < this.children.length; i++) { 
			if (this.children[i].sense !== undefined)
				this.children[i].sense(this);
			}
		}
		
	Environment.prototype.plan= function(){
		for (var i=0; i < this.children.length; i++){
		if (this.childre[i].plan !== undefined)
			this.children[i].plan(this);
			}
		}
		
	Environment.prototype.act= function() {
		for(var i=0; i<this.children.length; i++) {
		if (this.children[i].act !== undefined)
			this.children[i].act(this);
		}
	}

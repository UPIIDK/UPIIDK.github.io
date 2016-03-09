function setupLam(){
	var forma = new THREE.BoxGeometry(100,100,500);
	var material = new THREE.MeshDepthMaterial();
	mallaLam =  new THREE.Mesh(forma, material);
	
	escenaLam = new THREE.Scene();
	escenaLam.add(mallaLam);
	
	camaraLam = new THREE.PerspectiveCamera();
	camaraLam.position.z=750;
	
	rendererLam = new THREE.WebGLRenderer();
	rendererLam.setSize(window.innerHeight*.95, window.innerHeight*.95);
	document.body.appendChild(rendererLam.domElement);
	}
	
function loopLam(){
	requestAnimationFrame(loopLam);
	
	mallaLam.rotation.x += 0.01;
	mallaLam.rotation.y +=0.01;
	
	rendererLam.render (escenaLam,camaraLam);
	}
	var mallaLam, escenaLam, camaraLam, rendererLam;
	
	setupLam();
	loopLam();

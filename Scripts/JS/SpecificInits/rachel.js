
var d2;

var hang1, hang2;
var ds=[];
var rotsX=[];
var rotsY=[];
function initSpecific(result) {
	
	hang1 = result.scene.getObjectByName( 'Piece1', true);
	hang2 = result.scene.getObjectByName( 'Piece2', true);
	//d2 = result.scene.getObjectByName( 'diamond2', true);
	
	var img1 = THREE.ImageUtils.loadTexture( 'Assets/Scenes/rachel/hanging1.png' );
	var img2 = THREE.ImageUtils.loadTexture( 'Assets/Scenes/rachel/hanging2.png' );
	var img3 = THREE.ImageUtils.loadTexture( 'Assets/Scenes/rachel/tex.jpg' );
	
	hang1.material = new THREE.MeshBasicMaterial( { color: 0xffffff, ambient: 0xffffff, map:img1, side:THREE.DoubleSide, transparent:true, opacity:1, depthWrite: false, depthTest: true } );
	
	hang2.material = new THREE.MeshBasicMaterial( { color: 0xffffff, ambient: 0xffffff, map:img2, side:THREE.DoubleSide, transparent:true, opacity:1, depthWrite: false, depthTest: true } );
	
	for(var i=0; i<5; i++){
		
		var obj = result.scene.getObjectByName( 'd'+i, true);
		ds[i]=obj;
		rotsX[i]= -.03 + Math.random()*.06;
		rotsY[i]= -.03 + Math.random()*.06;
		
		//obj.material.envMap = reflectionCube;
		//obj.material.combine = THREE.MixOperation;
		//obj.material.reflectivity = 0.4;
		//obj.material.map = img3;
	}

	
	//d2.material = new THREE.MeshLambertMaterial( { color: 0xffffff, map:imgd2, ambient: 0xffffff, map:img2, side:THREE.DoubleSide, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.3 } );
	
	
	//new THREE.MeshBasicMaterial( { side:THREE.BackSide,map:texture,transparency:true, opacity:0.9, depthWrite: false, depthTest: false });

	
}

function updateCamera() {
	
	camera.position.z = 8.0;
	camera.position.x += ( mouseX - camera.position.x ) * .0001;
	camera.position.y += ( -mouseY - camera.position.y ) * .0001;

	
	if(camera.position.x>maxX)camera.position.x=maxX;
	if(camera.position.x<-maxX)camera.position.x=-maxX;
	
	if(camera.position.y>maxY)camera.position.y=maxY;
	if(camera.position.y<-maxY)camera.position.y=-maxY;
	
	//if(d2)
	camera.lookAt( scene.position );
	
	//scene.rotation.y+=.2;
	
	if(cameraCube){
		cameraCube.rotation.copy( camera.rotation );
		renderer.render( sceneCube, cameraCube );
	}

	
	
}
	
function updateArtwork(){
	
	
	
	if(hang1){
		hang1.rotation.z+=.02;
	}
	if(hang2){
		hang2.rotation.z+=.02;
	}
		
	for(var i = 0; i<ds.length; i++){
		if(ds[i]){
			ds[i].rotation.y+=rotsY[i];
			ds[i].rotation.z+=rotsX[i];	
		}
	}
	
	renderer.render( scene, camera );
	
	
}

var structure;

function initSpecific(result) {
	
	structure = result.scene.getObjectByName( 'Structure', true);
	
	//structure.material = new THREE.MeshLambertMaterial( { vertexColors: THREE.VertexColors, ambient: 0xffffff, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.3 } );
	
}

function updateCamera() {
	
	camera.position.z = 8.0;
	camera.position.x += ( mouseX - camera.position.x ) * .0001;
	camera.position.y += ( -mouseY - camera.position.y ) * .0001;

	
	if(camera.position.x>maxX)camera.position.x=maxX;
	if(camera.position.x<-maxX)camera.position.x=-maxX;
	
	if(camera.position.y>maxY)camera.position.y=maxY;
	if(camera.position.y<-maxY)camera.position.y=-maxY;
	
	if(structure)
		camera.lookAt( structure.position );
	
	if(cameraCube){
		cameraCube.rotation.copy( camera.rotation );
		renderer.render( sceneCube, cameraCube );
	}
	
}
	
function updateArtwork(){
	
	if(structure)
		structure.rotation.z+=.005;
	
	renderer.render( scene, camera );
	
}
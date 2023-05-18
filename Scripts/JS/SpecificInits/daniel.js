

function initSpecific(result) {
	
}

function updateCamera() {
	
	/*
	camera.position.z = 4.0;

	camera.position.x += ( mouseX - camera.position.x ) * .0001;
	camera.position.y += ( -mouseY - camera.position.y ) * .0001;
	
	var maxX = 3.0;
	var maxY = 3.0;
	
	*/
	
	camera.position.z = 8.0;
	camera.position.x += ( mouseX - camera.position.x ) * .0001;
	camera.position.y += ( -mouseY - camera.position.y ) * .0001;
	
	if(camera.position.x>maxX)camera.position.x=maxX;
	if(camera.position.x<-maxX)camera.position.x=-maxX;
	
	if(camera.position.y>maxY)camera.position.y=maxY;
	if(camera.position.y<-maxY)camera.position.y=-maxY;
	
	//if(structure)
	camera.lookAt( scene.position );
	
	if(cameraCube){
		cameraCube.rotation.copy( camera.rotation );
		renderer.render( sceneCube, cameraCube );
	}

	
	
}
	
function updateArtwork(){
	renderer.render( scene, camera );
}
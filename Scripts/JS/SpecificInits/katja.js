var isUserInteracting = false;
var onPointerDownPointerX = 0, onPointerDownPointerY = 0;
var onPointerDownLon = 0, onPointerDownLat = 0;
var lon = 0, lat = 0;
var lat = 0.0, phi = 0.0, theta = 0.0;

var target = new THREE.Vector3();

function initSpecific(result) {
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	
}

function updateArtwork(){
	
}


function updateCamera() {
	/*
	camera.position.z = 3.0;
	camera.position.x += ( mouseX - camera.position.x ) * .0001;
	camera.position.y += ( -mouseY - camera.position.y ) * .0001;
	
	var maxX = 3.0;
	var maxY = 3.0;
	
	if(camera.position.x>maxX)camera.position.x=maxX;
	if(camera.position.x<-maxX)camera.position.x=-maxX;
	
	if(camera.position.y>maxY)camera.position.y=maxY;
	if(camera.position.y<-maxY)camera.position.y=-maxY;
	
	if(torso)
		camera.lookAt( torso.position );
	*/
	
	lat = Math.max( - 85, Math.min( 85, lat ) );
	phi = THREE.Math.degToRad( 90 - lat );
	theta = THREE.Math.degToRad( lon );
	
	target.x = 500 * Math.sin( phi ) * Math.cos( theta );
	target.y = 500 * Math.cos( phi );
	target.z = 500 * Math.sin( phi ) * Math.sin( theta );
	
	/*
	camera.position.x = - target.x;
	camera.position.y = - target.y;
	camera.position.z = - target.z;
	*/
	
	camera.lookAt( target );

	if(cameraCube){
		cameraCube.rotation.copy( camera.rotation );
		renderer.render( sceneCube, cameraCube );
	}

	renderer.render( scene, camera );
	
}


function onDocumentMouseDown( event ) {

	event.preventDefault();

	isUserInteracting = true;

	onPointerDownPointerX = event.clientX;
	onPointerDownPointerY = event.clientY;

	onPointerDownLon = lon;
	onPointerDownLat = lat;

}

function onDocumentMouseMove( event ) {

	if ( isUserInteracting ) {

		lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
		lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;
		//render();
	}
}

function onDocumentMouseUp( event ) {

	isUserInteracting = false;
	//render();

}
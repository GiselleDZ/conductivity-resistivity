
var obj;
var SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 1024;

function initSpecific(result) {
	//var mat = new THREE.MeshLambertMaterial( { color:0xffffff, ambient: 0xffffff, side:THREE.DoubleSided, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.3 } );
	
	//renderer.shadowMapEnabled = true;
	//renderer.shadowMapSoft = true;

	//renderer.shadowMapType = THREE.PCFShadowMap;
	
	/*
	var spotlight = new THREE.SpotLight( 0xffffff, 1, 0, Math.PI, 1 );
	spotlight.position.set(0,-5,10);
	//spotlight.shadowCameraVisible = true;
	spotlight.shadowDarkness = 0.95;
	spotlight.intensity = 2;
	
	spotlight.shadowCameraNear = 1;
	spotlight.shadowCameraFar = 200;
	spotlight.shadowCameraFov = 30;

	
	// must enable shadow casting ability for the light
	spotlight.castShadow = true;
	scene.add(spotlight);
	
	
	
	var platformTop = result.scene.getObjectByName( 'platformTop', true);
	//platformTop.material = new THREE.MeshLambertMaterial();
	platformTop.castShadow = false;
	platformTop.receiveShadow = true;
	
	
	
	obj = result.scene.getObjectByName( 'Plane0', true);
	
	for(var i=0; i<5; i++){
		var o = result.scene.getObjectByName( 'Plane'+i, true);
		//o.material.side = THREE.DoubleSide;
		o.castShadow = true;
		o.receiveShadow = true;
	}
	
	*/
	
	obj = result.scene.getObjectByName( 'Plane0', true);
	

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
	
	if(obj)
		camera.lookAt( obj.position );
	
	if(cameraCube){
		cameraCube.rotation.copy( camera.rotation );
		renderer.render( sceneCube, cameraCube );
	}

	
	
}
	
function updateArtwork(){
	
	renderer.render( scene, camera );
	renderer.updateShadowMap( scene, camera );

	
}
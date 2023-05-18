var videoEl1, videoEl2;
var videoTex1, videoTex2;
var bg;
var bgX = 0.0, bgY = 0.0, bgZ = 0.0;

function initSpecific(result){
	
	bg = result.scene.getObjectByName( 'VideoMesh', true);

	videoEl1 = document.getElementById( 'devotion1' );
	
	videoTex1 = new THREE.Texture( videoEl1 );
	videoTex1.minFilter = THREE.LinearFilter;
	videoTex1.magFilter = THREE.LinearFilter;
	videoTex1.format = THREE.RGBFormat;
	videoTex1.generateMipmaps = false;

	camera.position.z = 30;
	bg.material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: videoTex1, side:THREE.DoubleSide});
}

function updateArtwork(){
	
	var dist = 0.0; 
	
	if(bg){
		dist = Math.abs(camera.position.x-bg.position.x)+Math.abs(camera.position.z-bg.position.z);
		var ezey = 0.01;
		
		bgX+=(camera.position.x-bgX)*ezey;
		bgY+=(camera.position.y-bgY)*ezey;
		bgZ+=(camera.position.z-bgZ)*ezey;
		
		bg.lookAt(new THREE.Vector3(bgX, bgY, bgZ));
	
	}

	
	if(videoEl1){
		if (videoEl1.readyState === videoEl1.HAVE_ENOUGH_DATA ) {
			$("#devotion1").prop('muted', false); 
			var vol = 1.0-(dist*.05);
			if(vol<0)vol = 0;
			videoEl1.volume = vol;
			if (videoTex1) videoTex1.needsUpdate = true;
		}
	}
	
	
	renderer.render( scene, camera );

}


function updateCamera() {
	
	/*
	camera.position.z = 4.0;
	camera.position.x += ( mouseX - camera.position.x ) * .00005;
	camera.position.y += ( -mouseY - camera.position.y ) * .00005;
	
	var maxX = 5.0;
	var maxY = 5.0;
	*/
	
	camera.position.z += (8.0-camera.position.z)*.01;
	camera.position.x += ( mouseX - camera.position.x ) * .0001;
	camera.position.y += ( -mouseY - camera.position.y ) * .0001;
	
	
	if(camera.position.x>maxX)camera.position.x=maxX;
	if(camera.position.x<-maxX)camera.position.x=-maxX;
	
	if(camera.position.y>maxY)camera.position.y=maxY;
	if(camera.position.y<-maxY)camera.position.y=-maxY;
	
	if(bg)
		camera.lookAt( bg.position );
	
	if(cameraCube){
		cameraCube.rotation.copy( camera.rotation );
		renderer.render( sceneCube, cameraCube );
	}

	
	
}
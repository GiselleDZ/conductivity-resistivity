var videoEl1, videoEl2;
var videoTex1, videoTex2;
var bg;

function initSpecific(result){
	//videoGroup = new THREE.Object3D();
	
	var videoBgTexture = THREE.ImageUtils.loadTexture("Assets/Scenes/ferran/_devotion.png");
	bg = result.scene.getObjectByName( 'BG', true);
	//bg.material = new THREE.MeshLambertMaterial({map:videoBgTexture,ambient: 0xffffff,envMap:reflectionCube,combine:THREE.MixOperation,reflectivity:0.3});
	bg.material = new THREE.MeshLambertMaterial({map:videoBgTexture, color: 0x8c8c8c});
	
	videoEl1 = document.getElementById( 'devotion1' );
	videoEl2 = document.getElementById( 'devotion2' );

	
	videoTex1 = new THREE.Texture( videoEl1 );
	videoTex1.minFilter = THREE.LinearFilter;
	videoTex1.magFilter = THREE.LinearFilter;
	videoTex1.format = THREE.RGBFormat;
	videoTex1.generateMipmaps = false;
	
	videoTex2 = new THREE.Texture( videoEl2 );
	videoTex2.minFilter = THREE.LinearFilter;
	videoTex2.magFilter = THREE.LinearFilter;
	videoTex2.format = THREE.RGBFormat;
	videoTex2.generateMipmaps = false;
	
	var videoMat1 = new THREE.MeshBasicMaterial({ color: 0xffffff, map: videoTex1});
	var videoMat2 = new THREE.MeshBasicMaterial({ color: 0xffffff, map: videoTex2});
	
	var videoMesh1 = result.scene.getObjectByName( 'Video1', true);
	videoMesh1.material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: videoTex1});
	
	var videoMesh2 = result.scene.getObjectByName( 'Video2', true);
	videoMesh2.material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: videoTex2});

}

function updateArtwork(){
	
	renderer.render( scene, camera );
	
	var dist = 0.0; 
	
	if(bg)dist = Math.abs(camera.position.x-bg.position.x)+Math.abs(camera.position.z-bg.position.z);
	
	if(videoEl1){
		if (videoEl1.readyState === videoEl1.HAVE_ENOUGH_DATA ) {
			$("#devotion1").prop('muted', false); 
			var vol = 1.0-(dist*.05);
			if(vol<0)vol = 0;
			videoEl1.volume = vol;
			if (videoTex1) videoTex1.needsUpdate = true;
		}
	}
	if(videoEl2){
		if (videoEl2.readyState === videoEl2.HAVE_ENOUGH_DATA ) {
			$("#devotion1").prop('muted', false); 
			
			var vol = 1.0-(dist*.05);
			if(vol<0)vol = 0;
			videoEl2.volume = vol;
			if (videoTex2) videoTex2.needsUpdate = true;
		}
	}
	
	
	
}


function updateCamera() {
	/*
	camera.position.z = 3.0;
	camera.position.x += ( mouseX - camera.position.x ) * .00005;
	camera.position.y += ( -mouseY - camera.position.y ) * .00005;
	
	var maxX = 5.0;
	var maxY = 5.0;
	
	*/
	
	camera.position.z = 8.0;
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
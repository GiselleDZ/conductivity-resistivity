var videoEl1, videoEl2;
var videoTex1, videoTex2;
var videoMesh1;

var clickedLink = false;

var ray, projector, mouse = new THREE.Vector2(), INTERSECTED;
var vector = new THREE.Vector3(0,0,0);
var objs;

function initSpecific(result){
	//videoGroup = new THREE.Object3D();
	ray = new THREE.Raycaster();
	projector = new THREE.Projector();
	
	videoEl1 = document.getElementById( 'devotion1' );
	
	videoTex1 = new THREE.Texture( videoEl1 );
	videoTex1.minFilter = THREE.LinearFilter;
	videoTex1.magFilter = THREE.LinearFilter;
	videoTex1.format = THREE.RGBFormat;
	videoTex1.generateMipmaps = false;
	
	
	
	var videoMat1 = new THREE.MeshBasicMaterial({ color: 0xffffff, map: videoTex1});
	
	videoMesh1 = result.scene.getObjectByName( 'VideoMesh', true);
	videoMesh1.material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: videoTex1});
	//console.log(scene);
	//objs = new THREE.Object3D();
	//objs.add(videoMesh1);
	//scene.add(objs);
	//objs.push(videoMesh1);
	//objs.push(videoMesh1);


}

var gotObject=false;

function updateArtwork(){
	
	vector = new THREE.Vector3( mouseX, mouseY, 1 );
	
	if(projector){
		projector.unprojectVector( vector, camera );
	}
	
	if(mouseDown){
		if(!clickedLink){
			window.open("http://monumenttosomething.com/", "_blank");
			clickedLink = true;
		}
	}else{
		//clickedLink = false;	
	}
	
	var dist = 0.0; 
	
	if(videoMesh1)dist = Math.abs(camera.position.x-videoMesh1.position.x)+Math.abs(camera.position.z-videoMesh1.position.z);
	
	if(videoEl1){
		if (videoEl1.readyState === videoEl1.HAVE_ENOUGH_DATA ) {
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
	
	if(videoMesh1)
		camera.lookAt( videoMesh1.position );
	
	if(cameraCube){
		cameraCube.rotation.copy( camera.rotation );
		renderer.render( sceneCube, cameraCube );
	}


	
}
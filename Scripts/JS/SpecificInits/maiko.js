
var obj;
var holder;

var pt;

var sheetTex, sheetMat;

function initSpecific(result) {
		//camera.fov = 4;
		//camera.updateProjectionMatrix();
		holder = new THREE.Object3D();
		scene.add(holder);
		
		
		obj = result.scene.getObjectByName( 'sheet', true);
		holder.add(obj);
		
		pt = result.scene.getObjectByName( 'platformTop', true);
		
		sheetTex = THREE.ImageUtils.loadTexture( 'Assets/Scenes/maiko/cloth.jpg' );
		
		
		sheetMat = new THREE.MeshLambertMaterial( { color: 0xffffff, ambient: 0xffffff, map:sheetTex} );
		sheetMat.needsUpdate = true;
		obj.material = sheetMat; 
		
		for(var i = 0;i<15; i++){
			
			var ob = result.scene.getObjectByName('bal'+i, true);
			holder.add(ob);
			
		}
}

function updateCamera() {	

	
	camera.position.z = 8.0;
	camera.position.x += ( mouseX - camera.position.x ) * .0001;
	camera.position.y += ( -mouseY - camera.position.y ) * .0001;

	
	if(camera.position.x>maxX)camera.position.x=maxX;
	if(camera.position.x<-maxX)camera.position.x=-maxX;
	
	if(camera.position.y>maxY)camera.position.y=maxY;
	if(camera.position.y<-maxY)camera.position.y=-maxY;
	
	
	
	if(cameraCube){
		cameraCube.rotation.copy( camera.rotation );
		renderer.render( sceneCube, cameraCube );
	}

	
	
}
	
function updateArtwork(){
	renderer.render( scene, camera );
	
	if(pt)
		camera.lookAt(pt.position);
	
	if(holder){
		holder.rotation.y+=.006;
		if(obj){
			if(sheetTex){
				
				sheetTex.wrapS = sheetTex.wrapT = THREE.RepeatWrapping;
				sheetTex.repeat.set( 1, 1 );
				sheetTex.needsUpdate = true;
				
				sheetTex.needsUpdate = true;
				sheetTex.offset.y += .002;
				sheetTex.offset.x += .002;
				//sheetTex.needsUpdate = true;
			}	
		}
	}
	
	
	
	
}
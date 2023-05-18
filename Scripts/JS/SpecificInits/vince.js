var torsoObjects=[], vel=[], torsoTime=[], torsoRand=[], rots=[], scls=[];
var torsoMat, torso, torsoHolder, torusKnot, pyramid, computer, iphone, sims, lines, bigCube, water, sand, rocks;
var gifTexture, canvasGif, shardsMat, waterMat, waterTex, shouldSup = false, fx = 5, inc = 0.0, gifLoaded = false;

function initSpecific(result) {
		
	torsoHolder = new THREE.Object3D();
	scene.add(torsoHolder)
	
	gifTexture = THREE.ImageUtils.loadTexture( 'Assets/Images/test.gif' );
	
	//shardsMat = new THREE.MeshLambertMaterial({color: 0xffffff, ambient: 0x993300, map:gifTexture, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.5});
	shardsMat = new THREE.MeshBasicMaterial({color: 0xffffff, map:gifTexture});
	//shardsMat = new THREE.MeshLambertMaterial({color: 0xffffff, map:gifTexture, ambient: 0x993300, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.3});
	//gifSphereMat = new THREE.MeshBasicMaterial({color: 0xffffff, map:gifTexture, side:THREE.BackSide});

	
	//torsoMat = new THREE.MeshLambertMaterial( { color: 0xffffff, ambient: 0xffffff, envMap: refractionCube, refractionRatio: 0.5 } );
	torsoMat = new THREE.MeshLambertMaterial( { color: 0xb6b6b6, ambient: 0x000000, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 1.0} );
	
	sims = result.scene.getObjectByName( 'Sims', true);
	//sims.material = new THREE.MeshLambertMaterial( { color: 0x00ffa2, ambient: 0x00ffa2, envMap: refractionCube, refractionRatio: 0.95 } );
	sims.material = new THREE.MeshLambertMaterial( { color: 0x00ffa2, ambient: 0x00ffa2, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.5} );
	
	//torsoMat = new THREE.MeshLambertMaterial( { color: 0xffffff, ambient: 0xffffff} );
	
	torso = result.scene.getObjectByName( 'Torso', true);
	
	torso.material = torsoMat;
	
	result.scene.getObjectByName( 'PalmTreeLeaves', true).material.side = THREE.DoubleSide;
	
	torusKnot=result.scene.getObjectByName( 'TorusKnot', true);
	torusKnot.material = new THREE.MeshNormalMaterial();
	
	computer = result.scene.getObjectByName( 'Computer', true);	
	computer.material = new THREE.MeshLambertMaterial( { color: 0xf6ff00, ambient: 0xf6ff00, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.3} );
	
	iphone = result.scene.getObjectByName( 'Iphone', true);	
	iphone.material = new THREE.MeshLambertMaterial( { color: 0xffffff, ambient: 0xffffff, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.5} );
	
	lines = result.scene.getObjectByName( 'Lines', true);
	lines.material = new THREE.MeshNormalMaterial();
	
	pyramid = result.scene.getObjectByName( 'Pyramid', true);
	pyramid.material = new THREE.MeshNormalMaterial();
	
	bigCube = result.scene.getObjectByName( 'BigCube', true);
	bigCube.material = new THREE.MeshNormalMaterial();
	
	waterTex = THREE.ImageUtils.loadTexture( 'Assets/Scenes/vince/_water.png' );
	waterTex.wrapS = waterTex.wrapT = THREE.RepeatWrapping;
	waterTex.repeat.set( 3, 3 );

	water = result.scene.getObjectByName( 'Water', true);
	waterMat = new THREE.MeshLambertMaterial( { color: 0x00eaff, ambient: 0x00eaff, map:waterTex, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.5} );
	
	water.material = waterMat;
	//texture.offset.y = currentRow / this.tilesVertical;

	torsoHolder.add(torso);
	
	for(var i=0; i<203; i++){
		torsoObjects[i]=result.scene.getObjectByName( 'TorsoMod_cell.'+pad(i.toString(),3), true);
		torsoHolder.add(torsoObjects[i]);
		torsoObjects[i].material=shardsMat;
		
		var holder = new THREE.Vector3(torsoObjects[i].position.x, torsoObjects[i].position.y, torsoObjects[i].position.z);
		vel[i] = holder;
		
		holder = new THREE.Vector3(torsoObjects[i].rotation.x, torsoObjects[i].rotation.y, torsoObjects[i].rotation.z);
		rots[i] = holder;
		
		holder = new THREE.Vector3(torsoObjects[i].scale.x, torsoObjects[i].scale.y, torsoObjects[i].scale.z);
		scls[i] = holder;
		
		torsoTime[i]=0;
		torsoRand[i]=200;///\\100+Math.random()*300;
	}
	
	//if(!gifLoaded){
	//$("#holder").fadeOut("slow");
		//gifLoaded = true;
	//}
	//initCanvasGif('http://25.media.tumblr.com/4ed70b269f10f4d0a6a25fef0b852465/tumblr_mq7qw19WkM1rsbzjbo1_500.gif');
	
	initCanvasGif('Assets/Images/test.gif');
	
	fxTimer();
	
	px = torso.position.x;
	py = torso.position.y;
	pz = torso.position.z;
}


function initCanvasGif(url){
	var newGif = new Image();
	//newGif.src = "http://corsify.appspot.com/" + url + "";
	//newGif.src = proxify(decodeURIComponent(url));
	newGif.src = url;
	newGif.onload=function(){
		$("#gifHolder").html(" <img style='display:none;' id='gifImg' rel:animated_src='"+newGif.src+"' rel:auto_play='1' width='" + newGif.width + "' height='" + newGif.height + "' />");
		canvasGif = new SuperGif({ gif: document.getElementById('gifImg') } );
		canvasGif.load();
		shouldSup = true;
	}
}


function fxTimerHelper(){
	setTimeout(function(){fxTimer();}, 1000+Math.random()*5000);	
}


function fxTimer(){
	fx = Math.floor(Math.random()*6);
	fxTimerHelper();
}


function updateCamera() {
	
	/*
	camera.position.z = 3.0;
	
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
	
	if(torso)
		camera.lookAt( torso.position );
	
	if(cameraCube){
		cameraCube.rotation.copy( camera.rotation );
		renderer.render( sceneCube, cameraCube );
	}

	
	
}
	
function updateArtwork(){
	
	inc +=.1;
	
	if(torsoHolder)
		torsoHolder.rotation.y+=.005;
	
	if(torusKnot)
		torusKnot.rotation.z+=.03;
		
	if(computer){
		var compX = Math.sin(inc*.2);
		var compZ = Math.cos(inc*.2);
		computer.position.x = compX;
		computer.position.z = compZ;
		computer.rotation.z+=.03;
	}
	
	if(iphone){
		var ipX = Math.sin((inc+Math.PI)*.2);
		var ipZ = Math.cos((inc+Math.PI)*.2);
		iphone.position.x = ipX;
		iphone.position.z = ipZ;
		iphone.rotation.z+=.03;
	}
	
	if(sims){
		sims.rotation.z+=.03;
	}
	
	if(lines){
		lines.rotation.z +=.1;
		lines.rotation.x = Math.PI/4;
		//lines.rotation.z +=.02;
		//lines.x = Math.PI/4;	
	}
	
	if(pyramid){
		pyramid.rotation.z +=.03;
		//lines.rotation.x = Math.PI/4;
		pyramid.rotation.z +=.02;
		//lines.x = Math.PI/4;	
	}
	
	if(bigCube){
		var s = Math.sin(inc*.07)*1.5;
		bigCube.scale.x = bigCube.scale.y = bigCube.scale.z = s; 
		bigCube.rotation.x += .02;
		bigCube.rotation.y += .02;
	}
	
	if(shouldSup){
		if(!canvasGif.get_loading()){
			
			if(!gifLoaded){
				$(".arrows").each(function(){$(this).fadeIn("slow");});
				$("#holder").fadeOut("slow");
				isSceneLoaded  = true;
				gifLoaded = true;
			
			}
			
			handleCanvasTexture();
		
		}
	}
	
	
	for(var i=0; i<torsoObjects.length; i++){
		if(torsoObjects[i]!=null){
			if(fx == 0)
				explodeObjects(i);
			if(fx == 1)
				rotateObjects(i);
			if(fx == 2)
				scaleObjects(i);
			if(fx == 3)
				nothing(i);
			if(fx == 4)
				sinPos(i);
			if(fx == 5)
				sinRot(i);
		}
	}
	
	renderer.render( scene, camera );

}


function handleCanvasTexture(){	
	
	gifTexture = new THREE.Texture( canvasGif.get_canvas() );
	gifTexture.needsUpdate = true;
	
	waterTex.offset.y += .002;
	waterTex.offset.x += .002;
	waterTex.needsUpdate = true;
	
	shardsMat = new THREE.MeshBasicMaterial({color: 0xffffff, map:gifTexture});
	
	shardsMat.needsUpdate = true;
	
	for(var i=0; i<torsoObjects.length; i++){
		torsoObjects[i].material = shardsMat;
	}
}


function explodeObjects(i){
	var mult = 0.02;
	
	torsoObjects[i].rotation.x = rots[i].x;
	torsoObjects[i].rotation.y = rots[i].y;
	torsoObjects[i].rotation.z = rots[i].z;
	
	torsoObjects[i].scale.x = scls[i].x;
	torsoObjects[i].scale.y = scls[i].y;
	torsoObjects[i].scale.z = scls[i].z;
	
	torsoObjects[i].position.x += vel[i].x*mult;
	torsoObjects[i].position.y += vel[i].y*0.0005;
	torsoObjects[i].position.z += vel[i].z*mult;
	torsoTime[i]++;
	if(torsoTime[i]>torsoRand[i]){
		torsoTime[i] = 0;
		torsoObjects[i].position.x = vel[i].x;
		torsoObjects[i].position.y = vel[i].y;
		torsoObjects[i].position.z = vel[i].z;
	}
}

function rotateObjects(i){
		
	torsoTime[i] = 0;
	
	torsoObjects[i].position.x = vel[i].x;torsoObjects[i].position.y = vel[i].y;torsoObjects[i].position.z = vel[i].z;
	
	torsoObjects[i].scale.x = scls[i].x;torsoObjects[i].scale.y = scls[i].y;torsoObjects[i].scale.z = scls[i].z;
	
	var x = Math.sin(inc*.2);
	var z = Math.cos(inc*.2);
	var pos = new THREE.Vector3(x,z,0);
	torsoObjects[i].lookAt(computer.position);// = (inc*.002)+(i*.002);
		
}

function scaleObjects(i){
	
	torsoObjects[i].rotation.x = rots[i].x;torsoObjects[i].rotation.y = rots[i].y;torsoObjects[i].rotation.z = rots[i].z;
	
	var mult = 1.3;
	
	torsoObjects[i].position.x = vel[i].x*mult;
	torsoObjects[i].position.y = vel[i].y;
	torsoObjects[i].position.z = vel[i].z*mult;
	
	var scl = .5+Math.sin((inc*.07)*(i*.2))*.5;
	
	torsoObjects[i].scale.x = torsoObjects[i].scale.y = torsoObjects[i].scale.z = scl;

}

function nothing(i){
	
	torsoObjects[i].rotation.x = rots[i].x;torsoObjects[i].rotation.y = rots[i].y;torsoObjects[i].rotation.z = rots[i].z;
	
	torsoObjects[i].position.x = vel[i].x;torsoObjects[i].position.y = vel[i].y;torsoObjects[i].position.z = vel[i].z;
	
	torsoObjects[i].scale.x = scls[i].x;torsoObjects[i].scale.y = scls[i].y;torsoObjects[i].scale.z = scls[i].z;

}

function sinPos(i){
	
	torsoObjects[i].rotation.x = rots[i].x;torsoObjects[i].rotation.y = rots[i].y;torsoObjects[i].rotation.z = rots[i].z;
	
	torsoObjects[i].scale.x = scls[i].x;torsoObjects[i].scale.y = scls[i].y;torsoObjects[i].scale.z = scls[i].z;
	
	var sz = 1+Math.sin((inc*.2)*(i*.02))*1;
	torsoObjects[i].position.x = vel[i].x*(1+(sz*.1));
	torsoObjects[i].position.y = vel[i].y*(1+(sz*.1));
	torsoObjects[i].position.z = vel[i].z*(sz);

}

function sinRot(i){
	
	var mult = 1.2;
	torsoObjects[i].position.x = vel[i].x*mult;torsoObjects[i].position.y = vel[i].y;torsoObjects[i].position.z = vel[i].z*mult;
	torsoObjects[i].scale.x = scls[i].x;torsoObjects[i].scale.y = scls[i].y;torsoObjects[i].scale.z = scls[i].z;
	
	var sz = Math.sin((inc*.2)*(i*.02))*.5;
	
	torsoObjects[i].rotation.x = rots[i].x+sz;//*sz;
	torsoObjects[i].rotation.y = rots[i].y+sz;//*sz;
	torsoObjects[i].rotation.z = rots[i].z+sz;//*sz;//*sz;

}


function pad (str, max) {
  return str.length < max ? pad("0" + str, max) : str;
}


function proxify (url) {
	return "http://198.199.72.134/cors/" + url.replace(/^https?:\/\//, "");
};
var bk;

function initSpecific(result) {
  bk = result.scene.getObjectByName("Back", true);
  bk.material = new THREE.MeshLambertMaterial({
    ambient: 0xffffff,
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
    envMap: reflectionCube,
    combine: THREE.MixOperation,
    reflectivity: 0.5,
  });
  //var img1 = THREE.ImageUtils.loadTexture( 'Assets/Scenes/lobby/final.png' );

  //var img2 = THREE.ImageUtils.loadTexture( 'Assets/Scenes/lobby/lobby.png' );

  //result.scene.getObjectByName( 'Back', true).material = new THREE.MeshLambertMaterial({ambient: 0x2f2f2f, side:THREE.DoubleSide, color:0x2f2f2f, envMap:reflectionCube, combine:THREE.MixOperation,reflectivity:0.3});
  //result.scene.getObjectByName( 'Info', true).material = new THREE.MeshLambertMaterial({ambient: 0xffffff, map: img2, color:0xffffff});
  //result.scene.getObjectByName( 'Info.001', true).material = new THREE.MeshLambertMaterial({ambient: 0xffffff, map: img1, color:0xffffff});
  //bk.material = new THREE.MeshBasicMaterial({ambient: 0xffffff, color:0xffffff});

  //img1.minFilter = img1.magFilter = THREE.LinearFilter;
  //img1.minFilter = img1.magFilter = THREE.LinearFilter;
}

function updateCamera() {
  camera.position.z = 8.0;

  camera.position.x += (mouseX - camera.position.x) * 0.0001;
  camera.position.y += (-mouseY - camera.position.y) * 0.0001;

  if (camera.position.x > maxX) camera.position.x = maxX;
  if (camera.position.x < -maxX) camera.position.x = -maxX;

  if (camera.position.y > maxY) camera.position.y = maxY;
  if (camera.position.y < -maxY) camera.position.y = -maxY;

  if (bk) camera.lookAt(bk.position);

  if (cameraCube) {
    cameraCube.rotation.copy(camera.rotation);
    renderer.render(sceneCube, cameraCube);
  }
}

function updateArtwork() {
  renderer.render(scene, camera);
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

  fadeInArrows();

  if (isSceneLoaded) {
    clearTimeout(arrowTimeout);

    arrowTimeout = setTimeout(function () {
      $(".arrows").each(function () {
        $(this).fadeOut();
      });
    }, 1000);
  }
}

function onDocumentMouseUp(event) {
  const target = $(event.target);
  if (!target.hasClass("close") && !target.is("#soundIcon")) {
    // Your Three.js click handling code here
    mouseDown = false;
    if (nm != "katja") {
      if (moving) {
        moving = false;
      } else {
        moving = true;
      }
    }
  }
}

function onDocumentMouseDown(event) {
  const target = $(event.target);
  if (!target.hasClass("close") && !target.is("#soundIcon")) {
    // Your Three.js click handling code here
    mouseDown = true;
  }
}

function onDocumentMouseWheel(event) {
  // WebKit

  if (event.wheelDeltaY) {
    camera.fov -= event.wheelDeltaY * 0.01;

    // Opera / Explorer 9
  } else if (event.wheelDelta) {
    camera.fov -= event.wheelDelta * 0.01;

    // Firefox
  } else if (event.detail) {
    camera.fov -= event.detail * 0.01;
  }

  if (nm != "katja") {
    if (camera.fov > 90) {
      camera.fov = 90;
    }
    if (camera.fov < 1) camera.fov = 1;
  }

  camera.updateProjectionMatrix();

  //render();
}

function animate() {
  requestAnimationFrame(animate);

  if (!didArrowClick) {
    if (moving) updateCamera();
  } else {
    cameraOutro();
  }

  updateArtwork();
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  if (cameraCube) {
    cameraCube.aspect = window.innerWidth / window.innerHeight;
    cameraCube.updateProjectionMatrix();
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeyDown(event) {
  switch (event) {
    case 38: // up
    case 87: // w
      moveForward = true;
      break;

    case 37: // left
    case 65: // a
    //moveLeft = true; break;

    case 40: // down
    case 83: // s
      moveBackward = true;
      break;

    case 39: // right
    case 68: // d
      //moveRight = true;
      break;

    case 32: // space
      //if ( canJump === true ) velocity.y += 10;
      //canJump = false;
      break;
  }
}

function onKeyUp(event) {
  switch (event) {
    case 38: // up
    case 87: // w
      moveForward = false;
      break;

    case 37: // left
    case 65: // a
      //moveLeft = false;
      break;

    case 40: // down
    case 83: // s
      moveBackward = false;
      break;

    case 39: // right
    case 68: // d
      //moveRight = false;
      break;
  }
}

setInterval(function () {
  if (moveForward) {
    camera.fov -= 0.5;

    camera.updateProjectionMatrix();
  }
  if (moveBackward) {
    camera.fov += 0.5;

    camera.updateProjectionMatrix();
  }

  //   if (nm != "katja") {
  //     if (camera.fov > 90) {
  //       camera.fov = 90;
  //     }
  //     if (camera.fov < 1) camera.fov = 1;
  //   }
}, 1000 / 60);

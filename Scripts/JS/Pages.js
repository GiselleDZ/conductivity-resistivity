function arrowClick(d) {
  if (!didArrowClick) {
    if (d == "left") {
      moveLeft = true;
      handleArrowClick(d);
    } else {
      handleArrowClick(d);
    }
    cx = camera.position.x;
    cy = camera.position.y;
    didArrowClick = true;
  }
}

function handleArrowClick(d) {
  var normalFadeTime = 3000;
  switch (nm) {
    case "lobby":
      if (d == "right") openPage("daniel", d, normalFadeTime);
      break;
    case "daniel":
      if (d == "left") openPage("lobby", d, normalFadeTime);
      else openPage("rachel", d, normalFadeTime);
      break;
    case "rachel":
      if (d == "left") openPage("daniel", d, normalFadeTime);
      else openPage("katja", d, normalFadeTime);
      break;
    case "katja":
      if (d == "left") openPage("rachel", d, 100);
      else openPage("ferran", d, 100);
      break;
    case "ferran":
      if (d == "left") openPage("katja", d, normalFadeTime);
      else openPage("maiko", d, normalFadeTime);
      break;
    case "maiko":
      if (d == "left") openPage("ferran", d, normalFadeTime);
      else openPage("seyhan", d, normalFadeTime);
      break;
    case "seyhan":
      if (d == "left") openPage("maiko", d, normalFadeTime);
      else openPage("anthi", d, normalFadeTime);
      break;
    case "anthi":
      if (d == "left") openPage("seyhan", d, normalFadeTime);
      else openPage("vince", d, normalFadeTime);
      break;
    case "vince":
      if (d == "left") openPage("anthi", d, normalFadeTime);
      else openPage("lauren", d, normalFadeTime);
      break;
    case "lauren":
      if (d == "left") openPage("vince", d, normalFadeTime);
      else openPage("angelo", d, normalFadeTime);
      break;
    case "angelo":
      if (d == "left") openPage("lauren", d, normalFadeTime);
      else openPage("lobby", d, 100);
      break;
  }
}

function openPage(s, p, t) {
  setTimeout(function () {
    $("#finished").fadeIn(); //.css("opacity",1);

    setTimeout(function () {
      window.open("?name=" + s, "_self");
    }, 1000);
  }, t);
}

function cameraOutro() {
  var ez = 0.01;

  if (didArrowClick) {
    if (moveLeft) {
      if (leftP) {
        px += (leftP.position.x - px) * ez;
        py += (leftP.position.y - py) * ez;
        pz += (leftP.position.z - pz) * ez;

        var look = new THREE.Vector3(px, py, pz);
        camera.lookAt(look);

        cx += (leftP.position.x - camera.position.x) * ez;
        cy += (leftP.position.y - camera.position.y) * ez;
        cz += (leftP.position.z + 8 - camera.position.z) * ez;

        camera.position.set(cx, cy, cz);
      }
    } else {
      if (rightP) {
        px += (rightP.position.x - px) * ez;
        py += (rightP.position.y - py) * ez;
        pz += (rightP.position.z - pz) * ez;

        var look = new THREE.Vector3(px, py, pz);
        camera.lookAt(look);

        cx += (rightP.position.x - camera.position.x) * ez;
        cy += (rightP.position.y - camera.position.y) * ez;
        cz += (rightP.position.z + 8 - camera.position.z) * ez;

        camera.position.set(cx, cy, cz);
      } else {
      }
    }
  }
}

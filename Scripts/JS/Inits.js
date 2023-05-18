var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var container;

var camera, scene, loaded;
var renderer;

var mouseX = 0,
  mouseY = 0;

var mouseDown = false;
var didArrowClick = false;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var moving = true;

var maxX = 5.0;
var maxY = 5.0;

var moveForward = false,
  moveBackward = false,
  moveLeft = false,
  moveRight = false;

var arrowTimeout;

var isSceneLoaded = false;
var bottomRollOverTimeout;
//skybox
var cameraCube, sceneCube, cubeMesh;

var cm = "CubeMap5";

if (nm == "katja") {
  cm = "Katja";
}

var path = "Assets/Images/" + cm + "/";
var format = ".png";
var urls = [
  path + "px" + format,
  path + "nx" + format,
  path + "pz" + format,
  path + "nz" + format,
  path + "ny" + format,
  path + "py" + format,
];

var reflectionCube, refractionCube;

var rightP,
  leftP,
  moveLeft = false,
  cx = 0.0,
  cy = 0.0,
  cz = 8.0,
  px = 0.0,
  py = 0.0,
  pz = 0.0;

function init(name) {
  //detector
  if (!Detector.webgl) {
    $("#holder").fadeOut();
    Detector.addGetWebGLMessage();
  }

  $("#bottomRO")
    .mouseenter(function () {
      clearTimeout(bottomRollOverTimeout);
      $("#bottomHolder").fadeIn("slow");
    })
    .mouseleave(function () {
      if (nm != "lobby") {
        $("#bottomHolder").fadeOut("slow");
      }
    });

  if (nm != "seyhan" && nm != "ferran") {
    $("body").append(
      "<audio loop id='themeSong'><source src='Assets/Audio/theme.ogg' type='audio/ogg'><source src='Assets/Audio/theme.mp3' type='audio/mpeg'></audio>"
    );

    var playSong = function () {
      if (nm == "lobby") {
        $("#themeSong").get(0).play();
      } else {
        $("#themeSong").bind("canplay", function () {
          this.currentTime = Math.floor(Math.random() * 210);
          this.play();
        });
      }

      // Remove the event listener after the first mouse move
      document.removeEventListener("mousemove", playSong);
    };

    // Add the event listener to start the song on first mouse move
    document.addEventListener("mousemove", playSong);
  }

  //add renderer containers
  container = document.createElement("div");
  document.body.appendChild(container);

  //get loaded scene

  var loadScene = createLoadScene();

  //camera

  camera = loadScene.camera;
  scene = loadScene.scene;

  //renderer

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  renderer.domElement.style.position = "relative";
  container.appendChild(renderer.domElement);

  //finish loading function

  var callbackFinished = function (result) {
    loaded = result;
    initLoadedScene(result);
    initSpecific(result);
  };

  //load scene

  var loader = new THREE.SceneLoader();
  loader.load("./Assets/Scenes/" + name + "/scene.js", callbackFinished);

  //event listeners

  window.addEventListener("resize", onWindowResize, false);
  document.addEventListener("mousemove", onDocumentMouseMove, false);
  document.addEventListener("mousewheel", onDocumentMouseWheel, false);
  document.addEventListener("DOMMouseScroll", onDocumentMouseWheel, false);

  //document.addEventListener( 'keydown', onKeyDown, false );
  //document.addEventListener( 'keyup', onKeyUp, false );

  $(document).keydown(function (event) {
    onKeyDown(event.keyCode);
  });
  $(document).keyup(function (event) {
    onKeyUp(event.keyCode);
  });

  if (nm != "katja") {
    document.addEventListener("mouseup", onDocumentMouseUp, false);
    document.addEventListener("mousedown", onDocumentMouseDown, false);
  }

  initDescriptions();
}

function initLoadedScene(result) {
  // setup loaded scene
  camera = loaded.currentCamera;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  scene = loaded.scene;

  //skybox camera
  cameraCube = loaded.currentCamera;
  sceneCube = loaded.scene;

  //reflection cube
  reflectionCube = THREE.ImageUtils.loadTextureCube(urls);
  reflectionCube.format = THREE.RGBFormat;

  //refraction cube
  refractionCube = new THREE.Texture(
    reflectionCube.image,
    new THREE.CubeRefractionMapping()
  );
  refractionCube.format = THREE.RGBFormat;

  //skybox
  var shader = THREE.ShaderLib["cube"];
  shader.uniforms["tCube"].value = reflectionCube;

  var cubeMaterial = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide,
  });

  //skybox geometry
  cubeMesh = new THREE.Mesh(
    new THREE.CubeGeometry(100, 100, 100),
    cubeMaterial
  );
  sceneCube.add(cubeMesh);

  //scene.fog = new THREE.Fog( 0xffffff, 60, 100 );
  //sceneCube.fog = new THREE.Fog( 0xffffff, 5, 10	 );

  //sphereFrame

  if (result.scene.getObjectByName("platformTop", true)) {
    var loader = new THREE.JSONLoader();
    loader.load("Assets/Scenes/All/sphereFrame.js", function (geometry) {
      var m = new THREE.Mesh(
        geometry,
        new THREE.MeshLambertMaterial({
          ambient: 0xd3d1cf,
          color: 0xd3d1cf /*(, envMap:reflectionCube, combine:THREE.MixOperation,reflectivity:0.3*/,
        })
      );
      scene.add(m);
      m.scale.x = m.scale.y = m.scale.z = 30;
    });

    var platformMat = new THREE.MeshLambertMaterial({
      ambient: 0xffffff,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      envMap: reflectionCube,
      combine: THREE.MixOperation,
      reflectivity: 0.5,
    });

    if (result.scene.getObjectByName("platformTop", true)) {
      result.scene.getObjectByName("platformTop", true).material = platformMat;
    }

    if (result.scene.getObjectByName("platformTop.001", true)) {
      rightP = result.scene.getObjectByName("platformTop.001", true);
      rightP.material = platformMat;
    }

    if (result.scene.getObjectByName("platformTop.002", true)) {
      leftP = result.scene.getObjectByName("platformTop.002", true);
      leftP.material = platformMat;
    }

    bottomMat = new THREE.MeshLambertMaterial({
      ambient: 0x2f2f2f,
      side: THREE.DoubleSide,
      color: 0x2f2f2f,
      envMap: reflectionCube,
      combine: THREE.MixOperation,
      reflectivity: 0.5,
    });

    if (result.scene.getObjectByName("platformBottom", true)) {
      result.scene.getObjectByName("platformBottom", true).material = bottomMat;
    }

    if (result.scene.getObjectByName("platformBottom.000", true)) {
      result.scene.getObjectByName("platformBottom.000", true).material =
        bottomMat;
    }

    if (result.scene.getObjectByName("platformBottom.001", true)) {
      result.scene.getObjectByName("platformBottom.001", true).material =
        bottomMat;
    }
  }
  //console.log(nm);
  if (nm != "vince") {
    $("#holder").fadeOut("slow");

    fadeInArrows();

    isSceneLoaded = true;
  }

  var light = new THREE.AmbientLight(0x404040);
  scene.add(light);

  light = new THREE.PointLight(0xffffff, 2, 50);
  light.position.set(0, -10, 20);
  scene.add(light);

  bottomRollOverTimeout = setTimeout(function () {
    if (nm != "lobby") {
      //   $("#bottomHolder").fadeOut("slow");
    }
  }, 5000);
}

$(document).ready(function () {
  $("#instructions-close").click(function () {
    $("#instructions").hide();
    $("#instructions-close").hide();
  });

  $("#name-close").click(function () {
    $("#names").hide();
    $("#name-close").hide();
  });
});

function createLoadScene() {
  var result = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      1,
      1000
    ),
  };
  return result;
}

function fadeInArrows() {
  $(".arrows").each(function () {
    if (nm == "lobby") {
      if ($(this).attr("id") != "arrowL") {
        $(this).fadeIn("slow");
      }
    } else {
      $(this).fadeIn("slow");
    }
  });
}

function initDescriptions() {
  switch (nm) {
    case "lobby":
      $("#names").remove();
      break;
    case "daniel":
      $("#names").html("DANIEL ITURRIZAGA");
      break;
    case "rachel":
      $("#names").html("RACHAEL ARCHIBALD");
      break;
    case "katja":
      $("#instructions").hide();
      $("#instructions-close").hide();
      $("#directions").html(
        "  -CLICK AND DRAG TO MOVE<br /> -SCROLL TO ZOOM, UP/DOWN ARROW KEYS TO ZOOM"
      );
      $("#names").html(
        "KATJA NOVITSKOVA<br/><span style='width=200px; overflow:auto; margin-top: 20px; font-size: 11px'>-CLICK AND DRAG TO MOVE<br /> -SCROLL TO ZOOM, UP/DOWN ARROW KEYS TO ZOOM</span>"
      );
      $("#names").css("top", "20px");
      $("#name-close").css("top", "30px");
      break;
    case "ferran":
      $("#names").html("FERÉSTEC <br/> Devotion");
      break;
    case "maiko":
      $("#names").html(
        "MAIKO GUBLER<br/>Cuddle Party<br/><span style='width=200px; overflow:auto; margin-top: 20px; font-size: 11px'>The underlying mesh is<br/> made available for any<br/> modification through <br/>an open online 3D file <br/>sharing repository<br/> (http://casual3dpotluck.tumblr.com/)</span>"
      );
      break;
    case "seyhan":
      $("#names").html("SEYHAN MUSAOGLU");
      break;
    case "anthi":
      $("#names").html("ANTHI TZAKOU");
      break;
    case "vince":
      $("#names").html("VINCE MCKELVIE");
      break;
    case "lauren":
      $("#names").html("LAUREN PASCARELLA");
      break;
    case "angelo":
      $("#names").html(
        "ANGELO PLESSAS<br/>A Monument to Something<br/>(Click To Enter Full Site)"
      );
      break;
  }
}

var canvas, engine, scene, light, groundMaterial, ground, camera;
var player = {};
var players = {};

window.addEventListener('DOMContentLoaded', function(){

  // get canvas
  canvas = document.getElementById('renderCanvas');
  // start motoren
  engine = new BABYLON.Engine(canvas, true);
  // lav en scene
  scene = createScene();

  //addLocalPlayer();

  // ved ikke om engine.resize() skal have noget input, bør undersøges..
  window.addEventListener('resize', function(){
    engine.resize();
  });

  // renderloop / gameloop
  engine.runRenderLoop(function() {
    scene.render();
  });
});
  function rotateItem(item, direction){

  }

  // move an item in the world to the target position
  function moveItem(item, target){

    console.log(target);
    item.mesh.position.x = target.x;
    item.mesh.position.y = target.y + 1;
    item.mesh.position.z = target.z;
  }

  function createScene(){
    scene = new BABYLON.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
/*
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0,5,-10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);
*/
    light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

    // old white ground
    var ground = BABYLON.Mesh.CreateGround('ground1', 20,20,2,scene);

    // new create ground from heightMap

    // groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    // ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "/map", 200, 200, 250, 0, 10, scene, false);
    // ground.material = groundMaterial;

    // add local players avatar
    player.mesh = BABYLON.Mesh.CreateBox("player", 2, scene);
    player.mesh.position.y = 1;
    camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(2, 40, -45), scene);
    camera.target = player.mesh; // target any mesh or object with a "position" Vector3


  window.addEventListener("click", function () {
    // We try to pick an object
    var target = scene.pick(scene.pointerX, scene.pointerY);
    console.log('you clicked on ' + target.pickedMesh.name + ' at position ' + target.pickedMesh.position);
    //console.log(target);

    if(target.pickedMesh.name == 'ground1'){
      socket.emit('updatePosition', target.pickedPoint);
      moveItem(player, target.pickedPoint);
    }
    else{
      socket.emit('updatePosition', target.pickedMesh.position);
      moveItem(player, target.pickedMesh.position);
    }

});



    return scene;
  }

  function removeRemotePlayer(player){
    players[player.id].mesh.dispose();
  }

  function addRemotePlayer(player){
    players[player.id] = player;
    players[player.id].mesh = BABYLON.Mesh.CreateBox("Box1", 2, scene);
  }

  function updatePlayerPosition(data){
    console.log('incoming playerposition data: ');
    console.log(JSON.stringify(data));
    console.log('object: ' + data.id);
    console.log('object position: ' + JSON.stringify(data.position));
    moveItem(players[data.id], data.position);
    // players[data.id].mesh.position = data.position;

  }









/*
var player = {};
player.rotationSpeed = 1;
player.movementSpeed = 1;

window.addEventListener('resize', function(){
  engine.resize();
});

*/

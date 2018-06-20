let w = 1200;
let h = 800;
let hud_y = 120

let player;

let enemyManager;
let mapManager;

let shootTypes;

function preload() {
  let map = loadJSON('Maps/baseMap.json');
  mapManager = new MapManager(map);
  shootTypes = loadJSON('Clases/shootTypes.json');
}


function setup() {
  createCanvas(w, h + hud_y);

  player = new Player(mapManager.getBorders(), w / 2, h / 2, shootTypes);
  enemyManager = new EnemyManager(mapManager.getSpawnPoints(), w / 2, h / 2, player);
}


function draw() {
  background(127);

  //LOGIC BLOCK {************************************************************
  player.update();
  enemyManager.update();

  //player.shootManager.colisions(enemyManager.getShootable()) ??????????????
  detectColisions(player.shootManager.shoots, enemyManager.getShootable());
  //}************************************************************************

  //PRINT BLOCK {************************************************************
  push();
  translate(-player.getPosition().x, -player.getPosition().y);

  mapManager.show();
  enemyManager.show();
  player.shootManager.show();

  pop();

  player.show();

  //HUD.show
  push();
  fill(255, 155, 0);
  stroke(255, 155, 0);
  rect(0, h, w, h + hud_y);
  pop();
  //}************************************************************************

}

//Dentro de cada disparo || shootManager ?¿?¿
function detectColisions(shoots, targets) {
  for (let j = targets.length - 1; j >= 0; j--) {
    let e = targets[j];
    for (let i = shoots.length - 1; i >= 0; i--) {
      let s = shoots[i];
      //Solo válido para circulos en ambos casos
      if (dist(s.x, s.y, e.x, e.y) <= s.r + e.r) {
        // e.hp -= s.dmg;
        e.getDmg(s.dmg);
        shoots.splice(i, 1);
        if (!e.isAlive()) targets.splice(j, 1);
      }
    }
  }
}
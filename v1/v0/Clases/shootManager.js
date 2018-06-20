class ShootManager {
  constructor(w_, h_, sT) {
    this.shoots = [];
    this.cooldown = 0;

    this.types = sT;

    this.wOffset = w_;
    this.hOffset = h_;
  }

  update(sp, a) {
    //COMPROBAMOS QUE LOS DISPAROS DEBAN SEGUIR EN PANTALLA
    for (let i = this.shoots.length - 1; i >= 0; i--) {
      this.shoots[i].update();
      if (!this.shoots[i].active()) {
        this.shoots.splice(i, 1);
      }
    }

    //PARA CADA TIPO DE DISPARO
    let keys = Object.keys(this.types);
    for (let i = 0; i < keys.length; i++) {
      let d = this.types[keys[i]];
      //ACTUAMOS EN CONSECUENCIA
      switch (keys[i]) {
        case "basic":

          //OBTENEMOS EL INPUT DE DISPARO
          if (keyIsDown(d.keycode)) {
            if (this.cooldown <= 0) {
              this.shoots.push(new Shoot(
                sp.add(createVector(this.wOffset, this.hOffset)), a - PI / 2,
                d.dmg, d.vel, d.r, d.range));
              this.cooldown = 1 / d.fireRate;
            }
          }
          //DECREMENTAMOS EL COOLDOWN
          this.cooldown -= 1 / frameRate();
          break;
          // case :"tipe1"
        default:
          break;
      }
    }
  }

  show() {
    for (let i = 0; i < this.shoots.length; i++) {
      this.shoots[i].show();
    }
  }

  colisions() {

  }


}
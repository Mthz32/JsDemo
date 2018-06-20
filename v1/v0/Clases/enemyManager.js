class EnemyManager {
  constructor(sp, w_, h_, player) {
    this.pts = sp;
    this.spawnRate = 0.005 * this.pts.n;
    this.enemys = [];
    this.placed = [];

    for (let i = 0; i < this.pts.n; i++) {
      this.placed[i] = false;
    }

    this.wOffset = w_;
    this.hOffset = h_;

    this.target = player.getPosition();

  }

  update() {
    let type = 1;
    //get a random spawnpoin;
    let n = floor(random(this.placed.length));

    //Si random < spawnRate && not placed in the random spawnpoint
    if ((random() < this.spawnRate) && (!this.placed[n])) {
      this.spawn(type, n + 1);
    }

    //Actualizamos los registros de mobs asociados a un spawn
    for (let i = 0; i < this.placed.length; i++) {
      this.placed[i] = false;
    }
    for (let i = 0; i < this.enemys.length; i++) {
      let point_index = this.enemys[i].spawn;
      if ((0 <= point_index) && (point_index <= this.placed.length - 1)) {
        this.placed[point_index] = true;
      }

      //Enemys update
      this.enemys[i].setTarget(this.target.copy().add(createVector(this.wOffset, this.hOffset)));
      this.enemys[i].move();
    }


  }

  spawn(type, index) {
    switch (type) {
      case 1:
        this.enemys.push(new Enemy(this.pts["" + index][0] + this.wOffset, this.pts["" + index][1] + this.hOffset, index - 1));
        this.placed[index - 1] = true;
        break;
      default:
        console.log('type incorrecto');
        break;
    }
  }

  add(type, x, y, n = 1) {
    //En funcion del tipo de enemigo
    switch (type) {
      case 1:
        //Los creamos en funcion de n
        if (n == 1) {
          this.enemys.push(new Enemy(x + this.wOffset, y + this.hOffset));
        } else {
          for (let i = 0; i < n; i++) {
            this.enemys.push(new Enemy(x[i] + this.wOffset, y[i] + this.hOffset));
          }
        }
        break;
      default:
        console.log('type incorrecto');
        break;
    }
  }

  show() {
    for (let i = 0; i < this.enemys.length; i++) {
      this.enemys[i].show();
    }
  }

  getShootable() {
    // let e = this.enemys;
    //para no devolver los disparables habria que modficar como se actua,
    //(array pasa por referencia)
    return this.enemys;
  }

}
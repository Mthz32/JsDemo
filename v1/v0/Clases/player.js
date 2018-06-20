class Player {

  constructor(b, wid, heig, sT) {
    this.hp = 100;
    this.size = 20;
    this.borders = b;

    //Offset de translacion de la pantalla
    this.wOffset = wid;
    this.hOffset = heig;
    //Offset para el show
    this.show_incr_x = this.size * cos(PI / 6);
    this.show_incr_y = this.size * sin(PI / 6);

    //Movement settings
    this.impulse = 0.8;
    this.back_factor = 0.7;
    this.ang_impulse = 0.008;
    this.movementManager = new MovementSystem();

    this.shootManager = new ShootManager(wid, heig, sT);
  }

  show() {
    push();

    translate(this.wOffset, this.hOffset);
    rotate(this.movementManager.angle);
    stroke(255);
    strokeWeight(2);

    line(-this.show_incr_x, +1.35 * this.show_incr_y, +this.show_incr_x, +1.35 * this.show_incr_y); //HORIZONTAL
    line(-this.show_incr_x, +1.35 * this.show_incr_y, 0, -1.35 * this.size);
    line(+this.show_incr_x, +1.35 * this.show_incr_y, 0, -1.35 * this.size);

    pop();
  }

  update() {
    //CALCULAMOS EL INPUT RELATIVO A MOVIMIENTO
    let movement_input =
      (keyIsDown(UP_ARROW)) ?
      createVector(+this.impulse * sin(this.movementManager.angle), -this.impulse * cos(this.movementManager.angle)) :
      (keyIsDown(DOWN_ARROW)) ?
      createVector(-this.back_factor * this.impulse * sin(this.movementManager.angle), +this.back_factor * this.impulse * cos(this.movementManager.angle)) :
      createVector(0, 0);

    this.movementManager.addLinearForce(movement_input);

    //CALCULAMOS EL INPUT RELATIVO A ROTACION
    let rotation_input =
      (keyIsDown(RIGHT_ARROW)) ?
      +this.ang_impulse :
      (keyIsDown(LEFT_ARROW)) ?
      -this.ang_impulse : 0;

    this.movementManager.addAngularForce(rotation_input);

    //Calculamos la nueva posicion
    this.movementManager.update();
    this.shootManager.update(this.getShootPoint(), this.movementManager.angle);

    //ASEGURAMOS QUE SE MANTIENE DENTRO DEL MAPA
    this.posConstrain();
  }

  posConstrain() {
    let x = this.movementManager.pos.x + this.wOffset;
    let y = this.movementManager.pos.y + this.hOffset;
    let off = this.size / 2;

    let verticalBorder = [this.borders[0], this.borders[2]];
    let aux = -1;
    for (let i = 0; i < verticalBorder.length; i++) { //Para bordes inferiores y superiores
      aux = -aux; //1 en la primera iteracion, -1 en la segunda ( para ajustar las inecuaciones de si el limite es mayor o menor )
      for (let j = 0; j < verticalBorder[i].length; j++) { //Para cada borde de este tipo
        let b = verticalBorder[i][j];
        if (((b.x1 - off <= x) && (x <= b.x2 + off)) || ((b.x2 - off <= x) && (x <= b.x1 + off))) { //Si está contenido en el margen [x1,x2] podemos colisionar en y
          let limit = b.y2 + ((b.y1 - b.y2) * (b.x2 - x) / (b.x2 - b.x1)); //limit = b + mx ( para bordes inclinados y_borde(x) )
          if ((aux * y <= aux * limit) && (aux * y >= aux * limit - b.w)) { //Si esta contenido entre el borde y su margen exterior
            this.movementManager.pos.y = limit - this.hOffset;
          }
        }
      }
    }

    let horizontalBorder = [this.borders[3], this.borders[1]];
    aux = -1;
    for (let i = 0; i < horizontalBorder.length; i++) {
      aux = -aux; //1 en la primera iteracion, -1 en la segunda ( para ajustar las inecuaciones de si el limite es mayor o menor )
      for (let j = 0; j < horizontalBorder[i].length; j++) { //Para cada borde de este tipo
        let b = horizontalBorder[i][j];
        if (((b.y1 - off <= y) && (y <= b.y2 + off)) || ((b.y2 - off <= y) && (y <= b.y1 + off))) { //Si está contenido en el margen [x1,x2] podemos colisionar en y
          let limit = b.x2 + ((b.x1 - b.x2) * (b.y2 - y) / (b.y2 - b.y1)); //limit = b + mx ( para bordes inclinados y_borde(x) )
          if ((aux * x <= aux * limit) && (aux * x >= aux * limit - b.w)) { //Si esta contenido entre el borde y su margen exterior
            this.movementManager.pos.x = limit - this.wOffset;
          }
        }
      }
    }

  }

  getShootPoint() {
    let p = this.movementManager.pos.copy();
    p.add(createVector(this.size * sin(this.movementManager.angle), -this.size * cos(this.movementManager.angle)));
    return p;
  }

  getPosition() {
    return this.movementManager.pos;
  }
}
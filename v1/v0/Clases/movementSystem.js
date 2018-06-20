class MovementSystem {
  constructor() {
    this.pos = createVector(0, 0);
    this.angle = 0;

    this.vel = createVector(0, 0);
    this.ang_vel = 0;

    this.acel = createVector(0, 0);
    this.ang_acel = 0;

    this.max_vel = 20;
    this.max_ang_vel = 0.8;
    this.min_vel = 0.05;
    this.min_ang_vel = 0.0005;

    this.friction = 0.1;
    this.ang_friction = 0.08;
  }

  addLinearForce(movement_force) {
    this.acel.add(movement_force);
  }

  addAngularForce(rotation_force) {
    this.ang_acel += rotation_force;
  }

  update() {
    //Calculo de velocidades
    this.vel.add(this.acel);
    this.ang_vel += this.ang_acel;

    //Limitacion de velocidades
    // Lineal
    let m =
      (this.vel.mag() <= this.min_vel) ? 0 :
      (this.vel.mag() >= this.max_vel) ? this.max_vel :
      this.vel.mag();
    this.vel.setMag(m);

    // Angular
    this.ang_vel =
      (abs(this.ang_vel) <= this.min_ang_vel) ? 0 :
      (abs(this.ang_vel) >= this.max_ang_vel) ?
      (this.ang_vel < 0) ? -this.max_ang_vel : +this.max_ang_vel :
      this.ang_vel;

    //Actualizacion de la posicion
    this.pos.add(this.vel);
    this.angle += this.ang_vel;

    //Reseteamos la aceleracion
    this.acel.x = 0;
    this.acel.y = 0;
    this.ang_acel = 0;

    //Reducimos la velocidad
    this.vel.x *= (1 - this.friction);
    this.vel.y *= (1 - this.friction);
    this.ang_vel *= (1 - this.ang_friction);
  }
}
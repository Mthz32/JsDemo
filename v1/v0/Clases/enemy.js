class Enemy {

  constructor(x, y, spn = -1) {
    this.x = x;
    this.y = y;
    this.hp = 100;

    this.spawn = spn;

    this.r = 40;

    this.target;
    this.speed = 2;
  }

  show() {
    push();
    stroke(this.hp + 155, 0, 0);
    fill(this.hp + 155, 0, 0);
    ellipse(this.x, this.y, this.r, this.r);

    pop();
  }

  move() {
    let desired_x = this.target.x - this.x;
    let desired_y = this.target.y - this.y;

    let v = createVector(desired_x, desired_y).setMag(this.speed);
    this.x += v.x;
    this.y += v.y;
  }

  setTarget(t) {
    this.target = t;
  }

  getDmg(dmg) {
    this.hp -= dmg;
  }

  isAlive() {
    return (this.hp > 0);
  }
}
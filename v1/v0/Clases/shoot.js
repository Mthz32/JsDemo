class Shoot {

  constructor(p, a, dmg_, vel_, r_, range_) {
    this.x = p.x;
    this.y = p.y;
    this.dir = p5.Vector.fromAngle(a);
    this.vel = vel_;
    this.r = r_;
    this.range = range_;
    this.dmg = dmg_;
  }

  show() {
    push();
    stroke(255);
    fill(255);
    strokeWeight(1);
    ellipse(this.x, this.y, this.r, this.r);
    pop();
  }

  update() {
    this.x += this.vel * this.dir.x;
    this.y += this.vel * this.dir.y;
    this.range -= this.vel;
  }

  active() {
    return (this.range > 0);
  }
}
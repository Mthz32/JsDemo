class MapManager {
  constructor(m) {
    this.map = m;
  }

  getBorders() {
    return [
      this.map.borders.top,
      this.map.borders.right,
      this.map.borders.bottom,
      this.map.borders.left
    ]
  }

  getSpawnPoints() {
    return this.map.spawnPoints;
  }

  show() {

    //Show map borders
    let brs = this.getBorders()
    for (let i = 0; i < brs.length; i++) {
      let b = brs[i];
      for (let j = 0; j < b.length; j++) {
        line(b[j].x1, b[j].y1, b[j].x2, b[j].y2);
      }
    }

    // Show area borders
    // let keys = Object.keys(this.map.areas);
    // for (let i = 0; i < keys.length; i++) {
    //   let a = this.map.areas[keys[i]];
    //
    //   push();
    //   stroke(155, 255, 155);
    //   line(a.p1.x, a.p1.y, a.p2.x, a.p2.y);
    //   line(a.p2.x, a.p2.y, a.p3.x, a.p3.y);
    //   line(a.p3.x, a.p3.y, a.p4.x, a.p4.y);
    //   line(a.p4.x, a.p4.y, a.p1.x, a.p1.y);
    //   stroke(255);
    //   noFill()
    //   strokeWeight(2);
    //   textSize(18);
    //   text(keys[i], a.p1.x + 10, a.p1.y - 10);
    //   pop();
    // }
  }
}
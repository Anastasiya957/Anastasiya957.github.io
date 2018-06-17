class Spell {
  constructor(url, type, pos, size, speed, dir) {
    this.url = url;
    this.type = type;
    this.pos = pos;
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.dir = dir || 'horizontal';
  }

  render(ctx) {
    if(this.dir == 'vertical') {
      this.pos[1] += this.speed;
    } else {
      this.pos[0] += this.speed;
    }
      
    ctx.drawImage(resources.get(this.url), 
                  this.pos[0], this.pos[1],
                  this.size[0], this.size[1]);
  }
}
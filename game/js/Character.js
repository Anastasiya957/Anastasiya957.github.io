class Character {
	constructor(name, type, sex = 'male') {
    this.name = name;
    this.type = type;

    if (type === 'user') {
      this.size = [24, 45];
      this.coef = 2.5;
      this.pos = [canvas.width * 0.2, 
                  canvas.height - this.size[1]*this.coef - 53];
      this.hpLevel = 100;
      this.defeatedMonsters = 0;
      if (sex === 'male') {
        this.url = 'images/boy2.png';
      } else {
        this.url = 'images/girl2.png';
      }
    } else {
      this.size = [25, 20];
      this.coef = 3;
      this.pos = [canvas.width - canvas.width * 0.2 - 40, 
                  canvas.height - this.size[1]*this.coef - 50];
      this.hpLevel = 100;
      this.url = 'images/slimeMonster1.png';
    }
  }

  render(ctx) {
    ctx.drawImage(resources.get(this.url),
                  this.pos[0], this.pos[1],
                  this.size[0] * this.coef,
                  this.size[1] * this.coef);
  }

  get hp() {
    return this.hpLevel;
  }

  set hp(newHP) {
    this.hpLevel = newHP;
    this.hpLevel = (this.hpLevel >= 0) ? this.hpLevel : 0;
    this.hpLevel = (this.hpLevel <= 100) ? this.hpLevel : 100;
  }
}
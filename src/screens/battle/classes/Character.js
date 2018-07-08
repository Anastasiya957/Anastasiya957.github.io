import resources from './../resources';

export default class Character {
  constructor(name, coef, hpLevel) {
    this.name = name;
    this.coef = coef;
    this.hpLevel = hpLevel;
  }

  render(ctx) {
    ctx.drawImage(resources.get(this.url),
                  this.pos[0], this.pos[1],
                  this.size[0], this.size[1]);
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
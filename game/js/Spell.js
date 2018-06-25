class Spell {
  constructor(type, pos, character) {
    this.type = type;
    this.character = character;
    this.speed = Spell.info.speed[this.type];
    this.url = Spell.info.url[this.type];
    this.dir = Spell.info.dir[this.type];
    this.pos = pos;
    this.size = [100, 100];
  }

  render(ctx) {
    if(this.dir === 'vertical') {
      this.pos[1] += this.speed;
    } else {
      if (this.character === 'user') {
        this.pos[0] += this.speed;
      } else {
        this.pos[0] -= this.speed;
      }
    }
      
    ctx.drawImage(resources.get(this.url), 
                  this.pos[0], this.pos[1],
                  this.size[0], this.size[1]);
  }

  static get types() {
    return ['attack', 'explosion', 'cure'];
  }

  static get info() {
    return {
      speed: {
        'attack' : 10,
        'explosion' : 15,
        'cure' : 6
      },
      url: {
        'attack' : 'images/spell2.png',
        'explosion' : 'images/bigSpell2.png',
        'cure' : 'images/cure22.png'
      },
      hp: {
        'attack' : 15,
        'explosion' : 20,
        'cure' : 18
      },
      dir: {
        'attack' : 'horizontal',
        'explosion' : 'horizontal',
        'cure' : 'vertical'
      }
    }
  }

  get HP() {
    return Spell.info.hp[this.type];
  }
}
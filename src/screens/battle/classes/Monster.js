import Character from './Character';
import Spell from './Spell';
import resources from './../resources';

export default class Monster extends Character {
	constructor(canvas) {
    const coef = 3;
    const hpLevel = 100;
    const name = Monster.generateName();
    super(name, coef, hpLevel);
    this.generateBody(canvas);
  }

  createSpell() {
    const index = Math.ceil(Math.random() * 10) % Spell.types.length;
    const spellType = Spell.types[index];
    let spellPos;
    if (spellType === 'cure') {
      spellPos = [this.startPoint[0] - 10, this.startPoint[1] - 220];
    } else {
      spellPos = [this.startPoint[0], this.startPoint[1] - 35];
    }
    return new Spell(spellType, spellPos, 'monster');
  }

  render(ctx) {
    ctx.drawImage(resources.get(this.urls.torso),
                  this.pos.torso[0], this.pos.torso[1],
                  this.size.torso[0], this.size.torso[1]);
    ctx.drawImage(resources.get(this.urls.head),
                  this.pos.head[0], this.pos.head[1],
                  this.size.head[0], this.size.head[1]);
    ctx.drawImage(resources.get(this.urls.feet),
                  this.pos.feet[0], this.pos.feet[1],
                  this.size.feet[0], this.size.feet[1]);
  }

  static generateName() {
    const nameParts = Monster.nameParts;
    const firstIndex = Math.ceil(Math.random() * 10) % nameParts.first.length;
    const secondIndex = Math.ceil(Math.random() * 10) % nameParts.second.length;
    const thirdIndex = Math.ceil(Math.random() * 10) % nameParts.third.length;
    return `${nameParts.first[firstIndex]} ${nameParts.second[secondIndex]} ${nameParts.third[thirdIndex]}`;
  }

  generateBody(canvas) {
    this.size = {
      'head': [23 * this.coef, 19 * this.coef],
      'torso': [23 * this.coef, 16 * this.coef],
      'feet': [23 * this.coef, 13 * this.coef]
    };
    this.startPoint = [canvas.width - canvas.width * 0.2 - 40, 
                      canvas.height - this.size.feet[1]
                      - this.size.torso[1] - 50]
    this.pos = {
      head: [this.startPoint[0], this.startPoint[1] - this.size.head[1] + 4],
      torso: [this.startPoint[0], this.startPoint[1]],
      feet: [this.startPoint[0], this.startPoint[1] + this.size.feet[1] + 2]
    }
    const headIndex = Math.ceil(Math.random() * 10) % 3 + 1;
    const torsoIndex = Math.ceil(Math.random() * 10) % 3 + 1;
    const feetIndex = Math.ceil(Math.random() * 10) % 3 + 1;
    this.urls = {
      head: `images/monster-parts/head${headIndex}.png`,
      torso: `images/monster-parts/torso${torsoIndex}.png`,
      feet: `images/monster-parts/feet${feetIndex}.png`
    }
  }

  static get nameParts() {
    return {
      first: ['Horrible', 'Huge', 'Furious', 'Nasty'],
      second: ['Orc', 'Goblin', 'Dwarf'],
      third: ['Bob', 'Earl', 'Rick', 'Sam', 'Dave']
    }
  }
}
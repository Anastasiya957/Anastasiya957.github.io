import Character from './Character';
import Spell from './Spell';

export default class User extends Character {
	constructor(name, sex, canvas) {
    const coef = 2.5;
    const hpLevel = 100;
    super(name, coef, hpLevel);
    this.size = [24 * this.coef, 45 * this.coef];
    this.pos = [canvas.width * 0.2, 
                canvas.height - this.size[1] - 53];
    this.url = (sex === 'male') ? 'images/boy2.png' : 'images/girl2.png';
    this.defeatedMonsters = 0;
  }

  createSpell(spellType) {
    let pos;
    if (spellType === 'cure') {
      pos = [this.pos[0] - 10, this.pos[1] - 220];
    } else {
      pos = [this.pos[0], this.pos[1]];
    }
    return new Spell(spellType, pos, 'user');
  }
}
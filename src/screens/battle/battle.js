import User from './classes/User';
import Monster from './classes/Monster';
import Spell from './classes/Spell';
import resources from './resources';
import { MessageComponent } from './../../components/message';
import { ModalDialogComponent } from './../../components/modal-dialog';
import { TaskComponent } from './../../components/tasks';
import { records } from './../../components/records';
import './images/boy2.png';
import './images/girl2.png';
import './images/spell2.png';
import './images/bigSpell2.png';
import './images/cure22.png';
import './images/monster-parts/head1.png';
import './images/monster-parts/head2.png';
import './images/monster-parts/head3.png';
import './images/monster-parts/torso1.png';
import './images/monster-parts/torso2.png';
import './images/monster-parts/torso3.png';
import './images/monster-parts/feet1.png';
import './images/monster-parts/feet2.png';
import './images/monster-parts/feet3.png';

const mainHTMLElem = document.querySelector('main');
let parentElem;
let canvas;
let ctx;
let user;
let monster;
let activeSpell;
let move = 'user';
let isRoundOver;
let requestID;
let gameState;

function startGame() {
  isRoundOver = false;
  const userInfo = JSON.parse(localStorage.currentUser);
  gameState = 'go';
  user = new User(userInfo.name, userInfo.sex, canvas);
  monster = new Monster(canvas);
  MessageComponent.render(mainHTMLElem, 'Wizard battle!');

  if(resources.get('images/boy2.png')) {
    init();
  } else {
    resources.load([
      'images/boy2.png',
      'images/girl2.png',
      'images/spell2.png',
      'images/bigSpell2.png',
      'images/cure22.png',
      'images/monster-parts/head1.png',
      'images/monster-parts/head2.png',
      'images/monster-parts/head3.png',
      'images/monster-parts/torso1.png',
      'images/monster-parts/torso2.png',
      'images/monster-parts/torso3.png',
      'images/monster-parts/feet1.png',
      'images/monster-parts/feet2.png',
      'images/monster-parts/feet3.png',
    ]);
    resources.onReady(init);
  }  
}

function init() {
  startRound(false);
  main();
}

async function startRound(resetDataFLag) {
  await resolveAfter(2000);
  MessageComponent.remove();
  ModalDialogComponent.render(mainHTMLElem);
  chooseSpell();

  if (resetDataFLag) {
    resetData();
  }
}

function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  render();
  requestID = requestAnimationFrame(main);
}

function update() {
  if(activeSpell instanceof Spell) {
    checkSpellDestination();
  }
  if(activeSpell === null) {
    activeSpell = 'not-ready';
    createSpell();
  }
}


function chooseSpell() {
  const spellsWindow = document.querySelector('.modal-dialog .spells');
  spellsWindow.addEventListener('click', ModalDialogComponent.chooseSpell, false);
  spellsWindow.addEventListener('click', getSpellType, false);
}

function getSpellType(event) {
  if(event.target.tagName.toLowerCase() === 'img' ||
     event.target.tagName.toLowerCase() === 'figcaption') {
    const spellsWindow = event.target.closest('.modal-dialog .spells');
    const spellType = ModalDialogComponent.getSpellType();
    spellsWindow.removeEventListener('click', ModalDialogComponent.chooseSpell, false);
    spellsWindow.removeEventListener('click', getSpellType, false);
    ModalDialogComponent.remove();

    checkSolutionOfTask()
      .then(() => {
        if (spellType === 'explosion') {
          TaskComponent.remove();
          return checkSolutionOfTask();
        }
      })
      .then(() => {
        TaskComponent.remove();
        activeSpell = user.createSpell(spellType);
      })
      .catch((taskAnswer) => {
        TaskComponent.renderMsg(document.querySelector('.task-window'), taskAnswer);
        passMoveToMonster();
      });
  }
}

function checkSolutionOfTask() {
  return new Promise(function(resolve, reject) {
    TaskComponent.render(mainHTMLElem);
    const taskWindow = document.querySelector('.task-window');
    const castSpellBtn = taskWindow.querySelector('.submit-task button');
    const task = TaskComponent.createTask(taskWindow);
    const handler = function(event) {
      return checkAnswer(event, task, handler, resolve, reject);
    };
    castSpellBtn.addEventListener('click', handler, false);
  });
}

function checkAnswer(event, task, handler, resolve, reject) {
  event.target.removeEventListener('click', handler, false);
  const input = event.target.closest('section').querySelector('input');
  if (task.checkAnswer(Number(input.value))) {
    resolve();
  } else {
    reject(task.answer);
  }
}

async function passMoveToMonster() {
  await resolveAfter(5000);
  TaskComponent.remove();
  move = 'monster';
  activeSpell = null;
}

function checkSpellDestination() {
  if (activeSpell.type !== 'cure') {
    let finalX;
    finalX = (move ==='user') ? monster.startPoint[0] : user.pos[0];
    if (move === 'user') {
      if (activeSpell.pos[0] >= finalX) {
        monster.hp -= activeSpell.HP;
        activeSpell = null;
        move = 'monster';
      }
    } else {
      if (activeSpell.pos[0] <= finalX) {
        user.hp -= activeSpell.HP;
        activeSpell = null;
        move = 'user';
      }
    }
  } else if (activeSpell.type === 'cure') {
    let finalY;
    finalY = (move ==='user') ? user.pos[1] : monster.startPoint[1];
    finalY -= 40;
    if (activeSpell.pos[1] >= finalY) {
      if (move === 'user') {
        user.hp += activeSpell.HP;
        move = 'monster';
      } else {
        monster.hp += activeSpell.HP;
        move = 'user';
      }
      activeSpell = null;
    }
  }
  if (monster.hp === 0 || user.hp === 0) {
    isRoundOver = true;
  }
}

function createSpell() {
  if(checkGame()) { return }
  if(move === 'monster') {
    activeSpell = monster.createSpell();
  }
  if(move === 'user') {
    ModalDialogComponent.render(mainHTMLElem);
    chooseSpell();
  }
}

function checkGame() {
  if (isRoundOver) {
    let msg;
    if (monster.hp === 0) {
      msg = 'Congratulations! You won!';
    } else {
      msg = 'Game over.';
    }
    MessageComponent.render(mainHTMLElem, msg);
    
    if (monster.hp === 0) {
      startRound(true);
    } else {
      records.add(user.defeatedMonsters);
      endGame();
    }
    return true;
  }
  return false;
}

function resetData() {
  isRoundOver = false;
  move = 'user';
  user.hp = 100;
  user.defeatedMonsters += 1;
  monster = new Monster(canvas);
}


async function endGame() {
  await resolveAfter(2000);
  MessageComponent.remove();
  gameState = 'over';
  cancelAnimationFrame(requestID);
}

function checkGameState() {
  return gameState === 'over';
}

function render() {
  user.render(ctx);
  monster.render(ctx);
  renderHPLine('user', user.hp);
  renderHPLine('monster', monster.hp);
  renderName('user', user.name);
  renderName('monster', monster.name);
  renderDefetedMonsters();
  renderSpell(activeSpell);
};

function renderSpell(activeSpell) {
  if(activeSpell instanceof Spell) {
    activeSpell.render(ctx);
  }   
}

function renderHPLine(type, hp) {
  let hpHeight = 30;
  let hpWidth = hp * 2;
  let y = 50;
  let x;
  if (type === "user") {
    x = 50;
  } else if (type === "monster") {
    x = canvas.width - 250;
  }
  ctx.strokeStyle = "black";
  ctx.strokeRect(x, y, 200, hpHeight);

  ctx.beginPath();
  ctx.rect(x, y, hpWidth, hpHeight);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();

  let xRed = 200 - hpWidth;
  ctx.beginPath();
  ctx.rect(x + hpWidth, y, xRed, hpHeight);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();

  ctx.font = "20px Georgia";
  ctx.fillStyle = "white";
  ctx.fillText(hp, x + 90, y + 20);
}

function renderName(type, name) {
  let x;
  let y = 100;
  if (type === "user") {
    x = 50 + 10;
  } else if (type === "monster") {
    x = canvas.width - 250 + 10;
  }

  ctx.font = "20px Georgia";
  ctx.fillStyle = "black";
  ctx.fillText(name, x, y);
}

function renderDefetedMonsters() {
  let x = 60;
  let y = 120;
  let defMonsters = user.defeatedMonsters;
  ctx.font = "16px Georgia";
  ctx.fillStyle = "#252525";
  ctx.fillText(`Defeated Monsters: ${defMonsters}`, x, y);
}

function resolveAfter(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

function initField(parent) {
  parentElem = parent;
  parentElem.insertAdjacentHTML('afterBegin', this.html);
  canvas = parentElem.querySelector('#myCanvas');
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function remove() {
  if (parentElem) {
    parentElem.removeChild(parentElem.querySelector('#myCanvas'));
    parentElem = null;
  }
}

const battleScreen = {
  initField: initField,
  remove: remove,
  startGame: startGame,
  checkGameState: checkGameState
}

export { battleScreen };
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let modalDialogue = document.querySelector('.modal-dialogue');
let spellsWindow = document.querySelector('.spells');
let taskWindow = document.querySelector('.task-window');
let castSpellBtn = taskWindow.querySelector('button');

let user = {
  url: 'images/boy.png',
  pos: [300, 600],
  size: [35, 55],
  sx: 55,
  sy: 135,
  coef: 2,
  hp: 100
};

let monster = {
  url: 'images/slimeMonster.png',
  pos: [canvas.width - user.pos[0], 650],
  size: [25, 25],
  sx: 0,
  sy: 50,
  coef: 3,
  hp: 50
};

let activeSpell;
let move = 'user';
let isGameOver = false;

let spellsSpeed = {
  'attack' : 10,
  'explosion' : 15,
  'cure' : 6
};

let spellsUrl = {
  'attack' : 'images/spell2.png',
  'explosion' : 'images/bigSpell2.png',
  'cure' : 'images/cure22.png'
}

let spellsHP = {
  'attack' : 15,
  'explosion' : 20,
  'cure' : 18
}

resources.load([
    'images/boy.png',
    'images/slimeMonster.png',
    'images/spell2.png',
    'images/bigSpell2.png',
    'images/cure22.png'
]);
resources.onReady(init);

function init() {
  setTimeout(function() {
    document.querySelector('.greeting').classList.add('hidden');
    modalDialogue.classList.remove('hidden');
  }, 1500);

  main();
}

function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  render();
  requestAnimationFrame(main);
}

function update() {
  if(activeSpell instanceof Spell) {
    checkSpell();
  }
  if(activeSpell === null) {
    activeSpell = 'not-ready';
    createSpell();
  }
}

function checkGame() {
  if (isGameOver) {
    let msg;
    if (monster.hp === 0) {
      msg = 'Congratulations! You won!';
    } else {
      msg = 'Game over.';
    }
    document.querySelector('.end-msg p').innerText = msg;
    document.querySelector('.end-msg').classList.remove('hidden');
    modalDialogue.classList.add('hidden');
    return true;
  }
  return false;
}

function checkSpell() {
  if (activeSpell.type !== 'cure') {
    let finalX;
    if (move === 'user') {
      finalX = monster.pos[0];
    } else {
      finalX = user.pos[0];
    }
    if (move === 'user') {
      if (activeSpell.pos[0] >= finalX) {
        monster.hp -= spellsHP[activeSpell.type];
        monster.hp = (monster.hp >= 0) ? monster.hp : 0;
        activeSpell = null;
        move = 'monster';
      }
    } else {
      if (activeSpell.pos[0] <= finalX) {
        user.hp -= spellsHP[activeSpell.type];
        user.hp = (user.hp >= 0) ? user.hp : 0;
        activeSpell = null;
        move = 'user';
      }
    }
  } else if (activeSpell.type === 'cure') {
    let finalY;
    if (move == 'user') {
      finalY = user.pos[1];
    } else {
      finalY = monster.pos[1];
    }
    if (activeSpell.pos[1] >= finalY) {
      if (move === 'user') {
        user.hp += spellsHP[activeSpell.type];
        user.hp = (user.hp <= 100) ? user.hp : 100;
        move = 'monster';
      } else {
        monster.hp += spellsHP[activeSpell.type];
        monster.hp = (monster.hp <= 100) ? monster.hp : 100;
        move = 'user';
      }
      activeSpell = null;
    }
  }
  if (monster.hp === 0 || user.hp === 0) {
    isGameOver = true;
  }
}

function createSpell() {
  if(checkGame()) { return }
  if(move === 'monster') {
    let i = Math.ceil(Math.random() * 10) % 3;
    spellType = Object.keys(spellsSpeed)[i];
    let pos;
    let dir;
    let speed;
    if (spellType === 'cure') {
      dir = 'vertical';
      pos = [monster.pos[0] - 10, 400];
      speed = spellsSpeed[spellType];
    } else {
      dir = 'horizontal';
      pos = [monster.pos[0], monster.pos[1] - 15];
      speed = -spellsSpeed[spellType];
    }
    let spell = new Spell(spellsUrl[spellType], spellType, pos, [100, 100], speed, dir);
    activeSpell = spell;
  }
  if(move === 'user') {
    modalDialogue.classList.remove('hidden');
  }
}

function render() {
  renderCharacter(user);
  renderCharacter(monster);
  drawHPLine('user', user.hp);
  drawHPLine('monster', monster.hp);
  drawName('user','User');
  drawName('monster','Monster');
  renderSpell(activeSpell);
};

function renderCharacter(entity) {
  ctx.drawImage(resources.get(entity.url), 
                entity.sx, entity.sy,
                entity.size[0], entity.size[1],
                entity.pos[0], entity.pos[1],
                entity.size[0] * entity.coef,
                entity.size[1] * entity.coef);
}

function renderSpell(activeSpell) {
  if(activeSpell instanceof Spell) {
    activeSpell.render(ctx);
  }   
}

function drawHPLine(type, hp) {
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

function drawName(type, name) {
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

function chooseSpell(event) {
  if(event.target.tagName.toLowerCase() === 'img' ||
     event.target.tagName.toLowerCase() === 'figcaption') {
    let spellType = event.target.closest('figure').children[1].innerText.toLowerCase(); 
    modalDialogue.classList.add('hidden');
    checkSolutionOfTask()
      .then(() => {
        if (spellType === 'explosion') {
          return checkSolutionOfTask();
        }
      })
      .then(() => {
        taskWindow.classList.add('hidden');
        buildSpell(spellType);
      })
      .catch((taskAnswer) => {
        let pNote = taskWindow.querySelector('.note');
        pNote.innerHTML = `Sorry, but your answer is wrong. The right answer is <span>${taskAnswer}</span>.`;
        passMoveToMonster();
      });
  }
}

function checkSolutionOfTask() {
  return new Promise(function(resolve, reject) {
    taskWindow.classList.remove('hidden');
    let task = createTask();
    let handler = function(event) {
      return checkAnswer(event, task, handler, resolve, reject);
    };
    castSpellBtn.addEventListener('click', handler, false);
  });
}

function createTask() {
  let task = new Task('math');
  task.generateTask();
  task.render(taskWindow);
  return task;
}

function checkAnswer(event, task, handler, resolve, reject) {
  castSpellBtn.removeEventListener('click', handler, false);
  let input = event.target.closest('section').querySelector('input');

  if (task.checkAnswer(Number(input.value))) {
    resolve();
  } else {
    reject(task.answer);
  }
}

function buildSpell(spellType) {
  let dir;
  let pos;
  if (spellType === 'cure') {
    dir = 'vertical';
    pos = [user.pos[0] - 10, 400];
  } else {
    dir = 'horizontal';
    pos = [user.pos[0], user.pos[1]];
  }
    
  let spell = new Spell(spellsUrl[spellType], spellType, pos, [100, 100], spellsSpeed[spellType], dir);
  activeSpell = spell;
}

async function passMoveToMonster() {
  await resolveAfter(5000);
  taskWindow.classList.add('hidden');
  move = 'monster';
  activeSpell = null;
}

function resolveAfter(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

spellsWindow.addEventListener('click', chooseSpell, false);
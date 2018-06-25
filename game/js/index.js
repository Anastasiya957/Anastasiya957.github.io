let canvas = document.getElementById('myCanvas');
let userInfo = document.querySelector('.info');
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let greetingWindow = document.querySelector('.greeting');
let modalDialogue = document.querySelector('.modal-dialogue');
let spellsWindow = document.querySelector('.spells');
let taskWindow = document.querySelector('.task-window');
let castSpellBtn = taskWindow.querySelector('button');
let recordsWindow = document.querySelector('.game-records');

let user;
let sex = 'male';
let monster = new Character('Monster', 'monster');

let activeSpell;
let move = 'user';
let isGameOver = false;

if (!localStorage.getItem('Records')) {
  localStorage.setItem('Records', JSON.stringify({}));
}

function startGame() {
  let name = userInfo.querySelector('input[name="name"]').value;
  name = name ? name : 'User';
  user = new Character(name, 'user', sex);
  records.saveCurrentUser(name, sex);
  document.querySelector('.user-info').classList.add('hidden');
  greetingWindow.classList.remove('hidden');
  resources.load([
    'images/boy2.png',
    'images/girl2.png',
    'images/slimeMonster1.png',
    'images/spell2.png',
    'images/bigSpell2.png',
    'images/cure22.png'
  ]);
  resources.onReady(init);
}

function init() {
  startRound();
  main();
}

async function startRound() {
  await resolveAfter(2000);
  greetingWindow.classList.add('hidden');
  modalDialogue.classList.remove('hidden');
}

function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  render();
  requestAnimationFrame(main);
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

function checkSpellDestination() {
  if (activeSpell.type !== 'cure') {
    let finalX;
    finalX = (move ==='user') ? monster.pos[0] : user.pos[0];
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
    finalY = (move ==='user') ? user.pos[1] : monster.pos[1];
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
    isGameOver = true;
  }
}

function createSpell() {
  if(checkGame()) { return }
  if(move === 'monster') {
    let i = Math.ceil(Math.random() * 10) % 3;
    spellType = Spell.types[i];
    let pos;
    if (spellType === 'cure') {
      pos = [monster.pos[0] - 10, monster.pos[1] - 220];
    } else {
      pos = [monster.pos[0], monster.pos[1] - 15];
    }
    let spell = new Spell(spellType, pos, move);
    activeSpell = spell;
  }
  if(move === 'user') {
    modalDialogue.classList.remove('hidden');
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
    
    if (monster.hp === 0) {
      resetGame();
    } else {
      records.add(user.defeatedMonsters);
      endGame();
    }
    return true;
  }
  return false;
}

async function resetGame() {
  await resolveAfter(2000);
  document.querySelector('.end-msg').classList.add('hidden');
  modalDialogue.classList.remove('hidden');
  isGameOver = false;
  move = 'user';
  resetData();
}

function resetData() {
  user.hp = 100;
  user.defeatedMonsters += 1;
  monster.hp = 100;
}

async function endGame() {
  await resolveAfter(2000);
  document.querySelector('.end-msg').classList.add('hidden');
  canvas.classList.add('hidden');
  recordsWindow.classList.remove('hidden');
  records.render(recordsWindow.querySelector('table'));
}

function render() {
  user.render(ctx);
  monster.render(ctx);
  renderHPLine(user.type, user.hp);
  renderHPLine(monster.type, monster.hp);
  renderName(user.type, user.name);
  renderName(monster.type, monster.name);
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
    let task = Task.create();
    let handler = function(event) {
      return checkAnswer(event, task, handler, resolve, reject);
    };
    castSpellBtn.addEventListener('click', handler, false);
  });
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
  let pos;
  if (spellType === 'cure') {
    pos = [user.pos[0] - 10, user.pos[1] - 220];
  } else {
    pos = [user.pos[0], user.pos[1]];
  }
  let spell = new Spell(spellType, pos, move);
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

function chooseGender(event) {
  if(event.target.closest('p')) {
    let children = event.target.closest('div').children;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove('selected');
    }
    event.target.closest('p').classList.add('selected');
    sex = event.target.closest('p').innerText.toLowerCase();
  }
}

function reload() {
  document.location.reload();
}

userInfo.querySelector('.radio-btn').addEventListener('click', chooseGender, false);
userInfo.querySelector('button').addEventListener('click', startGame, false);
spellsWindow.addEventListener('click', chooseSpell, false);
recordsWindow.querySelector('button').addEventListener('click', reload, false);
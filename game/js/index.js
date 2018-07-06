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
let monster = new Monster();
let activeSpell;
let move = 'user';
let isGameOver = false;

if (!localStorage.getItem('Records')) {
  localStorage.setItem('Records', JSON.stringify({}));
}

function startGame() {
  let name = userInfo.querySelector('input[name="name"]').value;
  name = name ? name : 'User';
  user = new User(name, sex);
  records.saveCurrentUser(name, sex);
  document.querySelector('.user-info').classList.add('hidden');
  greetingWindow.classList.remove('hidden');
  resources.load([
    'images/boy2.png',
    'images/girl2.png',
    'images/slimeMonster1.png',
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
    isGameOver = true;
  }
}

function createSpell() {
  if(checkGame()) { return }
  if(move === 'monster') {
    activeSpell = monster.createSpell();
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
  monster = new Monster();
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
        activeSpell = user.createSpell(spellType);
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
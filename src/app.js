import './index.css';
import { landingPageScreen } from './screens/landing-page';
import { loginScreen } from './screens/login';
import { battleScreen } from './screens/battle';
import { scoreScreen } from './screens/score';

const main = document.querySelector('main');
landingPageScreen.render(main);


const startGameBnt = document.querySelector('.landing-page button');
let intervalID;


if (!localStorage.getItem('Records')) {
  localStorage.setItem('Records', JSON.stringify({}));
}

function login() {
  landingPageScreen.remove();
  scoreScreen.remove();
  loginScreen.render(main);
  const loginBtn = document.querySelector('.login-form button');
  const radioBtn = document.querySelector('.login-form .radio-btn');
  radioBtn.addEventListener('click', loginScreen.chooseGender, false);
  loginBtn.addEventListener('click', loginScreen.login, false);
  loginBtn.addEventListener('click', startGame, false);
}

function startGame(event) {
  const loginBtn = event.target;
  const radioBtn = event.target.parentElement.querySelector('.radio-btn');
  loginBtn.removeEventListener('click', loginScreen.login, false);
  loginBtn.removeEventListener('click', startGame, false);
  radioBtn.removeEventListener('click', loginScreen.chooseGender, false);
  loginScreen.remove();
  battleScreen.initField(main);
  battleScreen.startGame();
  intervalID = setInterval(checkGame, 1000);
}


function checkGame() {
  if (battleScreen.checkGameState()) {
    clearInterval(intervalID);
    battleScreen.remove();
    scoreScreen.render(main);
    scoreScreen.renderScore(main.querySelector('.game-records'));
    const startGameBtn = main.querySelector('.game-records button');
    startGameBtn.addEventListener('click', login, false);
  }
}

startGameBnt.addEventListener('click', login, false);
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _screens_landing_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./screens/landing-page */ "./src/screens/landing-page/index.js");
/* harmony import */ var _screens_login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./screens/login */ "./src/screens/login/index.js");
/* harmony import */ var _screens_battle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./screens/battle */ "./src/screens/battle/index.js");
/* harmony import */ var _screens_score__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./screens/score */ "./src/screens/score/index.js");






const main = document.querySelector('main');
_screens_landing_page__WEBPACK_IMPORTED_MODULE_1__["landingPageScreen"].render(main);


const startGameBnt = document.querySelector('.landing-page button');
let intervalID;


if (!localStorage.getItem('Records')) {
  localStorage.setItem('Records', JSON.stringify({}));
}

function login() {
  _screens_landing_page__WEBPACK_IMPORTED_MODULE_1__["landingPageScreen"].remove();
  _screens_score__WEBPACK_IMPORTED_MODULE_4__["scoreScreen"].remove();
  _screens_login__WEBPACK_IMPORTED_MODULE_2__["loginScreen"].render(main);
  const loginBtn = document.querySelector('.login-form button');
  const radioBtn = document.querySelector('.login-form .radio-btn');
  radioBtn.addEventListener('click', _screens_login__WEBPACK_IMPORTED_MODULE_2__["loginScreen"].chooseGender, false);
  loginBtn.addEventListener('click', _screens_login__WEBPACK_IMPORTED_MODULE_2__["loginScreen"].login, false);
  loginBtn.addEventListener('click', startGame, false);
}

function startGame(event) {
  const loginBtn = event.target;
  const radioBtn = event.target.parentElement.querySelector('.radio-btn');
  loginBtn.removeEventListener('click', _screens_login__WEBPACK_IMPORTED_MODULE_2__["loginScreen"].login, false);
  loginBtn.removeEventListener('click', startGame, false);
  radioBtn.removeEventListener('click', _screens_login__WEBPACK_IMPORTED_MODULE_2__["loginScreen"].chooseGender, false);
  _screens_login__WEBPACK_IMPORTED_MODULE_2__["loginScreen"].remove();
  _screens_battle__WEBPACK_IMPORTED_MODULE_3__["battleScreen"].initField(main);
  _screens_battle__WEBPACK_IMPORTED_MODULE_3__["battleScreen"].startGame();
  intervalID = setInterval(checkGame, 1000);
}


function checkGame() {
  if (_screens_battle__WEBPACK_IMPORTED_MODULE_3__["battleScreen"].checkGameState()) {
    clearInterval(intervalID);
    _screens_battle__WEBPACK_IMPORTED_MODULE_3__["battleScreen"].remove();
    _screens_score__WEBPACK_IMPORTED_MODULE_4__["scoreScreen"].render(main);
    _screens_score__WEBPACK_IMPORTED_MODULE_4__["scoreScreen"].renderScore(main.querySelector('.game-records'));
    const startGameBtn = main.querySelector('.game-records button');
    startGameBtn.addEventListener('click', login, false);
  }
}

startGameBnt.addEventListener('click', login, false);

/***/ }),

/***/ "./src/components/message/index.js":
/*!*****************************************!*\
  !*** ./src/components/message/index.js ***!
  \*****************************************/
/*! exports provided: MessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _message_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./message.css */ "./src/components/message/message.css");
/* harmony import */ var _message_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_message_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _message_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./message.html */ "./src/components/message/message.html");
/* harmony import */ var _message_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_message_html__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./message */ "./src/components/message/message.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessageComponent", function() { return _message__WEBPACK_IMPORTED_MODULE_2__["MessageComponent"]; });





_message__WEBPACK_IMPORTED_MODULE_2__["MessageComponent"].html = _message_html__WEBPACK_IMPORTED_MODULE_1___default.a;



/***/ }),

/***/ "./src/components/message/message.css":
/*!********************************************!*\
  !*** ./src/components/message/message.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/message/message.html":
/*!*********************************************!*\
  !*** ./src/components/message/message.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"message\">\r\n  <p></p>\r\n</section>";

/***/ }),

/***/ "./src/components/message/message.js":
/*!*******************************************!*\
  !*** ./src/components/message/message.js ***!
  \*******************************************/
/*! exports provided: MessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageComponent", function() { return MessageComponent; });
let parentElem;

function render(parent, msg) {
  parentElem = parent;
  parentElem.insertAdjacentHTML('afterBegin', this.html);
  parentElem.querySelector('.message p').innerText = msg;
}

function remove() {
  if (parentElem) {
    parentElem.removeChild(parentElem.querySelector('.message'));
    parentElem = null;
  }
}

const MessageComponent = {
  render: render,
  remove: remove
}



/***/ }),

/***/ "./src/components/modal-dialog/images/bigSpell2.png":
/*!**********************************************************!*\
  !*** ./src/components/modal-dialog/images/bigSpell2.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/bigSpell2.png";

/***/ }),

/***/ "./src/components/modal-dialog/images/cure22.png":
/*!*******************************************************!*\
  !*** ./src/components/modal-dialog/images/cure22.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/cure22.png";

/***/ }),

/***/ "./src/components/modal-dialog/images/spell2.png":
/*!*******************************************************!*\
  !*** ./src/components/modal-dialog/images/spell2.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/spell2.png";

/***/ }),

/***/ "./src/components/modal-dialog/index.js":
/*!**********************************************!*\
  !*** ./src/components/modal-dialog/index.js ***!
  \**********************************************/
/*! exports provided: ModalDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal_dialog_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal-dialog.css */ "./src/components/modal-dialog/modal-dialog.css");
/* harmony import */ var _modal_dialog_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modal_dialog_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modal_dialog_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal-dialog.html */ "./src/components/modal-dialog/modal-dialog.html");
/* harmony import */ var _modal_dialog_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modal_dialog_html__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modal_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal-dialog */ "./src/components/modal-dialog/modal-dialog.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalDialogComponent", function() { return _modal_dialog__WEBPACK_IMPORTED_MODULE_2__["ModalDialogComponent"]; });





_modal_dialog__WEBPACK_IMPORTED_MODULE_2__["ModalDialogComponent"].html = _modal_dialog_html__WEBPACK_IMPORTED_MODULE_1___default.a;



/***/ }),

/***/ "./src/components/modal-dialog/modal-dialog.css":
/*!******************************************************!*\
  !*** ./src/components/modal-dialog/modal-dialog.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/modal-dialog/modal-dialog.html":
/*!*******************************************************!*\
  !*** ./src/components/modal-dialog/modal-dialog.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<section class=\"modal-dialog\">\r\n  <h2>Choose your spell</h2>\r\n  <div class=\"spells\">\r\n    <figure class=\"spell\">\r\n      <img src=\"" + __webpack_require__(/*! ./images/spell2.png */ "./src/components/modal-dialog/images/spell2.png") + "\">\r\n      <figcaption>Attack</figcaption>  \r\n    </figure>\r\n  \t<figure class=\"spell\">\r\n      <img src=\"" + __webpack_require__(/*! ./images/bigSpell2.png */ "./src/components/modal-dialog/images/bigSpell2.png") + "\">\r\n      <figcaption>Explosion</figcaption>  \r\n    </figure>\r\n    <figure class=\"spell\">\r\n      <img src=\"" + __webpack_require__(/*! ./images/cure22.png */ "./src/components/modal-dialog/images/cure22.png") + "\">\r\n      <figcaption>Cure</figcaption>  \r\n    </figure>\r\n  </div>\r\n</section>";

/***/ }),

/***/ "./src/components/modal-dialog/modal-dialog.js":
/*!*****************************************************!*\
  !*** ./src/components/modal-dialog/modal-dialog.js ***!
  \*****************************************************/
/*! exports provided: ModalDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalDialogComponent", function() { return ModalDialogComponent; });
let parentElem;
let spellType;

function render(parent) {
  parentElem = parent;
  parentElem.insertAdjacentHTML('afterBegin', this.html);
}

function remove() {
  if (parentElem) {
    parentElem.removeChild(parentElem.querySelector('.modal-dialog'));
    parentElem = null;
  }
}

function chooseSpell(event) {
  if(event.target.tagName.toLowerCase() === 'img' ||
     event.target.tagName.toLowerCase() === 'figcaption') {
    spellType = event.target.closest('figure').children[1].innerText.toLowerCase();
  }
}

function getSpellType() {
  return spellType;
}

const ModalDialogComponent = {
  render: render,
  remove: remove,
  chooseSpell: chooseSpell,
  getSpellType: getSpellType
}



/***/ }),

/***/ "./src/components/records/index.js":
/*!*****************************************!*\
  !*** ./src/components/records/index.js ***!
  \*****************************************/
/*! exports provided: records */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "records", function() { return records; });
function saveCurrentUser(name, sex) {
  let currentUser = {
    name: name,
    sex: sex
  }
  const serialCurrentUser = JSON.stringify(currentUser);
  localStorage.setItem('currentUser', serialCurrentUser);
}

function addRecord(defMonsters) {
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let recordsObj = JSON.parse(localStorage.getItem('Records'));
  let count = 0;
  for (let key in recordsObj) {
    count += recordsObj[key].length;
  }

  if (count === 12) {
    let keys = Object.keys(recordsObj);
    keys = keys.map((item) => Number(item));
    keys.push(defMonsters);
    keys.sort((a,b) => a > b);
    if (defMonsters === keys[0]) {
      return;
    }
    deleteRecord(keys[0], recordsObj);
  }

  if(defMonsters in recordsObj) {
    recordsObj[defMonsters].push(currentUser.name);
  } else {
    recordsObj[defMonsters] = [currentUser.name];
  }
  localStorage.setItem('Records', JSON.stringify(recordsObj));
}

function deleteRecord(key, recordsObj) {
  if (recordsObj[key].length === 1) {
    delete recordsObj[key];
  } else {
    recordsObj[key].pop();
  }
}

function showRecords(table) {
  let tbody = document.querySelector('tbody');
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
  let recordsObj = JSON.parse(localStorage.getItem('Records'));
  let keys = Object.keys(recordsObj);
  keys.sort((a,b) => a > b);

  for (let i = keys.length - 1 ; i >= 0; i--) {
    show(table, keys[i], recordsObj[keys[i]]);
  }
}

function show(table, defMonsters, names) {
  names.forEach(name => {
    createRow(table, name, defMonsters);
  });
}

function createRow(table, name, defMonsters) {
  const row = document.createElement('tr');
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  td1.innerText = name;
  td2.innerText = defMonsters;
  row.appendChild(td1);
  row.appendChild(td2);
  table.querySelector('tbody').appendChild(row);
}

const records = { 
  saveCurrentUser: saveCurrentUser,
  add: addRecord,
  render: showRecords
};



/***/ }),

/***/ "./src/components/tasks/classes/Task.js":
/*!**********************************************!*\
  !*** ./src/components/tasks/classes/Task.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Task; });
class Task {
  constructor(type) {
    this.type = type;
    this.task = null;
  }

  static get mathOperations() {
    return ['+','-','*','/'];
  }

  generateTask() {
    if (this.type === 'math') {
      this.generateMathTask();
    }
    return this.task;
  }

  generateMathTask() {
    let i = Math.ceil(Math.random() * 10) % 4;
    let op = Task.mathOperations[i];
    let a;
    let b;
    if (op === '+' || op === '-') {
      a = Math.ceil(Math.random() * 100);
      b = Math.ceil(Math.random() * 100);
      if (a < b && op === '-') {
        this.task = [b, op, a];
      } else {
        this.task = [a, op, b];
      }
    } else if (op === '*') {
      a = Math.ceil(Math.random() * 100) % 51;
      b = Math.ceil(Math.random() * 10);
      this.task = (Math.random() > 0.5) ? [a, op, b] : [b, op, a];
    } else {
      a = Math.ceil(Math.random() * 10);
      a = (a === 0) ? 1 : a;
      let k = Math.ceil(Math.random() * 51);
      b = a * k;
      this.task = [b, op, a];
    }
  }

  checkAnswer(answer) {
    if (this.type === 'math') {
      return (eval(this.task.join('')) === answer);
    }
  }

  get answer() {
    if (this.type === 'math') {
      return eval(this.task.join(''));
    }
  }

  render(taskWindow) {
    let taskDiv = taskWindow.querySelector('.task');
    let submitDiv = taskWindow.querySelector('.submit-task');
    let input = submitDiv.querySelector('input');
    let button = submitDiv.querySelector('button');
    let pNote = taskWindow.querySelector('.note');
    this.clearElem(taskDiv);

    if (input) {
      input.value = '';
    } else {
      input = document.createElement('input');
      submitDiv.insertBefore(input, button);
    }

    if (this.type === 'math') {
      pNote.innerHTML = '<span>Hint</span>: write the correct answer.';
      let taskToRender = this.task.concat(['=', '?']);
      for (let i = 0; i < taskToRender.length; i++) {
        let symbol = document.createElement('div');
        symbol.innerText = taskToRender[i];
        taskDiv.appendChild(symbol);
      }
    }
  }

  clearElem(elem) {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  }

  static create(taskWindow, type = 'math') {
    let task = new Task(type);
    task.generateTask();
    task.render(taskWindow);
    return task;
  }
}

/***/ }),

/***/ "./src/components/tasks/index.js":
/*!***************************************!*\
  !*** ./src/components/tasks/index.js ***!
  \***************************************/
/*! exports provided: TaskComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _task_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task.css */ "./src/components/tasks/task.css");
/* harmony import */ var _task_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_task_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _task_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task.html */ "./src/components/tasks/task.html");
/* harmony import */ var _task_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_task_html__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task */ "./src/components/tasks/task.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TaskComponent", function() { return _task__WEBPACK_IMPORTED_MODULE_2__["TaskComponent"]; });





_task__WEBPACK_IMPORTED_MODULE_2__["TaskComponent"].html = _task_html__WEBPACK_IMPORTED_MODULE_1___default.a;



/***/ }),

/***/ "./src/components/tasks/task.css":
/*!***************************************!*\
  !*** ./src/components/tasks/task.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/tasks/task.html":
/*!****************************************!*\
  !*** ./src/components/tasks/task.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"task-window\">\r\n  <h2>You need to solve the task:</h2>\r\n  <div class=\"task\"></div>\r\n  <div class=\"submit-task\">\r\n    <button>Cast Spell</button>\r\n  </div>\r\n  <p class=\"note\"></p>\r\n</section>";

/***/ }),

/***/ "./src/components/tasks/task.js":
/*!**************************************!*\
  !*** ./src/components/tasks/task.js ***!
  \**************************************/
/*! exports provided: TaskComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskComponent", function() { return TaskComponent; });
/* harmony import */ var _classes_Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Task */ "./src/components/tasks/classes/Task.js");

let parentElem;

function render(parent) {
  parentElem = parent;
  parentElem.insertAdjacentHTML('afterBegin', this.html);
}

function remove() {
  if (parentElem) {
    parentElem.removeChild(parentElem.querySelector('.task-window'));
    parentElem = null;
  }
}

function createTask(taskWindow) {
  return _classes_Task__WEBPACK_IMPORTED_MODULE_0__["default"].create(taskWindow);
}

function renderMsg(taskWindow, taskAnswer) {
  const pNote = taskWindow.querySelector('.note');
  pNote.innerHTML = `Sorry, but your answer is wrong. The right answer is <span>${taskAnswer}</span>.`;
}

const TaskComponent = {
  createTask: createTask,
  renderMsg: renderMsg,
  render: render,
  remove: remove
}



/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/screens/battle/battle.css":
/*!***************************************!*\
  !*** ./src/screens/battle/battle.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/screens/battle/battle.html":
/*!****************************************!*\
  !*** ./src/screens/battle/battle.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<canvas id=\"myCanvas\"></canvas>";

/***/ }),

/***/ "./src/screens/battle/battle.js":
/*!**************************************!*\
  !*** ./src/screens/battle/battle.js ***!
  \**************************************/
/*! exports provided: battleScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "battleScreen", function() { return battleScreen; });
/* harmony import */ var _classes_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/User */ "./src/screens/battle/classes/User.js");
/* harmony import */ var _classes_Monster__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Monster */ "./src/screens/battle/classes/Monster.js");
/* harmony import */ var _classes_Spell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Spell */ "./src/screens/battle/classes/Spell.js");
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resources */ "./src/screens/battle/resources/index.js");
/* harmony import */ var _components_message__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../components/message */ "./src/components/message/index.js");
/* harmony import */ var _components_modal_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../components/modal-dialog */ "./src/components/modal-dialog/index.js");
/* harmony import */ var _components_tasks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../components/tasks */ "./src/components/tasks/index.js");
/* harmony import */ var _components_records__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../components/records */ "./src/components/records/index.js");
/* harmony import */ var _images_boy2_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./images/boy2.png */ "./src/screens/battle/images/boy2.png");
/* harmony import */ var _images_boy2_png__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_images_boy2_png__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _images_girl2_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./images/girl2.png */ "./src/screens/battle/images/girl2.png");
/* harmony import */ var _images_girl2_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_images_girl2_png__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _images_spell2_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./images/spell2.png */ "./src/screens/battle/images/spell2.png");
/* harmony import */ var _images_spell2_png__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_images_spell2_png__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _images_bigSpell2_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./images/bigSpell2.png */ "./src/screens/battle/images/bigSpell2.png");
/* harmony import */ var _images_bigSpell2_png__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_images_bigSpell2_png__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _images_cure22_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./images/cure22.png */ "./src/screens/battle/images/cure22.png");
/* harmony import */ var _images_cure22_png__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_images_cure22_png__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _images_monster_parts_head1_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./images/monster-parts/head1.png */ "./src/screens/battle/images/monster-parts/head1.png");
/* harmony import */ var _images_monster_parts_head1_png__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_images_monster_parts_head1_png__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _images_monster_parts_head2_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./images/monster-parts/head2.png */ "./src/screens/battle/images/monster-parts/head2.png");
/* harmony import */ var _images_monster_parts_head2_png__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_images_monster_parts_head2_png__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _images_monster_parts_head3_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./images/monster-parts/head3.png */ "./src/screens/battle/images/monster-parts/head3.png");
/* harmony import */ var _images_monster_parts_head3_png__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_images_monster_parts_head3_png__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _images_monster_parts_torso1_png__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./images/monster-parts/torso1.png */ "./src/screens/battle/images/monster-parts/torso1.png");
/* harmony import */ var _images_monster_parts_torso1_png__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_images_monster_parts_torso1_png__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _images_monster_parts_torso2_png__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./images/monster-parts/torso2.png */ "./src/screens/battle/images/monster-parts/torso2.png");
/* harmony import */ var _images_monster_parts_torso2_png__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_images_monster_parts_torso2_png__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _images_monster_parts_torso3_png__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./images/monster-parts/torso3.png */ "./src/screens/battle/images/monster-parts/torso3.png");
/* harmony import */ var _images_monster_parts_torso3_png__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_images_monster_parts_torso3_png__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _images_monster_parts_feet1_png__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./images/monster-parts/feet1.png */ "./src/screens/battle/images/monster-parts/feet1.png");
/* harmony import */ var _images_monster_parts_feet1_png__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_images_monster_parts_feet1_png__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _images_monster_parts_feet2_png__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./images/monster-parts/feet2.png */ "./src/screens/battle/images/monster-parts/feet2.png");
/* harmony import */ var _images_monster_parts_feet2_png__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_images_monster_parts_feet2_png__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _images_monster_parts_feet3_png__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./images/monster-parts/feet3.png */ "./src/screens/battle/images/monster-parts/feet3.png");
/* harmony import */ var _images_monster_parts_feet3_png__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_images_monster_parts_feet3_png__WEBPACK_IMPORTED_MODULE_21__);























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
  user = new _classes_User__WEBPACK_IMPORTED_MODULE_0__["default"](userInfo.name, userInfo.sex, canvas);
  monster = new _classes_Monster__WEBPACK_IMPORTED_MODULE_1__["default"](canvas);
  _components_message__WEBPACK_IMPORTED_MODULE_4__["MessageComponent"].render(mainHTMLElem, 'Wizard battle!');

  if(_resources__WEBPACK_IMPORTED_MODULE_3__["default"].get('images/boy2.png')) {
    init();
  } else {
    _resources__WEBPACK_IMPORTED_MODULE_3__["default"].load([
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
    _resources__WEBPACK_IMPORTED_MODULE_3__["default"].onReady(init);
  }  
}

function init() {
  startRound(false);
  main();
}

async function startRound(resetDataFLag) {
  await resolveAfter(2000);
  _components_message__WEBPACK_IMPORTED_MODULE_4__["MessageComponent"].remove();
  _components_modal_dialog__WEBPACK_IMPORTED_MODULE_5__["ModalDialogComponent"].render(mainHTMLElem);
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
  if(activeSpell instanceof _classes_Spell__WEBPACK_IMPORTED_MODULE_2__["default"]) {
    checkSpellDestination();
  }
  if(activeSpell === null) {
    activeSpell = 'not-ready';
    createSpell();
  }
}


function chooseSpell() {
  const spellsWindow = document.querySelector('.modal-dialog .spells');
  spellsWindow.addEventListener('click', _components_modal_dialog__WEBPACK_IMPORTED_MODULE_5__["ModalDialogComponent"].chooseSpell, false);
  spellsWindow.addEventListener('click', getSpellType, false);
}

function getSpellType(event) {
  if(event.target.tagName.toLowerCase() === 'img' ||
     event.target.tagName.toLowerCase() === 'figcaption') {
    const spellsWindow = event.target.closest('.modal-dialog .spells');
    const spellType = _components_modal_dialog__WEBPACK_IMPORTED_MODULE_5__["ModalDialogComponent"].getSpellType();
    spellsWindow.removeEventListener('click', _components_modal_dialog__WEBPACK_IMPORTED_MODULE_5__["ModalDialogComponent"].chooseSpell, false);
    spellsWindow.removeEventListener('click', getSpellType, false);
    _components_modal_dialog__WEBPACK_IMPORTED_MODULE_5__["ModalDialogComponent"].remove();

    checkSolutionOfTask()
      .then(() => {
        if (spellType === 'explosion') {
          _components_tasks__WEBPACK_IMPORTED_MODULE_6__["TaskComponent"].remove();
          return checkSolutionOfTask();
        }
      })
      .then(() => {
        _components_tasks__WEBPACK_IMPORTED_MODULE_6__["TaskComponent"].remove();
        activeSpell = user.createSpell(spellType);
      })
      .catch((taskAnswer) => {
        _components_tasks__WEBPACK_IMPORTED_MODULE_6__["TaskComponent"].renderMsg(document.querySelector('.task-window'), taskAnswer);
        passMoveToMonster();
      });
  }
}

function checkSolutionOfTask() {
  return new Promise(function(resolve, reject) {
    _components_tasks__WEBPACK_IMPORTED_MODULE_6__["TaskComponent"].render(mainHTMLElem);
    const taskWindow = document.querySelector('.task-window');
    const castSpellBtn = taskWindow.querySelector('.submit-task button');
    const task = _components_tasks__WEBPACK_IMPORTED_MODULE_6__["TaskComponent"].createTask(taskWindow);
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
  _components_tasks__WEBPACK_IMPORTED_MODULE_6__["TaskComponent"].remove();
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
    _components_modal_dialog__WEBPACK_IMPORTED_MODULE_5__["ModalDialogComponent"].render(mainHTMLElem);
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
    _components_message__WEBPACK_IMPORTED_MODULE_4__["MessageComponent"].render(mainHTMLElem, msg);
    
    if (monster.hp === 0) {
      startRound(true);
    } else {
      _components_records__WEBPACK_IMPORTED_MODULE_7__["records"].add(user.defeatedMonsters);
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
  monster = new _classes_Monster__WEBPACK_IMPORTED_MODULE_1__["default"](canvas);
}


async function endGame() {
  await resolveAfter(2000);
  _components_message__WEBPACK_IMPORTED_MODULE_4__["MessageComponent"].remove();
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
  if(activeSpell instanceof _classes_Spell__WEBPACK_IMPORTED_MODULE_2__["default"]) {
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



/***/ }),

/***/ "./src/screens/battle/classes/Character.js":
/*!*************************************************!*\
  !*** ./src/screens/battle/classes/Character.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Character; });
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../resources */ "./src/screens/battle/resources/index.js");


class Character {
  constructor(name, coef, hpLevel) {
    this.name = name;
    this.coef = coef;
    this.hpLevel = hpLevel;
  }

  render(ctx) {
    ctx.drawImage(_resources__WEBPACK_IMPORTED_MODULE_0__["default"].get(this.url),
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

/***/ }),

/***/ "./src/screens/battle/classes/Monster.js":
/*!***********************************************!*\
  !*** ./src/screens/battle/classes/Monster.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Monster; });
/* harmony import */ var _Character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Character */ "./src/screens/battle/classes/Character.js");
/* harmony import */ var _Spell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Spell */ "./src/screens/battle/classes/Spell.js");
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../resources */ "./src/screens/battle/resources/index.js");




class Monster extends _Character__WEBPACK_IMPORTED_MODULE_0__["default"] {
	constructor(canvas) {
    const coef = 3;
    const hpLevel = 100;
    const name = Monster.generateName();
    super(name, coef, hpLevel);
    this.generateBody(canvas);
  }

  createSpell() {
    const index = Math.ceil(Math.random() * 10) % _Spell__WEBPACK_IMPORTED_MODULE_1__["default"].types.length;
    const spellType = _Spell__WEBPACK_IMPORTED_MODULE_1__["default"].types[index];
    let spellPos;
    if (spellType === 'cure') {
      spellPos = [this.startPoint[0] - 10, this.startPoint[1] - 220];
    } else {
      spellPos = [this.startPoint[0], this.startPoint[1] - 35];
    }
    return new _Spell__WEBPACK_IMPORTED_MODULE_1__["default"](spellType, spellPos, 'monster');
  }

  render(ctx) {
    ctx.drawImage(_resources__WEBPACK_IMPORTED_MODULE_2__["default"].get(this.urls.torso),
                  this.pos.torso[0], this.pos.torso[1],
                  this.size.torso[0], this.size.torso[1]);
    ctx.drawImage(_resources__WEBPACK_IMPORTED_MODULE_2__["default"].get(this.urls.head),
                  this.pos.head[0], this.pos.head[1],
                  this.size.head[0], this.size.head[1]);
    ctx.drawImage(_resources__WEBPACK_IMPORTED_MODULE_2__["default"].get(this.urls.feet),
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

/***/ }),

/***/ "./src/screens/battle/classes/Spell.js":
/*!*********************************************!*\
  !*** ./src/screens/battle/classes/Spell.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Spell; });
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../resources */ "./src/screens/battle/resources/index.js");


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
      
    ctx.drawImage(_resources__WEBPACK_IMPORTED_MODULE_0__["default"].get(this.url), 
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

/***/ }),

/***/ "./src/screens/battle/classes/User.js":
/*!********************************************!*\
  !*** ./src/screens/battle/classes/User.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return User; });
/* harmony import */ var _Character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Character */ "./src/screens/battle/classes/Character.js");
/* harmony import */ var _Spell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Spell */ "./src/screens/battle/classes/Spell.js");



class User extends _Character__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
    return new _Spell__WEBPACK_IMPORTED_MODULE_1__["default"](spellType, pos, 'user');
  }
}

/***/ }),

/***/ "./src/screens/battle/images/bigSpell2.png":
/*!*************************************************!*\
  !*** ./src/screens/battle/images/bigSpell2.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/bigSpell2.png";

/***/ }),

/***/ "./src/screens/battle/images/boy2.png":
/*!********************************************!*\
  !*** ./src/screens/battle/images/boy2.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/boy2.png";

/***/ }),

/***/ "./src/screens/battle/images/cure22.png":
/*!**********************************************!*\
  !*** ./src/screens/battle/images/cure22.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/cure22.png";

/***/ }),

/***/ "./src/screens/battle/images/girl2.png":
/*!*********************************************!*\
  !*** ./src/screens/battle/images/girl2.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/girl2.png";

/***/ }),

/***/ "./src/screens/battle/images/monster-parts/feet1.png":
/*!***********************************************************!*\
  !*** ./src/screens/battle/images/monster-parts/feet1.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/feet1.png";

/***/ }),

/***/ "./src/screens/battle/images/monster-parts/feet2.png":
/*!***********************************************************!*\
  !*** ./src/screens/battle/images/monster-parts/feet2.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/feet2.png";

/***/ }),

/***/ "./src/screens/battle/images/monster-parts/feet3.png":
/*!***********************************************************!*\
  !*** ./src/screens/battle/images/monster-parts/feet3.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/feet3.png";

/***/ }),

/***/ "./src/screens/battle/images/monster-parts/head1.png":
/*!***********************************************************!*\
  !*** ./src/screens/battle/images/monster-parts/head1.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/head1.png";

/***/ }),

/***/ "./src/screens/battle/images/monster-parts/head2.png":
/*!***********************************************************!*\
  !*** ./src/screens/battle/images/monster-parts/head2.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/head2.png";

/***/ }),

/***/ "./src/screens/battle/images/monster-parts/head3.png":
/*!***********************************************************!*\
  !*** ./src/screens/battle/images/monster-parts/head3.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/head3.png";

/***/ }),

/***/ "./src/screens/battle/images/monster-parts/torso1.png":
/*!************************************************************!*\
  !*** ./src/screens/battle/images/monster-parts/torso1.png ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/torso1.png";

/***/ }),

/***/ "./src/screens/battle/images/monster-parts/torso2.png":
/*!************************************************************!*\
  !*** ./src/screens/battle/images/monster-parts/torso2.png ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/torso2.png";

/***/ }),

/***/ "./src/screens/battle/images/monster-parts/torso3.png":
/*!************************************************************!*\
  !*** ./src/screens/battle/images/monster-parts/torso3.png ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/torso3.png";

/***/ }),

/***/ "./src/screens/battle/images/spell2.png":
/*!**********************************************!*\
  !*** ./src/screens/battle/images/spell2.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/spell2.png";

/***/ }),

/***/ "./src/screens/battle/index.js":
/*!*************************************!*\
  !*** ./src/screens/battle/index.js ***!
  \*************************************/
/*! exports provided: battleScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _battle_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./battle.css */ "./src/screens/battle/battle.css");
/* harmony import */ var _battle_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_battle_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _battle_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./battle.html */ "./src/screens/battle/battle.html");
/* harmony import */ var _battle_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_battle_html__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _battle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./battle */ "./src/screens/battle/battle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "battleScreen", function() { return _battle__WEBPACK_IMPORTED_MODULE_2__["battleScreen"]; });





_battle__WEBPACK_IMPORTED_MODULE_2__["battleScreen"].html = _battle_html__WEBPACK_IMPORTED_MODULE_1___default.a;



/***/ }),

/***/ "./src/screens/battle/resources/index.js":
/*!***********************************************!*\
  !*** ./src/screens/battle/resources/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let resourceCache = {};
let loading = [];
let readyCallbacks = [];

function load(urlOrArr) {
  if(urlOrArr instanceof Array) {
    urlOrArr.forEach(function(url) {
      _load(url);
    });
  } else {
    _load(urlOrArr);
  }
}

function _load(url) {
  if(resourceCache[url]) {
    return resourceCache[url];
  } else {
    let img = new Image();
    img.onload = function() {
      resourceCache[url] = img;
                
      if(isReady()) {
        readyCallbacks.forEach(function(func) { func(); });
      }
    };
    resourceCache[url] = false;
    img.src = 'dist/' + url;
  }
}

function get(url) {
  return resourceCache[url];
}

function isReady() {
  let ready = true;
  for(let k in resourceCache) {
    if(resourceCache.hasOwnProperty(k) &&
     !resourceCache[k]) {
      ready = false;
    }
  }
  return ready;
}

function onReady(func) {
  readyCallbacks.push(func);
}

const resources = { 
  load: load,
  get: get,
  onReady: onReady,
  isReady: isReady
};

/* harmony default export */ __webpack_exports__["default"] = (resources);

/***/ }),

/***/ "./src/screens/landing-page/images/prtsc1.jpeg":
/*!*****************************************************!*\
  !*** ./src/screens/landing-page/images/prtsc1.jpeg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/prtsc1.jpeg";

/***/ }),

/***/ "./src/screens/landing-page/images/prtsc2.jpeg":
/*!*****************************************************!*\
  !*** ./src/screens/landing-page/images/prtsc2.jpeg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/prtsc2.jpeg";

/***/ }),

/***/ "./src/screens/landing-page/images/prtsc3.jpeg":
/*!*****************************************************!*\
  !*** ./src/screens/landing-page/images/prtsc3.jpeg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "dist/images/prtsc3.jpeg";

/***/ }),

/***/ "./src/screens/landing-page/index.js":
/*!*******************************************!*\
  !*** ./src/screens/landing-page/index.js ***!
  \*******************************************/
/*! exports provided: landingPageScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _landing_page_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./landing-page.css */ "./src/screens/landing-page/landing-page.css");
/* harmony import */ var _landing_page_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_landing_page_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _landing_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./landing-page.html */ "./src/screens/landing-page/landing-page.html");
/* harmony import */ var _landing_page_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_landing_page_html__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _landing_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./landing-page */ "./src/screens/landing-page/landing-page.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "landingPageScreen", function() { return _landing_page__WEBPACK_IMPORTED_MODULE_2__["landingPageScreen"]; });





_landing_page__WEBPACK_IMPORTED_MODULE_2__["landingPageScreen"].html = _landing_page_html__WEBPACK_IMPORTED_MODULE_1___default.a;



/***/ }),

/***/ "./src/screens/landing-page/landing-page.css":
/*!***************************************************!*\
  !*** ./src/screens/landing-page/landing-page.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/screens/landing-page/landing-page.html":
/*!****************************************************!*\
  !*** ./src/screens/landing-page/landing-page.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<section class=\"landing-page\">\r\n  <h1>Little Prodigy Game</h1>\r\n  <button>Let's play!</button>\r\n  <div class=\"printscreens\">\r\n    <img src=\"" + __webpack_require__(/*! ./images/prtsc1.jpeg */ "./src/screens/landing-page/images/prtsc1.jpeg") + "\">\r\n    <img src=\"" + __webpack_require__(/*! ./images/prtsc2.jpeg */ "./src/screens/landing-page/images/prtsc2.jpeg") + "\">\r\n    <img src=\"" + __webpack_require__(/*! ./images/prtsc3.jpeg */ "./src/screens/landing-page/images/prtsc3.jpeg") + "\">\r\n  </div>\r\n  <p>Developer Anastasiya Barysheva</p>\r\n</section>";

/***/ }),

/***/ "./src/screens/landing-page/landing-page.js":
/*!**************************************************!*\
  !*** ./src/screens/landing-page/landing-page.js ***!
  \**************************************************/
/*! exports provided: landingPageScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "landingPageScreen", function() { return landingPageScreen; });
let parentElem;

function render(parent) {
  parentElem = parent;
  parentElem.insertAdjacentHTML('afterBegin', this.html);
}

function remove() {
  if (parentElem) {
  	parentElem.removeChild(parentElem.querySelector('.landing-page'));
  	parentElem = null;
  }
}

const landingPageScreen = {
  remove: remove,
  render: render
}



/***/ }),

/***/ "./src/screens/login/index.js":
/*!************************************!*\
  !*** ./src/screens/login/index.js ***!
  \************************************/
/*! exports provided: loginScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.css */ "./src/screens/login/login.css");
/* harmony import */ var _login_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_login_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _login_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.html */ "./src/screens/login/login.html");
/* harmony import */ var _login_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_login_html__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login */ "./src/screens/login/login.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loginScreen", function() { return _login__WEBPACK_IMPORTED_MODULE_2__["loginScreen"]; });





_login__WEBPACK_IMPORTED_MODULE_2__["loginScreen"].html = _login_html__WEBPACK_IMPORTED_MODULE_1___default.a;



/***/ }),

/***/ "./src/screens/login/login.css":
/*!*************************************!*\
  !*** ./src/screens/login/login.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/screens/login/login.html":
/*!**************************************!*\
  !*** ./src/screens/login/login.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"login\">\r\n  <h2>Tell about yourself:</h2>\r\n  <div class=\"login-form\">\r\n    <p>Name: <input type=\"text\" name=\"name\" /></p><br/>\r\n    <div class=\"radio-btn\">\r\n      <p class=\"selected\"><span class=\"selected\"></span>Male</p>\r\n      <p><span></span>Female</p>\r\n    </div>\r\n    <button>I am ready!</button>\r\n  </div>\r\n</section>";

/***/ }),

/***/ "./src/screens/login/login.js":
/*!************************************!*\
  !*** ./src/screens/login/login.js ***!
  \************************************/
/*! exports provided: loginScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginScreen", function() { return loginScreen; });
/* harmony import */ var _components_records__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/records */ "./src/components/records/index.js");


let sex = 'male';
let parentElem;

function render(parent) {
  parentElem = parent;
  parentElem.insertAdjacentHTML('afterBegin', this.html);
}

function remove() {
  if (parentElem) {
    parentElem.removeChild(parentElem.querySelector('.login'));
    parentElem = null;
    sex = 'male';
  }
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

function login(event) {
  const loginFormElem = event.target.closest('.login-form');
  let name = loginFormElem.querySelector('input[name="name"]').value;
  name = name ? name : 'User';
  _components_records__WEBPACK_IMPORTED_MODULE_0__["records"].saveCurrentUser(name, sex);
}

const loginScreen = {
  chooseGender: chooseGender,
  login: login,
  render: render,
  remove: remove
};



/***/ }),

/***/ "./src/screens/score/index.js":
/*!************************************!*\
  !*** ./src/screens/score/index.js ***!
  \************************************/
/*! exports provided: scoreScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _score_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./score.css */ "./src/screens/score/score.css");
/* harmony import */ var _score_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_score_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _score_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./score.html */ "./src/screens/score/score.html");
/* harmony import */ var _score_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_score_html__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _score__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./score */ "./src/screens/score/score.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scoreScreen", function() { return _score__WEBPACK_IMPORTED_MODULE_2__["scoreScreen"]; });





_score__WEBPACK_IMPORTED_MODULE_2__["scoreScreen"].html = _score_html__WEBPACK_IMPORTED_MODULE_1___default.a;



/***/ }),

/***/ "./src/screens/score/score.css":
/*!*************************************!*\
  !*** ./src/screens/score/score.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/screens/score/score.html":
/*!**************************************!*\
  !*** ./src/screens/score/score.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"game-records\">\r\n  <h2>Best Players</h2>\r\n  <table>\r\n    <thead>\r\n      <tr>\r\n        <th>Player</th>\r\n        <th>Defeated Monsters</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody></tbody>\r\n  </table>\r\n  <button>New Game</button>\r\n</section>";

/***/ }),

/***/ "./src/screens/score/score.js":
/*!************************************!*\
  !*** ./src/screens/score/score.js ***!
  \************************************/
/*! exports provided: scoreScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scoreScreen", function() { return scoreScreen; });
/* harmony import */ var _components_records__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../components/records */ "./src/components/records/index.js");


let parentElem;

function render(parent) {
  parentElem = parent;
  parentElem.insertAdjacentHTML('afterBegin', this.html);
}

function remove() {
  if (parentElem) {
    parentElem.removeChild(parentElem.querySelector('.game-records'));
    parentElem = null;
  }
}

function renderScore(recordsWindow) {
  _components_records__WEBPACK_IMPORTED_MODULE_0__["records"].render(recordsWindow.querySelector('table'));
}

const scoreScreen = {
  render: render,
  remove: remove,
  renderScore: renderScore
}



/***/ })

/******/ });
//# sourceMappingURL=app.js.map
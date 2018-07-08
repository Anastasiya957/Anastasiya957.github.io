export default class Task {
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
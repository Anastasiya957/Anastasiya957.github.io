import Task from './classes/Task';
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
  return Task.create(taskWindow);
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

export { TaskComponent };
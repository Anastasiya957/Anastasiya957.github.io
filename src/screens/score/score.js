import { records } from './../../components/records';

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
  records.render(recordsWindow.querySelector('table'));
}

const scoreScreen = {
  render: render,
  remove: remove,
  renderScore: renderScore
}

export { scoreScreen };
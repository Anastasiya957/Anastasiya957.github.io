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

export { MessageComponent };
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

export { landingPageScreen };
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

export { ModalDialogComponent };
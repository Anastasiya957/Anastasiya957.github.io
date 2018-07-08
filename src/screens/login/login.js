import { records } from '../../components/records';

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
  records.saveCurrentUser(name, sex);
}

const loginScreen = {
  chooseGender: chooseGender,
  login: login,
  render: render,
  remove: remove
};

export { loginScreen };
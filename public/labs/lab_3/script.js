/* Put your javascript in here */

let i = 0;
const width = 130;
const count = 3;
const list = document.querySelector('ul');
const num = 7;

function next() {
  i -= width * count;
  i = Math.max(i, -width * (num - count));
  list.style.marginLeft = i + 'px';
}

function back() {
  i += width * count;
  i = Math.min(i, 0)
  list.style.marginLeft = i + 'px';
}

function buttonClick(x) {
  if (x === 1) {
    next();
  } else {
    back();
  }
}
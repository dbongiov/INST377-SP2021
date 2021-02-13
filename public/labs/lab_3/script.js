/* Put your javascript in here */

let i = 0;
const width = 130;
const count = 3;
const list = document.querySelector('ul');
const num = 7;

function next() {
  // shift right
  i -= width * count;
  // can only shift the ribbbon for (total ribbon length - visible count) images
  i = Math.max(i, -width * (num - count));
  list.style.marginLeft = i + 'px';
}

function back() {
  // shift left
  i += width * count;
  // can't move to the left too much, end of images
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
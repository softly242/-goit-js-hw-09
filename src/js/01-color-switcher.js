const btnStart = document.querySelector('[data-start]');
const btnEnd = document.querySelector('[data-stop]');
btnEnd.disabled = true;
const body = document.body;

let timerId = null;

btnStart.addEventListener('click', onStart);
btnEnd.addEventListener('click', onStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeBodyColor() {
  const color = getRandomHexColor();
  body.style.backgroundColor = color;
}

function onStart() {
  btnStart.disabled = true;
  btnEnd.disabled = false;
  changeBodyColor();
  timerId = setInterval(() => {
    changeBodyColor();
  }, 1000);
}

function onStop() {
  btnStart.disabled = false;
  btnEnd.disabled = true;
  clearInterval(timerId);
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let interval = undefined;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

startBtn.addEventListener("click", () => {
    interval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    stopBtn.removeAttribute('disabled');
    startBtn.setAttribute('disabled', true);
});

stopBtn.addEventListener('click', () => {
    clearInterval(interval);
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', true);
});

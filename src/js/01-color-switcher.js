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
    stopButton.removeAttribute('disabled');
startButton.setAttribute('disabled', true);
});

stopBtn.addEventListener('click', () => {
    clearInterval(interval);
    startButton.removeAttribute('disabled');
stopButton.setAttribute('disabled', true);
});

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delay = document.querySelector("[name=delay]")
const step = document.querySelector("[name=step]")
const amount = document.querySelector("[name=amount]")

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
        }
    }, delay);
  });
}

const onSubmit = (event) => {
  event.preventDefault();

  let delayValue = Number(delay.value);
  const stepValue= Number(step.value);
  const amountValue = Number(amount.value);

  for (let i = 1; i <= amountValue; i ++) {
    createPromise(i, delayValue).then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delayValue += stepValue;
  } 
};

form.addEventListener("submit", onSubmit);
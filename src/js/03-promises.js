import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');
const btn = document.querySelector('[submit]');

form.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const data = { position, delay };

    setTimeout(() => {
      if (shouldResolve) {
        resolve(data);
      }
      reject(data);
    }, delay);
  });
}

function onSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget;
  let promiseDelay = Number(delay.value);
  for (let i = 1; i <= amount.value; i += 1) {
    if (i !== 1) {
      promiseDelay += Number(step.value);
    }
    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

/* createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  }); */

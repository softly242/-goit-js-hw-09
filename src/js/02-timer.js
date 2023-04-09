import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
btn.disabled = true;

let selectedTime = null;

function onClose(selectedDate) {
  const currentTime = new Date();
  if (selectedDate[0] < currentTime) {
    btn.disabled = true;
    setTimeout(() => Notify.failure('Please choose a date in the future'), 0);
  } else {
    btn.disabled = false;
    selectedTime = selectedDate[0];
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

flatpickr('#datetime-picker', options);

btn.addEventListener('click', onClick);

function onClick() {
  timer.start(selectedTime);
}

function updateDisplayTime(timeComponents) {
  for (const time in timeComponents) {
    const current = document.querySelector(`[data-${time}]`);
    current.textContent = timeComponents[time];
  }
}

const timer = {
  intervalId: null,
  isActive: false,

  start(time) {
    if (this.isActive) {
      return;
    }
    const startTime = time;
    this.isActive = true;

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const timeComponents = convertMs(deltaTime);
      updateDisplayTime(timeComponents);
    }, 1000);
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

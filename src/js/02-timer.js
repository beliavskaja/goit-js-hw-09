import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DELTA_DEAD_LINE = 1000;

const refs = {
  selectedDates: null,
  intervalId: null,
  datePicker: document.querySelector('input[type="text"]'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < Date.now()) {
            Notify.failure('Please choose a date in the future');
          } else {
            refs.startBtn.disabled = false;
            refs.selectedDate = selectedDates[0].getTime();
        }
    },
};

const calendar = flatpickr(refs.datePicker, options);

const onStartClick = () => {
    refs.startBtn.disabled = true;
    refs.datePicker.disabled = true;
    getTimerTime();
    refs.intervalId = setInterval(getTimerTime, 1000);
}

refs.startBtn.addEventListener('click', onStartClick);

const getTimerTime = () => {
    const currentTime = Date.now();
    const startTime = refs.selectedDate;
    const deltaTime = startTime - currentTime;
    const defaultTime = convertMs(deltaTime);

    if (deltaTime < DELTA_DEAD_LINE) {
        clearInterval(refs.intervalId);
    }
    updateTimer(defaultTime);
}

const updateTimer = ({ days, hours, minutes, seconds }) => {
    console.log(days, hours, minutes, seconds);
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
}

const addLeadingZero = (value) => {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEL = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const resetBtn = document.querySelector('.countdown-button');
const timeElements = document.querySelectorAll('span');

const CompleteEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');



let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEL.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // Hide Input
        inputContainer.hidden = true;

        // If the countdown has ended, show complete
       if (distance <= 0) {
    countdownEl.hidden = true;
    clearInterval(countdownActive);
    completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
    CompleteEl.hidden = false;
} else {
    // Else, show the countdown in progress
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;
    CompleteEl.hidden = true;
    countdownEl.hidden = false;
}
    }, second);
}

// Take Values from Form Input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // Check for a valid date
    if (countdownDate === '') {
        alert('Please select a date for the countdown.');
    } else {
        // Get the number version of the current Date, updateDOM
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Reset All Values
function reset() {
    // Reset form and clear countdown title
    countdownForm.reset();
    countdownTitle = '';
    localStorage.removeItem('countdown');

    // Hide countdown, Show Input
    countdownEl.hidden = true;
    CompleteEl.hidden = true;
    inputContainer.hidden = false;

    // Stop the Countdown
    clearInterval(countdownActive);


        // Reset the countdownActive variable
        countdownActive = null;

}

function restorePreviousCountdown() {
    // Get countdown from localStorage if available
    if ( localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}


// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
resetBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On load, check localstorage
restorePreviousCountdown();


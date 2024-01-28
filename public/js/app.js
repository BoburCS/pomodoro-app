const qs = tag => document.querySelector(tag);
const qsAll = tag => document.querySelectorAll(tag);
const getID = tag => document.getElementById(tag);

let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;

// TimerCountDown Function
function timerCountDown () 
{
    if (seconds === 0) 
    {
        seconds = 60;
        minutes--;
        minDisplay.textContent = minutes;
    }
    seconds--;
    secDisplay.textContent = seconds;
}

// Toggle Timer Function
function toggleTimer ()
{
    if (isRunning)
    {
        clearInterval(timer);
        isRunning = false;
        btnToggle.textContent = "Start";
    }
    else 
    {
        timer = setInterval(timerCountDown, 1000);
        isRunning = true;
        btnToggle.textContent = "Stop";
    }
}

window.addEventListener("DOMContentLoaded", function() 
{
    const minDisplay = getID("minDisplay");
    const secDisplay = getID("secDisplay");
    const btnToggle = getID("btnToggle");

    btnToggle.addEventListener("click", toggleTimer);
});
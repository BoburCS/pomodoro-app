"use strict";

const qs = tag => document.querySelector(tag);
const qsAll = tag => document.querySelectorAll(tag);
const getID = tag => document.getElementById(tag);

let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;

let shortBreakValue = 5;
let pomodoroValue = 25;
let longBreakValue = 15;

let audio = new Audio("../../src/assets/audio/audio-mouse-click.mp3");

// TimerCountDown Function
function timerCountDown () 
{
    if (minutes === 0 && seconds === 0)
    {
        clearInterval(timer);
        alert("The Time is UP!");
        return;
    }
    if (seconds === 0) 
    {
        seconds = 60;
        minutes--;
        minDisplay.textContent = String(minutes).padStart(2, "0");
    }
    seconds--;
    secDisplay.textContent = String(seconds).padStart(2, "0");
}

// Toggle Timer Function
function toggleTimer ()
{
    audio.play();
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

// Type Time Function
function setTime (mins, typeofbreak)
{
    audio.play();
    minutes = mins;
    seconds = 0;
    minDisplay.textContent = String(minutes).padStart(2, "0");
    secDisplay.textContent = String(seconds).padStart(2, "0");
    typeofbreakDisplay.textContent = typeofbreak;
}

// Setting timers according to type of timer or break
function setShortBreakTime() 
{
    setTime(shortBreakValue, "Short Break");
}

function setPomodoroTime() 
{
    setTime(pomodoroValue, "Pomodoro");
}

function setLongBreakTime() 
{
    setTime(longBreakValue, "Long Break");
}

window.addEventListener("DOMContentLoaded", function() 
{
    // CountDown Elements and Events
    const minDisplay = getID("minDisplay");
    const secDisplay = getID("secDisplay");
    const typeofbreakDisplay = getID("typeofbreakDisplay");

    // Start or Stop CountDown
    const btnToggle = getID("btnToggle");
    btnToggle.addEventListener("click", toggleTimer);

    // Type of Timer
    const btnShortBreak = getID("btnShortBreak");
    const btnPomodoro = getID("btnPomodoro");
    const btnLongBreak = getID("btnLongBreak");

    btnShortBreak.addEventListener("click", setShortBreakTime); 
    btnPomodoro.addEventListener("click", setPomodoroTime); 
    btnLongBreak.addEventListener("click", setLongBreakTime); 

    // CountDown Elements and Events according to Settings 
    const inputShortBreak = getID("inputShortBreak");
    const inputPomodoro = getID("inputPomodoro");
    const inputLongBreak = getID("inputLongBreak");
    const settingContainer = qs(".setting-container");
    const btnSetting = qs(".navbar button");
    const btnClose = getID("btnClose");
    const btnSave = getID("btnSave");

    btnSetting.addEventListener("click", () => settingContainer.classList.add("visible"));
    btnClose.addEventListener("click", () => settingContainer.classList.remove("visible"));

    btnSave.addEventListener("click", () =>
    {
        shortBreakValue = Number(inputShortBreak.value) || shortBreakValue;
        pomodoroValue = Number(inputPomodoro.value) || pomodoroValue;
        longBreakValue = Number(inputLongBreak.value) || longBreakValue;

        btnShortBreak.addEventListener("click", setShortBreakTime);
        btnPomodoro.addEventListener("click", setPomodoroTime);
        btnLongBreak.addEventListener("click", setLongBreakTime);
    });
});
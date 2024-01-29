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

window.addEventListener("DOMContentLoaded", function() 
{
    const minDisplay = getID("minDisplay");
    const secDisplay = getID("secDisplay");
    const typeofbreakDisplay = getID("typeofbreakDisplay");
    const btnToggle = getID("btnToggle");

    // Buttons for Changing type of timer
    const btnShortBreak = getID("btnShortBreak");
    const btnPomodoro = getID("btnPomodoro");
    const btnLongBreak = getID("btnLongBreak");

    btnToggle.addEventListener("click", toggleTimer);
    btnShortBreak.addEventListener("click", () => setTime(shortBreakValue, "Short Break")); 
    btnPomodoro.addEventListener("click", () => setTime(pomodoroValue, "Pomodoro")); 
    btnLongBreak.addEventListener("click", () => setTime(longBreakValue, "Long Break")); 

    // Settings Elements
    const inputShortBreak = getID("inputShortBreak");
    const inputPomodoro = getID("inputPomodoro");
    const inputLongBreak = getID("inputLongBreak");
    const btnSetting = qs(".navbar button");
    const settingContainer = qs(".setting-container");
    const btnClose = getID("btnClose");
    const btnSave = getID("btnSave");

    btnSetting.addEventListener("click", () => settingContainer.classList.add("visible"));
    btnClose.addEventListener("click", () => settingContainer.classList.remove("visible"));

    btnSave.addEventListener("click", () =>
    {
        shortBreakValue = Number(inputShortBreak.value) || shortBreakValue;
        pomodoroValue = Number(inputPomodoro.value) || pomodoroValue;
        longBreakValue = Number(inputLongBreak.value) || longBreakValue;

        btnShortBreak.removeEventListener("click");
        btnShortBreak.addEventListener("click", () => setTime(shortBreakValue, "Short Break")); 

        btnPomodoro.removeEventListener("click");
        btnPomodoro.addEventListener("click", () => setTime(pomodoroValue, "Pomodoro")); 

        btnLongBreak.removeEventListener("click");
        btnLongBreak.addEventListener("click", () => setTime(longBreakValue, "Long Break"));
    });

});
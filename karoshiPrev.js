let timeout = 0; // variable to set/clear intervals
let timeSecs = 1500; // seconds left on the clock
let sessionLength = 25;
let breakLength = 5;
let isSession = true;
let isRunning = false;

const timerL = document.querySelector("#timer-label");
let breakIncB=document.getElementById('break-increment');
let breakDecB=document.getElementById('break-decrement');
let sessionIncB=document.getElementById('session-increment');
let sessionDecB=document.getElementById('session-decrement');

const showTime = document.querySelector("#time-left");
const startBtn = document.querySelector("#start_stop");
const resetBtn = document.querySelector("#reset");
const sessionL = document.querySelector("#session-length");
const breakL = document.querySelector("#break-length");

const alarm = document.createElement('audio'); // A bell sound will play when the timer reaches 0
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");


/* EVENT LISTENERS FOR START AND RESET BUTTONS */
startBtn.addEventListener('click', () => {
  clearInterval(timeout);
  isRunning = !isRunning;
  if (isRunning) {
  timeout = setInterval(timer, 1000);
     /*breakIncB.disabled=true;
     breakDecB.disabled=true;
     sessionIncB.disabled=true;
     sessionDecB.disabled=true;*/
  }
  if (!isRunning){
     breakIncB.disabled=false;
     breakDecB.disabled=false;
     sessionIncB.disabled=false;
     sessionDecB.disabled=false;
  }
})

resetBtn.addEventListener('click', () => {
  clearInterval(timeout);
  timeSecs = 1500;
  timeout = 0;
  isRunning = false;
  isSession = true;
  breakLength=5;
  sessionLength=25;
  breakL.innerText=5;
  sessionL.innerText=25;
  showTime.innerText=time_formatter(timeSecs);
  timerL.innerText="Session";
     breakIncB.disabled=false;
     breakDecB.disabled=false;
     sessionIncB.disabled=false;
     sessionDecB.disabled=false;
  
})

/* TIMER - HANDLES COUNTDOWN */
function timer() {
  timeSecs --;
  if (timeSecs < 0) {
    clearInterval(timeout);
    /*alarm.currentTime = 0;
    alarm.play();*/
    timeSecs = (isSession ? (+breakL.innerText)*60 : (+sessionL.innerText)*60) ;
    isSession = !isSession;
    timeout = setInterval(timer, 1000);
  }
}
/*if(!isRunning){
    breakIncB.disabled=false;
     breakDecB.disabled=false;
     sessionIncB.disabled=falfalsese;
     sessionDecB.disabled=false;}*/
/* UPDATE WORK AND BREAK TIMES */
/* increment = 1;

let incrementFunctions =
    {"#session-increment": function () { sessionLength = Math.min(sessionLength + increment, 60);timeSecs=timeSecs+60;},
     "#session-decrement": function () { sessionLength = Math.max(sessionLength - increment, 1);timeSecs=timeSecs-60;},
     "#break-increment": function () { breakLength = Math.min(breakLength + increment, 60)},
     "#break-decrement": function () { breakLength = Math.max(breakLength - increment, 1)}};

for (var key in incrementFunctions) {
    if (incrementFunctions.hasOwnProperty(key)) {
      document.querySelector(key).onclick = incrementFunctions[key];
    }
}*/
function time_formatter()  {
  let mins = Math.floor(timeSecs/60);
  let secs = timeSecs%60;
  let f_mins=mins< 10 ? "0"+mins : mins;
  let f_secs=secs < 10 ? "0"+secs : secs;
  /*if(timeSecs<0){
    return "00:00";
  }*/
  return `${f_mins}:${f_secs}`;
}


function breakInc() {
  if(+breakL.innerText<60){
    breakL.innerText=+breakL.innerText+1;
     }
  }

function breakDec() {
  if(+breakL.innerText>1){
    breakL.innerText=+breakL.innerText-1;
    }
  }
function sessionInc() {
  if(+sessionL.innerText<60){
    sessionL.innerText=+sessionL.innerText+1
      ;
   timeSecs=timeSecs+60;
   showTime.innerText=time_formatter(timeSecs);
  }
  }

function sessionDec() {
  
  if(+sessionL.innerText>1){
    sessionL.innerText=+sessionL.innerText-1;
    timeSecs=timeSecs-60;
    showTime.innerText=time_formatter(timeSecs);
    }
}
/* UPDATE HTML CONTENT */
function countdownDisplay() {
  let minutes = Math.floor(timeSecs / 60);
  let remainderSeconds = timeSecs % 60;
  showTime.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

function buttonDisplay() {
  if (!isRunning && timeout === 0) {
    startBtn.textContent = "START";
  } else if (!isRunning && timeout !== 0) {
    startBtn.textContent = "Continue"; 
  } else {
    startBtn.textContent = "Pause";
  }
}

function updateHTML() {
  countdownDisplay();
  buttonDisplay();
  isSession ? timerL.textContent = "Session" : timerL.textContent = "Break";
 /* sessionL.textContent = sessionLength;
  breakL.textContent = breakLength;  */
}

window.setInterval(updateHTML, 100);
document.onclick=updateHTML;

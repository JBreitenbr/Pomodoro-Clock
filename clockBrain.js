let breakLength=5;
let breakL=document.getElementById('break-length');
let sessionLength=25;
let sessionL=document.getElementById('session-length');
let timerL=document.getElementById('timer-label');
let showTime=document.getElementById('time-left');
let isRunning=true;
let timeSecs=1500;
let isSession=true;
let breakIncB=document.getElementById('break-increment');
let breakDecB=document.getElementById('break-decrement');
let sessionIncB=document.getElementById('session-increment');
let sessionDecB=document.getElementById('session-decrement');

function time_formatter()  {
  let mins = Math.floor(timeSecs/60);
  let secs = timeSecs%60;
  let f_mins=mins< 10 ? "0"+mins : mins;
  let f_secs=secs < 10 ? "0"+secs : secs;
  if(timeSecs<0){
    return "00:00";
  }
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

let audio;
function switchSession() {
  if(isSession) {
    isSession=false;
    timeSecs=+(breakL.innerText)*60;
    timerL.innerText="Break";
}
  else{
    isSession=true;
    timeSecs=+(sessionL.innerText)*60;
    timerL.innerText="Session";
}
  }

let timeout;

function countDown() {
  
  if(timeSecs<0){
    
    audio = document.getElementById('beep');
    audio.play();
    audio.currentTime = 0;
    
    switchSession();
  }
  
  showTime.innerText=time_formatter(timeSecs);
  
timeout=setTimeout(countDown,1000);timeSecs=timeSecs-1;
  
}

function startStop() {
   
  
   if(isRunning){
     breakIncB.disabled=true;
     breakDecB.disabled=true;
     sessionIncB.disabled=true;
     sessionDecB.disabled=true;
     countDown();
     
     isRunning=false;
   }
   else {
     clearTimeout(timeout);
     breakIncB.disabled=false;
     breakDecB.disabled=false;
     sessionIncB.disabled=false;
     sessionDecB.disabled=false;
 isRunning=true;
    timeSecs=timeSecs+1;
    
     showTime.innerText=time_formatter(timeSecs);
   }
}

function resetTimer() {
  clearTimeout(timeout);
  timeSecs=1500;
  breakLength=5;
  breakL.innerText=5;
  sessionLength=25;
  sessionL.innerText=25;
  audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  isSession=true;
  isRunning=true;
  
showTime.innerText=time_formatter(timeSecs);
  timerL.innerText="Session";
  
     breakIncB.disabled=false;
     breakDecB.disabled=false;
     sessionIncB.disabled=false;
     sessionDecB.disabled=false;
}

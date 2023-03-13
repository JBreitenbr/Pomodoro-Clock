let breakLength=5;
let breakL=document.getElementById('break-length');
let sessionLength=25;
let sessionL=document.getElementById('session-length');
let timerL=document.getElementById('timer-label');
let showTime=document.getElementById('time-left');
let isRunning=false;
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
/*
function updateTimer(val) {
  timeSecs=timeSecs+val;
}*/

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


let timeout = setInterval(()=>{
   if(isRunning)
   {
     timeSecs=timeSecs-1;
     
     if(timeSecs<0 && isSession){
       /* setTimeout(()=>{console.log("Hello")},1000);*/
       timeSecs=breakLength*60;
       isSession=false;
      /* let audio=document.getElementById('beep');
       audio.play();
       const audio = document.getElementById('beep');
      audio.currentTime = 0;
      audio.play();*/
       timerL.innerText="Break!!!";
      }
     if(timeSecs<0 && !isSession){
      /* setTimeout(()=>{console.log("Oha")},1000);*/
       timeSecs=sessionLength*60;
       isSession=true;
       timerL.innerText="Session";
     }
     //console.log(timeSecs);
     
     showTime.innerText=time_formatter(timeSecs)
   }
},1000);

const startStop = () => {
 /* breakIncB.disabled=isRunning;
     breakDecB.disabled=isRunning;
     sessionIncB.disabled=isRunning;
     sessionDecB.disabled=isRunning;*/
  if(isRunning){
     //timeout;
     breakIncB.disabled=false;
     breakDecB.disabled=false;
     sessionIncB.disabled=false;
     sessionDecB.disabled=false;
    isRunning=false;
    if(timeSecs<0){
      clearInterval(timeout);
    }
    }
  else{
    breakIncB.disabled=true;
     breakDecB.disabled=true;
     sessionIncB.disabled=true;
     sessionDecB.disabled=true;
    //clearInterval(timeout);
    isRunning=true;
    if(timeSecs<0){
      clearInterval(timeout);
    }
  }
  
}


const resetTimer = () => {
  timeSecs=1500;
  breakLength=5;
  sessionLength=25;
  isSession=true;
  isRunning=false;
  //clearInterval(timeout);
  /*let beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;*/
  showTime.innerText=time_formatter(timeSecs);
  timerL.innerText="Session";
  
breakIncB.disabled=false;
     breakDecB.disabled=false;
     sessionIncB.disabled=false;
     sessionDecB.disabled=false;
}

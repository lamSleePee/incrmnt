//variable declaration for timer

const timerValue = document.getElementById('timer');

const timerPlayBtn = document.getElementById('play-timer');
const nextStageBtn = document.getElementById('next-stage');
const resetTimerBtn = document.getElementById('reset-timer');

const playPauseIcon = document.getElementById('playpauseIcon');

const timerBar = document.getElementById('timer-percent-bar');

timerBar.style.width ='100%'


//minutes
let minutes = 0;
let seconds = 0;

let leadMinutes;
let leadSeconds;

//for pomodoro

let work = 25;
let shortBreak = 5;
let longBreak = 15;

//pomodoro stage
let workPeriod = 1;

//timer function
let timerStatus = true; //to see if timer is on or off
let timerInterval;
//to check if a pomodoro session is live and to not reset timer evverytime 
let pomodoroStatus = false;

//for percentage calc

let minutesToSecond;
let secondDivider;



function timer(){
 
    if(minutes == 0 && seconds == 0){
        window.clearInterval(timerInterval)
        timerValue.innerText = '00:00'
        workPeriod++;
        pomodoro();
        pomodoroStatus = false;
        timerStatus = true;

        timerPlayBtn.classList.add('playBtn');
        timerPlayBtn.classList.remove('pauseBtn');
        playPauseIcon.classList.add('fa-play');
        playPauseIcon.classList.remove('fa-pause');
        timerPlayBtn.firstChild.innerText = 'START';
        

    }

    else if(seconds === 0){
        if(minutes > 0){
            minutes = minutes - 1;

            seconds = 59;
        };
    }else{
        minutesToSecond--;
        seconds--;
    };

    if(minutes<10){
        leadMinutes = '0'+minutes.toString()
    }
    else{leadMinutes=minutes}

    if (seconds<10){
        leadSeconds = '0' + seconds.toString()
    }else{leadSeconds=seconds}
    
   
   

    timerBar.style.width = ((minutesToSecond/secondDivider)*100).toString() + '%'
    
    timerValue.innerText = leadMinutes + ':' + leadSeconds;
    
    
};



//timer button play pause function
timerPlayBtn.addEventListener('click',function(){
    timerPlayBtn.classList.toggle('playBtn');
    timerPlayBtn.classList.toggle('pauseBtn');
    playPauseIcon.classList.toggle('fa-play');
    playPauseIcon.classList.toggle('fa-pause');


    console.log(timerPlayBtn.firstChild.innerText);

    //to toggle switvh when pressed form Start to pause and pause to start
    if(timerPlayBtn.firstChild.innerText == 'START'){
        console.log('hello')
        timerPlayBtn.firstChild.innerText = 'PAUSE';
    }
    else{
        timerPlayBtn.firstChild.innerText = 'START';
    };

    //if no session is live it calls pomodoro function and sets it Status to true which helps us pause the timer without calling the pomodoro function which changes it status when called
    if (pomodoroStatus == false){
        pomodoro();
        pomodoroStatus = true;
    }
    else{
//if pomodoro session is set to true and we press the start pause button it will only clear the interval and not call the pomodoro function
    }


    //to turn on timer if its paused or to turn it off if started
    if(timerStatus == true){
        timerInterval = window.setInterval(timer, 10)
        timerStatus = false
    }else if(timerStatus == false){
        window.clearInterval(timerInterval)
        timerStatus = true;
    };    
})




//pomodoro function 


function pomodoro(){
    console.log('Current Stage =' ,workPeriod);
    if (workPeriod === 1){
        minutes = work;
        timerValue.innerText = '25:00'
        minutesToSecond = work * 60;
        secondDivider = work * 60;

        timerBar.style.width = '100%';
    };

    if(workPeriod === 2){
        minutes = shortBreak;  
        timerValue.innerText = '05:00'
        minutesToSecond = shortBreak * 60;
        secondDivider = shortBreak * 60;

        timerBar.style.width = '100%';
    };

    if(workPeriod === 3){
        minutes = work;  
        timerValue.innerText = '25:00'
        minutesToSecond = work * 60;
        secondDivider = work * 60;

        timerBar.style.width = '100%';
    };

    if(workPeriod === 4){
        minutes = shortBreak; 
        timerValue.innerText = '05:00' 
        minutesToSecond = shortBreak * 60;
        secondDivider = shortBreak * 60;

        timerBar.style.width = '100%';
    };

    if(workPeriod === 5){
        minutes = work;  
        timerValue.innerText = '25:00'
        minutesToSecond = work * 60;
        secondDivider = work * 60;

        timerBar.style.width = '100%';
    };

    if(workPeriod === 6){
        minutes = shortBreak;  
        timerValue.innerText = '05:00'
        minutesToSecond = shortBreak * 60;
        secondDivider = shortBreak * 60;

        timerBar.style.width = '100%';
    };

    if(workPeriod === 7){
        minutes = work;  
        timerValue.innerText = '25:00'
        minutesToSecond = work * 60;
        secondDivider = work * 60;

        timerBar.style.width = '100%';

    };

    if(workPeriod === 8){
        minutes = longBreak;
        timerValue.innerText = '15:00'
        minutesToSecond = longBreak * 60;
        secondDivider = longBreak * 60;

        timerBar.style.width = '100%';
        workPeriod = 0;    
    }


}
//stage forwarding
nextStageBtn.addEventListener('click',function(){
    if(workPeriod === 8){
        workPeriod = 1;
    }
    else{
        workPeriod++;
    }
    pomodoro();


    clearInterval(timerInterval);
    timerPlayBtn.classList.add('playBtn');
    timerPlayBtn.classList.remove('pauseBtn');
    playPauseIcon.classList.add('fa-play');
    playPauseIcon.classList.remove('fa-pause');
    timerPlayBtn.firstChild.innerText = 'START';
    timerStatus = true;
});


//reset timer to stage 1
resetTimerBtn.addEventListener('click',function(){
    workPeriod = 1;
    pomodoro();
});


//Task AREA
//------------------------//---------------------//------------------------//


const userInputTask = document.getElementById('user-input-task');
const addTaskBtn = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list-container');

const noTask = document.getElementById('no-task-display')

let taskCount = 0;




addTaskBtn.addEventListener('click',function(){
    let task = document.createElement('div');
    task.classList.add('task');

    let li = document.createElement('li');
    li.innerText = `${userInputTask.value}`;
    task.appendChild(li);

    let checkBtn = document.createElement("button");
    checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkBtn.classList.add('checkbtn');
    task.appendChild(checkBtn);

    let DelBtn = document.createElement("button");
    DelBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    DelBtn.classList.add('delbtn');
    task.appendChild(DelBtn);


    if(userInputTask.value === ""){
        //alert("Input a task!");
    } else{
        taskList.appendChild(task);
        taskCount++;
        if(taskCount > 0){
            noTask.style.display = 'none';
        };
        

        console.log(taskCount)
       
    }

    userInputTask.value = ""; //reset the value

    checkBtn.addEventListener('click',function(){
        checkBtn.parentElement.style.textDecoration = "line-through";


    });

    DelBtn.addEventListener('click', function(e){
        let target = e.target;
        taskCount--;
        if(taskCount === 0){
            noTask.style.display = 'flex';
        };
        target.parentElement.parentElement.remove()
        console.log(taskCount)
    });
    
});












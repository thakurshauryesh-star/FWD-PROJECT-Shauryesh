function showSection(e,id){
document.querySelectorAll(".section").forEach(s=>s.style.display="none");
document.getElementById(id).style.display="block";
document.querySelectorAll("nav li").forEach(li=>li.classList.remove("active"));
e.target.classList.add("active");
}

window.onload=()=>{
showSection({target:document.querySelector("nav li")},"quotes");
newQuote();
loadFav();
loadTasks();
};

let quotes=[
{q:"He who has a why to live can bear almost any how.",a:"Nietzsche"},
{q:"The unexamined life is not worth living.",a:"Socrates"},
{q:"Happiness depends upon ourselves.",a:"Aristotle"},
{q:"What we think, we become.",a:"Buddha"},
{q:"Discipline is destiny.",a:"Marcus Aurelius"}

];

let currentQuote={};

function newQuote(){
currentQuote=quotes[Math.floor(Math.random()*quotes.length)];
quote.innerText=currentQuote.q;
author.innerText="- "+currentQuote.a;
}

function addFav(){
let favs=JSON.parse(localStorage.getItem("favs"))||[];
favs.push(currentQuote);
localStorage.setItem("favs",JSON.stringify(favs));
loadFav();
}

function loadFav(){
let favs=JSON.parse(localStorage.getItem("favs"))||[];
favList.innerHTML="";
favs.forEach(f=>{favList.innerHTML+=`<p>❤️ ${f.q}</p>`;});
}


function press(v){calcInput.value+=v;}
function clearCalc(){calcInput.value="";}
function calculate(){
try{calcInput.value=eval(calcInput.value);}catch{calcInput.value="Error";}
}


function saveNote(){
let notes=JSON.parse(localStorage.getItem("notes"))||[];
notes.push({sub:subject.value,type:type.value,text:noteArea.value});
localStorage.setItem("notes",JSON.stringify(notes));
displayNotes();
}

function displayNotes(){
let notes=JSON.parse(localStorage.getItem("notes"))||[];
allNotes.innerHTML="";
notes.forEach(n=>{
allNotes.innerHTML+=`<div class="note"><b>${n.sub}</b><br>${n.text}</div>`;
});
}

let t=0,interval;
function start(){interval=setInterval(()=>{t+=0.1;clock.innerText=t.toFixed(1);},100);}
function stop(){clearInterval(interval);}
function reset(){t=0;clock.innerText="0.0";}

let tasks=[];
function addTask(){tasks.push({text:taskInput.value,done:false});saveTasks();}
function toggleTask(i){tasks[i].done=!tasks[i].done;saveTasks();}
function saveTasks(){localStorage.setItem("tasks",JSON.stringify(tasks));loadTasks();}
function loadTasks(){
tasks=JSON.parse(localStorage.getItem("tasks"))||[];
taskList.innerHTML="";
let done=0;
tasks.forEach((t,i)=>{
if(t.done)done++;
taskList.innerHTML+=`<li onclick="toggleTask(${i})">${t.done?'✔':'❌'} ${t.text}</li>`;
});
let p=tasks.length?(done/tasks.length)*100:0;
progressText.innerText=p.toFixed(0)+"%";
fill.style.width=p+"%";
}


let time=1500,timer;
function startPomo(){
timer=setInterval(()=>{
time--;
let m=Math.floor(time/60);
let s=time%60;
pomoTime.innerText=m+":"+s;
},1000);
}


let breathTimer;

function startBreathing(){
    clearInterval(breathTimer);

    let steps = [
        {text:"Inhale", time:7},
        {text:"Hold", time:4},
        {text:"Exhale", time:8}
    ];

    let i = 0;
    let seconds = steps[i].time;

    breathText.innerText = steps[i].text + " (" + seconds + "s)";

    breathTimer = setInterval(() => {

        seconds--;

        breathText.innerText = steps[i].text + " (" + seconds + "s)";

        if(steps[i].text === "Inhale"){
            circle.style.transform = "scale(1.5)";
        } else if(steps[i].text === "Exhale"){
            circle.style.transform = "scale(1)";
        }

        if(seconds <= 0){
            i = (i + 1) % 3;
            seconds = steps[i].time;
        }

    },1000);
}
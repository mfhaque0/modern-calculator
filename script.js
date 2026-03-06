const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

function append(value){
display.value += value;
}

function clearDisplay(){
display.value="";
}

function backspace(){
display.value = display.value.slice(0,-1);
}

function calculate(){

try{

let expression = display.value;
let result = eval(expression);

display.value = result;

let li=document.createElement("li");
li.textContent = expression + " = " + result;
historyList.prepend(li);

}
catch{
display.value="Error";
}

}

function toggleMode(){

let body=document.body;

if(body.classList.contains("dark")){
body.classList.remove("dark");
body.classList.add("light");
}
else{
body.classList.remove("light");
body.classList.add("dark");
}

}

document.addEventListener("keydown",function(e){

let key=e.key;

if(!isNaN(key) || "+-*/.%".includes(key)){
append(key);
}

if(key==="Enter"){
calculate();
}

if(key==="Backspace"){
backspace();
}

if(key==="Escape"){
clearDisplay();
}

});
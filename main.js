import './style.css'


const app = document.getElementById('app');
async function query(){
  const res = await (await fetch('https://opentdb.com/api.php?amount=15')).json();
  return res;
}

function getRandom(min,max){
  return Math.floor(Math.random() * (max - min) + min);
}


function renderCard(){
    
}
const questions = await query();
console.log(questions);
console.log(getRandom(0,15))
import './style.css'


const app = document.getElementById('app');
const div = document.createElement('div'); // Create a div 
div.innerHTML = `<h1>FlashCards</h1>
                  <div class="card" id="card"></div>`// Div Content

app.appendChild(div); // Insert div in dom


async function query(){ 
  const res = await (await fetch('https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple')).json();
  return res;
}

function getRandom(min,max){
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 
 * @param {object} obj
 * @param {HTMLDivElement} dom
 * @render Render flash card 
 */
function renderCard(obj, dom){ 
  let answers = obj.incorrect_answers;
  console.log(obj['incorrect_answers'])
  answers.push(obj.correct_answer);
  console.log(answers)
  answers.sort()
  console.log(answers)
  let listAnswers = answers.map(renderListAnswers).join('');

  dom.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${obj.question}</h5>
      <ul class="list-group list-group-flush">
        ${listAnswers}
      </ul>
    </div>
  
  `
  return dom;
}
const renderListAnswers = (value) =>{
  return `<li class="list-group-item">${value}</li>`
}
/**
 * Main function
 * @param {Array} array
 */
function main(array){  
  console.log(array)
  const divCard = document.getElementById('card');
  const num = getRandom(0,10);
  renderCard(array.at(num), divCard);
}

const questions = await query();

console.log(questions.results)

main(questions.results)

import './style.css'


const app = document.getElementById('app');
const div = document.createElement('div'); // Create a div 
div.innerHTML = `<h1>FlashCards</h1>
                  <div class="card" id="card"></div>`// Div Content

app.appendChild(div); // Insert div in dom

/**
 * Query to api
 * @returns {JSON}
 */
async function query(){ 
  const res = await (await fetch('https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple')).json();
  return res;
}

/**
 * Get a random number
 * @param {number} min 
 * @param {number} max 
 * @returns Random number between min and max value given
 */
function getRandom(min,max){
  return Math.floor(Math.random() * (max - min) + min);
}
/**
 * Set event to Li Element
 * @param {HTMLLIElement} ul 
 * @param {string} correct 
 */
function validAnswer(ul, correct){
  ul.addEventListener('click', () =>{
    if(ul.textContent == correct){
      alert('Respuesta correcta')
      return;
    }
    alert('Respuesta incorrecta');
  })
}
/**
 * 
 * @param {object} obj
 * @param {HTMLDivElement} dom
 * @render Render flash card 
 */
function renderCard(obj, dom){ 
  let answers = obj.incorrect_answers;
  answers.push(obj.correct_answer);
  answers.sort()

  const listAnswers =  renderListAnswers(answers, obj['correct-answer']); // generate ul with answers
  dom.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${obj.question}</h5>
    </div>
  `
  dom.appendChild(listAnswers)
  return dom;
} 
/**
 * 
 * @param {Array} values 
 * @param {string} correct 
 * @returns {HTMLUListElement} Ul Element
 */
function renderListAnswers(values, correct){
  const ul = document.createElement('ul');
  ul.setAttribute('class', "list-group list-group-flush")

  values.forEach(ele => {
    const li = document.createElement('li'); // Create li
    li.setAttribute('class', 'list-group-item'); // set class
    li.textContent = ele; // set textContent
    validAnswer(li,correct) // Add event
    ul.appendChild(li); // append to ul
  })

  return ul;
}
/**
 * Main function
 * @param {Array} array
 */
function main(array){  
  // console.log(array)
  const divCard = document.getElementById('card');
  const num = getRandom(0,10);
  renderCard(array.at(num), divCard);
}

const questions = await query();

console.log(questions.results)

main(questions.results)

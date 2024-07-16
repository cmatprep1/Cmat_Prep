const gkQuestionsContainer = document.querySelector('.gk-questions');
let button3 = document.querySelector("#random-generation");
let submitButton3 = document.querySelector("#submit-button");
let selectedgkQuestions = [];
let correctgkAnswers = [];
let gkQsNos=[];

document.addEventListener('DOMContentLoaded', fetchgks);

async function displaygks() {   
    let i = 0;
    correctgkAnswers = [];
    let optionIndex=['a','b','c','d'];
    
    gkQuestionsContainer.innerHTML = "<h1 class='gk-ques-type-shower'>GK QUESTIONS</h1> <br><br>";
    selectedgkQuestions.forEach((obj, index) => {
        let optionIndexCounter=0;

        correctgkAnswers[i] = obj.correctAnswer;
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${obj.question}`;
        questionDiv.appendChild(questionText);

        obj.options.forEach(option => {

            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `questionG${index}`;
            input.value=option;
            let newOption=`${ optionIndex[optionIndexCounter]}) ${option}`;
            optionIndexCounter++;
            label.appendChild(input);
            label.appendChild(document.createTextNode(newOption));
            
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement('br'));
        });
        let correctAns=document.createElement("div");
        correctAns.classList.add(`answerG${i}`);      
        questionDiv.appendChild(correctAns);
        gkQuestionsContainer.appendChild(questionDiv);
        questionDiv.appendChild(document.createElement('hr'));

        gkQsNos[i]=obj.questionNumber;
        i++;
    });
    
}


// Function to fetch questions data from GitHub Gist
async function fetchgks() {
    const GIST_URL = 'https://gist.githubusercontent.com/WinterWizad/58cba893b8ac8f73668235d9695157ad/raw/1adf98b5415412dcd21515cc31013e04e1f1efd7/GK%2520Questions'; // Replace with your actual GitHub Gist URL

    return fetch(GIST_URL)
        .then(response => response.json())
        .then(data => {
            const allQuestions = data.questions;
            selectedgkQuestions = getRandomQuestions(allQuestions, 25); // Get 25 random questions

            // For debugging

            return selectedgkQuestions; // Return selected questions
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            throw new Error('Failed to fetch questions');
        });
}

function recallgks() {
    if (selectedgkQuestions.length == 0) {
       
       return;
    }
    else
        displaygks();
}
const gktimer=setInterval(()=>{
    if (selectedgkQuestions.length != 0){
        clearInterval(gktimer);
        }
    recallgks();
},500);


// Function to get random questions without repetition
function getRandomQuestions(allQuestions, count) {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}


submitButton3.addEventListener('click', () => {
let i=0;
    correctgkAnswers.forEach((answer, index) => {
        const listItem = document.querySelector(`.answerG${i}`);
        listItem.style.color="lawngreen";
        i++;
        listItem.textContent = `Correct ANS: ${answer}`;
    });
});


// Event listener to generate and display questions on button click
button3.addEventListener('click', fetchgks);
button3.addEventListener('click', displaygks);


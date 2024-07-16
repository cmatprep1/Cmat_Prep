const logicalQuestionsContainer = document.querySelector('.logical-questions');
let button2 = document.querySelector("#random-generation");
let submitButton2 = document.querySelector("#submit-button");
let selectedlogicalQuestions = [];
let correctlogicalAnswers = [];
let logicalQsNos=[];
let optionIndex=['a','b','c','d'];

document.addEventListener('DOMContentLoaded', fetchlogicals);

async function displaylogicals() {   
    let i = 0;
    correctlogicalAnswers = [];

    logicalQuestionsContainer.innerHTML = "<h1 class='logical-ques-type-shower'>LOGICAL </h1><br><br>";
    selectedlogicalQuestions.forEach((obj, index) => {

        let optionIndexCounter=0;
        correctlogicalAnswers[i] = obj.correctAnswer;
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${obj.question}`;
        questionDiv.appendChild(questionText);

        obj.options.forEach(option => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `questionL${index}`;
            input.value=option;
            let newOption=`${ optionIndex[optionIndexCounter]}) ${option}`;
            optionIndexCounter++;

            label.appendChild(document.createTextNode(newOption));
            label.appendChild(input);
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement('br'));
        });
        let correctAns=document.createElement("div");
        correctAns.classList.add(`answerL${i}`);      
        questionDiv.appendChild(correctAns);
        logicalQuestionsContainer.appendChild(questionDiv);
        questionDiv.appendChild(document.createElement('hr'));
        logicalQsNos[i]=obj.questionNumber;
        i++;
    });
    
}


// Function to fetch questions data from GitHub Gist
async function fetchlogicals() {
    const GIST_URL = 'https://gist.githubusercontent.com/WinterWizad/6e11b44f2a76103db52596d35434d632/raw/4572ffe47c7e3bf8ac835b1c1fe25c6771443327/Logical%2520Questions'; // Replace with your actual GitHub Gist URL

    return fetch(GIST_URL)
        .then(response => response.json())
        .then(data => {
            const allQuestions = data.questions;
            selectedlogicalQuestions = getRandomQuestions(allQuestions, 25); // Get 25 random questions

            // For debugging

            return selectedlogicalQuestions; // Return selected questions
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            throw new Error('Failed to fetch questions');
        });
}


function recalllogicals() {
    if (selectedlogicalQuestions.length == 0) {
       
       return;
    }
    else
        displaylogicals();
}
const logicalstimer=setInterval(()=>{

    if (selectedlogicalQuestions.length != 0){
        clearInterval(logicalstimer);
        }
    recalllogicals();
},500);


// Function to get random questions without repetition
function getRandomQuestions(allQuestions, count) {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}


submitButton2.addEventListener('click', () => {
let i=0;
    correctlogicalAnswers.forEach((answer, index) => {
        const listItem = document.querySelector(`.answerL${i}`);
        listItem.style.color="lawngreen";
        i++;
        listItem.textContent = `Correct ANS: ${answer}`;
    });
});


// Event listener to generate and display questions on button click
button2.addEventListener('click', fetchlogicals);
button2.addEventListener('click', displaylogicals);


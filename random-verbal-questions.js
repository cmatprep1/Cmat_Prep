
let mainContainer = document.querySelector(".main-container2");
let verbalQuestionsContainer = document.querySelector('.verbal-questions');
let button = document.querySelector("#random-generation");

let submitButton = document.querySelector("#submit-button");
let selectedVerbalQuestions = [];

let correctVerbalAnswers = [];
let verbalQsNos = [];
document.addEventListener('DOMContentLoaded', fetchverbals);
let correctanswers = [];


async function displayverbals() {
    button.style.display = "none";
    mainContainer.style.visibility = "visible";
    submitButton.style.visibility = "visible";

    let i = 0;
    correctVerbalAnswers = [];
    let optionIndex = ['a', 'b', 'c', 'd'];

    verbalQuestionsContainer.innerHTML = "<h2 class='verbal-ques-type-shower'>VERBAL QUESTIONS</h2> <br> <br>";

    selectedVerbalQuestions.forEach((obj, index) => {
        let optionIndexCounter = 0;
        correctVerbalAnswers[i] = obj.correctAnswer;

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${obj.question}`;
        questionDiv.appendChild(questionText);

        obj.options.forEach(option => {

            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `questionV${index}`;
            input.value = option;
            let newOption = `${optionIndex[optionIndexCounter]}) ${option}`;
            optionIndexCounter++;

            label.appendChild(document.createTextNode(newOption));
            label.appendChild(input);
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement('br'));

        });

        let correctAns = document.createElement("div");
        correctAns.classList.add(`answerV${i}`);
        questionDiv.appendChild(correctAns);
        verbalQuestionsContainer.appendChild(questionDiv);
        questionDiv.appendChild(document.createElement('hr'));
        verbalQsNos[i] = obj.questionNumber;
        i++;

    });

}



// Function to fetch questions data from GitHub Gist
async function fetchverbals() {
    const GIST_URL = 'https://gist.githubusercontent.com/WinterWizad/a9bee045b4feaa881ae2579c89fec8e1/raw/b77fc074cddc63de8bb6aa6af3efb7ff7d5d601f/Verbal%2520Questions'; // Replace with your actual GitHub Gist URL

    return fetch(GIST_URL)
        .then(response => response.json())
        .then(data => {
            const allQuestions = data.questions;
            selectedVerbalQuestions = getRandomQuestions(allQuestions, 25); // Get 25 random questions

            // For debugging

            return selectedVerbalQuestions; // Return selected questions
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            throw new Error('Failed to fetch questions');
        });
}

// fetchverbals();
function recall() {
    if (selectedVerbalQuestions.length == 0) {
       
       return;
    }
    else
        displayverbals();
}
const verbalstimer=setInterval(()=>{
    if (selectedVerbalQuestions.length != 0){
        clearInterval(verbalstimer);
        }

    recall();
},500);





// Function to get random questions without repetition
function getRandomQuestions(allQuestions, count) {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
submitButton.addEventListener('click', () => {
    let i = 0;
    //Display correct answers
    correctVerbalAnswers.forEach((answer, index) => {
        const listItem = document.querySelector(`.answerV${i}`);
        listItem.style.color = "lawngreen";

        listItem.textContent = `Correct ANS: ${answer}`;
        correctanswers[i] = answer;
        i++;


    });
});

// Event listener to generate and display questions on button click
button.addEventListener('click', fetchverbals);
button.addEventListener('click', displayverbals);
const quantitativeQuestionsContainer = document.querySelector('.quantitative-questions');
let button1 = document.querySelector("#random-generation");
let submitButton1 = document.querySelector("#submit-button");
let selectedquantitativeQuestions = [];
let correctquantitativeAnswers = [];
let quantitativeQsNos=[];
document.addEventListener('DOMContentLoaded', fetchquantitatives);

async function displayquantitatives() {   
    let i = 0;
    correctquantitativeAnswers = [];
    let optionIndex=['a','b','c','d'];

    quantitativeQuestionsContainer.innerHTML = "<h1 class='quantitative-ques-type-shower'>QUANTITATIVE</h1> <br><br>";

    selectedquantitativeQuestions.forEach((obj, index) => {
        let optionIndexCounter=0;
        correctquantitativeAnswers[i] = obj.correctAnswer;      
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${obj.question}`;
        questionDiv.appendChild(questionText);

        obj.options.forEach(option => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `questionQ${index}`;
            input.value=option;
            let newOption=`${ optionIndex[optionIndexCounter]}) ${option}`;
            optionIndexCounter++;

            label.appendChild(document.createTextNode(newOption));
            label.appendChild(input);
            
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement('br'));
        });
        let correctAns=document.createElement("div");
        correctAns.classList.add(`answerQ${i}`);      
        questionDiv.appendChild(correctAns);
        quantitativeQuestionsContainer.appendChild(questionDiv);
        questionDiv.appendChild(document.createElement('hr'));
        quantitativeQsNos[i]=obj.questionNumber;
        i++;

    });
    
}


// Function to fetch questions data from GitHub Gist
async function fetchquantitatives() {
    const GIST_URL = 'https://gist.githubusercontent.com/WinterWizad/d14ec4de61442809993ee85cf616f478/raw/c63ca4026a85de2596de54edc852c6e000d37e42/QUANTITATIVE%2520Questions'; // Replace with your actual GitHub Gist URL

    return fetch(GIST_URL)
        .then(response => response.json())
        .then(data => {
            const allQuestions = data.questions;
            selectedquantitativeQuestions = getRandomQuestions(allQuestions, 25); // Get 25 random questions

            // For debugging

            return selectedquantitativeQuestions; // Return selected questions
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            throw new Error('Failed to fetch questions');
        });
}
function recallquantitative() {
    if (selectedquantitativeQuestions.length == 0) {
       
       return;
    }
    else{
        displayquantitatives();
        return;
    }

}
const quantitativetimer=setInterval(()=>{
    if (selectedquantitativeQuestions.length != 0){
        clearInterval(quantitativetimer);
        }

    recallquantitative();
},500);

// Function to get random questions without repetition
function getRandomQuestions(allQuestions, count) {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}


submitButton1.addEventListener('click', () => {
    let i=0;
    correctquantitativeAnswers.forEach((answer, index) => {
        const listItem = document.querySelector(`.answerQ${i}`);        
        listItem.style.color="lawngreen";
        i++;
        listItem.textContent = `Correct ANS: ${answer}`;
    });
});


// Event listener to generate and display questions on button click
button1.addEventListener('click', fetchquantitatives);
button1.addEventListener('click', displayquantitatives);


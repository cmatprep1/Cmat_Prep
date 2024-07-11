let swipeButton0 = document.querySelectorAll(".btn");
let section = document.querySelectorAll(".section");
let submitButton0 = document.querySelector("#submit-button");
let button0 = document.querySelector("#random-generation");
const screenWidth = window.screen.width;

let resultDisplay = document.querySelector(".result");
let selectedAnswer = [];
let radioInputs;

submitButton0.addEventListener('click', () => {
    //marks counters
    let correctVerbalAnswersCounter = 0;
let correctQuantitativeAnswersCounter = 0;
let correctLogicalAnswersCounter = 0;
let correctGkAnswersCounter = 0;
let totalMarks;

    button.style.display = "";
    let VerbalDisplay = document.querySelector(".verbal-ques-type-shower");
    let QuantitativeDisplay = document.querySelector(".quantitative-ques-type-shower");
    let LogicalDisplay = document.querySelector(".logical-ques-type-shower");
    let GkDisplay = document.querySelector(".gk-ques-type-shower");
    radioInputs = document.querySelectorAll("input");

    //Trackers of all correct answers (AS value of j can't be used due to out of bounds since array is of 24 only)
    let counter25 = 0;
    let tracker = 0;

    //To capture all checked radio buttons and put null value if none
    let j = 0;
    for (let a = 4; a < 400; a += 4) {

        if (radioInputs[a - 4].checked == false && radioInputs[a - 1].checked == false && radioInputs[a - 2].checked == false && radioInputs[a - 3].checked == false) {
            selectedAnswer[j] = null;
        }
        else {
            if (radioInputs[a - 4].checked)
                selectedAnswer[j] = radioInputs[a - 4].value;
            else if (radioInputs[a - 1].checked)
                selectedAnswer[j] = radioInputs[a - 1].value;
            else if (radioInputs[a - 2].checked)
                selectedAnswer[j] = radioInputs[a - 2].value;
            else
                selectedAnswer[j] = radioInputs[a - 3].value;

        }
        //to alert if any answer is not present in option
        if (j < 25) {
            if (radioInputs[a - 4].value == correctVerbalAnswers[tracker] ||
                radioInputs[a - 1].value == correctVerbalAnswers[tracker] ||
                radioInputs[a - 2].value == correctVerbalAnswers[tracker] ||
                radioInputs[a - 3].value == correctVerbalAnswers[tracker]) {

            }
            else {
                console.log(radioInputs[a - 4].value);
                console.log(radioInputs[a - 3].value);
                console.log(radioInputs[a - 2].value);
                console.log(radioInputs[a - 1].value);
                console.log(correctVerbalAnswers[tracker]);
                console.log("Answer is not present in verbal Qn:", tracker);
            }

        }
        else if (j>24 && j < 50) {
            if (radioInputs[a - 4].value == correctquantitativeAnswers[tracker] ||
                radioInputs[a - 1].value == correctquantitativeAnswers[tracker] ||
                radioInputs[a - 2].value == correctquantitativeAnswers[tracker] ||
                radioInputs[a - 3].value == correctquantitativeAnswers[tracker]) {

            }
            else{
                console.log(radioInputs[a - 4].value);
                console.log(radioInputs[a - 3].value);
                console.log(radioInputs[a - 2].value);
                console.log(radioInputs[a - 1].value);
                console.log("CORRECT: ",correctquantitativeAnswers[tracker]);
                console.log("Answer is not present in Quantitative: ", tracker);
            }
        }
        else if (j>49 && j < 75) {
            if (radioInputs[a - 4].value == correctlogicalAnswers[tracker] ||
                radioInputs[a - 1].value == correctlogicalAnswers[tracker] ||
                radioInputs[a - 2].value == correctlogicalAnswers[tracker] ||
                radioInputs[a - 3].value == correctlogicalAnswers[tracker]) {

            }
            else{ console.log(radioInputs[a - 4].value);
                console.log(radioInputs[a - 3].value);
                console.log(radioInputs[a - 2].value);
                console.log(radioInputs[a - 1].value);
                console.log("CORRECT: ",correctlogicalAnswers[tracker]);
                console.log("Answer is not present in Logical:", tracker);
            }
        }
        else  {
            if (radioInputs[a - 4].value == correctgkAnswers[tracker] ||
                radioInputs[a - 1].value == correctgkAnswers[tracker] ||
                radioInputs[a - 2].value == correctgkAnswers[tracker] ||
                radioInputs[a - 3].value == correctgkAnswers[tracker]) {

            }
            else{
            console.log(radioInputs[a - 4].value);
            console.log(radioInputs[a - 3].value);
            console.log(radioInputs[a - 2].value);
            console.log(radioInputs[a - 1].value);
            console.log("CORRECT: ",correctgkAnswers[tracker]);
            console.log("Answer is not present in Gk:", tracker);
            }
        }


        //to count correct answers

        if (j < 25) {
            if (selectedAnswer[j] === correctVerbalAnswers[tracker])
                correctVerbalAnswersCounter++;

        }
        else if (j < 50) {
            if (selectedAnswer[j] === correctquantitativeAnswers[tracker])
                correctQuantitativeAnswersCounter++;
        }
        else if (j < 75) {
            if (selectedAnswer[j] === correctlogicalAnswers[tracker])
                correctLogicalAnswersCounter++;
        }
        else {
            if (selectedAnswer[j] === correctgkAnswers[tracker])
                correctGkAnswersCounter++;
        }
        tracker++;
        //checking if 25 questions(one section) is completed
        if (counter25 == 24 || counter25 == 49 || counter25 == 74 || counter25 == 99)
            tracker = 0;
        j++;
        counter25++;



    }
    //Printing Question Numbers
    console.log("verbal question NUmbers")
    console.log(verbalQsNos)
    console.log("quantitative question NUmbers")
    console.log(quantitativeQsNos)
    console.log("logical question NUmbers")
    console.log(logicalQsNos)
    console.log("Gk  question NUmbers")
    console.log(gkQsNos)

    //styling & displaying results
    totalMarks = correctGkAnswersCounter + correctLogicalAnswersCounter + correctQuantitativeAnswersCounter + correctVerbalAnswersCounter;
    resultDisplay.innerHTML = `SCORE: ${totalMarks}/100`;

    if (correctVerbalAnswersCounter > 11)
        VerbalDisplay.style.color = "green";
    else
        VerbalDisplay.style.color = "red";
    if (correctQuantitativeAnswersCounter > 11)
        QuantitativeDisplay.style.color = "green";
    else
        QuantitativeDisplay.style.color = "red";
    if (correctLogicalAnswersCounter > 11)
        LogicalDisplay.style.color = "green";
    else
        LogicalDisplay.style.color = "red";
    if (correctGkAnswersCounter > 11)
        GkDisplay.style.color = "green";
    else
        GkDisplay.style.color = "red";
        VerbalDisplay.innerHTML="Verbal";
        QuantitativeDisplay.innerHTML="Quantitative";
        LogicalDisplay.innerHTML="Logical";
        GkDisplay.innerHTML="GK"
    VerbalDisplay.innerHTML += `: ${correctVerbalAnswersCounter}/25`;
    QuantitativeDisplay.innerHTML += `: ${correctQuantitativeAnswersCounter}/25`;
    LogicalDisplay.innerHTML += `: ${correctLogicalAnswersCounter}/25`;
    GkDisplay.innerHTML += `: ${correctGkAnswersCounter}/25`;


});



//Event listener to scroll to top of Questions
submitButton0.addEventListener('click', () => {
    section[0].scrollTo(0, 0);
    section[1].scrollTo(0, 0);
    section[2].scrollTo(0, 0);
    section[3].scrollTo(0, 0);
})
//to display next & prev buttons on random button click
button0.addEventListener('click', () => {
    resultDisplay.innerHTML = ``;
    if (screenWidth < 600) {
        swipeButton0[0].style.visibility = "visible";
        swipeButton0[1].style.visibility = "visible";
    }

});
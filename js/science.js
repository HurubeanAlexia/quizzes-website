const questions = [
    {
        question: "What is the most abundant gas in Earth's atmosphere?",
        answers: [
            {text: "Oxygen", correct: false},
            {text: "Carbon Dioxide", correct: false},
            {text: "Nitrogen", correct: true},
            {text: "Hydrogen", correct: false}
        ]
    },
    {
        question: "How many bones does an adult human body have?",
        answers: [
            {text: "206", correct: true},
            {text: "205", correct: false},
            {text: "210", correct: false},
            {text: "208", correct: false}
        ]
    },
    {
        question: "Which planet is known for having a ring system?",
        answers: [
            {text: "Venus", correct: false},
            {text: "Mars", correct: false},
            {text: "Jupiter", correct: false},
            {text: "Saturn", correct: true}
        ]
    },
    {
        question: "Which of the following is NOT a type of cloud?",
        answers: [
            {text: "Cumulus", correct: false},
            {text: "Stratus", correct: false},
            {text: "Nimbus", correct: false},
            {text: "Borealis", correct: true}
        ]
    },
    {
        question: "What is the center of an atom called?",
        answers: [
            {text: "Proton", correct: false},
            {text: "Neutron", correct: false},
            {text: "Nucleus", correct: true},
            {text: "Electron", correct: false}
        ]
    },
    {
        question: "Which part of the plant conducts photosynthesis?",
        answers: [
            {text: "Root", correct: false},
            {text: "Stem", correct: false},
            {text: "Leaf", correct: true},
            {text: "Flower", correct: false}
        ]
    },
    {
        question: "What is the phenomenon called when a star suddenly increases in brightness before fading?",
        answers: [
            {text: "Supernova", correct: true},
            {text: "Black Hole", correct: false},
            {text: "Red Giant", correct: false},
            {text: "Meteor Shower", correct: false}
        ]
    },
    {
        question: "What natural event is measured by the Richter scale?",
        answers: [
            {text: "Tornado", correct: false},
            {text: "Earthquake", correct: true},
            {text: "Hurricane", correct: false},
            {text: "Tsunami", correct: false}
        ]
    },
    {
        question: "Which of the following has been observed as the most distant object in the universe?",
        answers: [
            {text: "Andromeda Galaxy", correct: false},
            {text: "Quasar", correct: true},
            {text: "Voyager 1 Spacecraft", correct: false},
            {text: "Neutron Star", correct: false}
        ]
    },

    {
        question: "Which mammal has fingerprints so similar to humans that they can confuse crime scene investigations?",
        answers: [
            {text: "Chimpanzee", correct: false},
            {text: "Gorilla", correct: false},
            {text: "Koala", correct: true},
            {text: "Panda", correct: false}
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const homeButton = document.getElementById("home-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}



function resetState(){
    nextButton.style.display ="none";
    homeButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    nextButton.innerHTML = "Play again";
    homeButton.innerHTML = "Go Home";

    nextButton.style.display = "block";
    homeButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

homeButton.addEventListener("click", () => {
    window.location.href = "../html/quizzes.html"; 
});

startQuiz();

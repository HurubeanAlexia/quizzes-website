const questions = [
    {
        question: "When did World War II end?",
        answers: [
            {text: "1940", correct: false},
            {text: "1943", correct: false},
            {text: "1945", correct: true},
            {text: "1947", correct: false}
        ]
    },
    {
        question: "Who was the first President of the United States?",
        answers: [
            {text: "Thomas Jefferson", correct: false},
            {text: "George Washington", correct: true},
            {text: "Abraham Lincoln", correct: false},
            {text: "Benjamin Franklin", correct: false}
        ]
    },
    {
        question: "What was the name of the ship that transported the Pilgrims to America in 1620?",
        answers: [
            {text: "Santa Maria", correct: false},
            {text: "Mayflower", correct: true},
            {text: "Titanic", correct: false},
            {text: "HMS Victory", correct: false}
        ]
    },
    {
        question: "In which year did the Berlin Wall fall?",
        answers: [
            {text: "1985", correct: false},
            {text: "1987", correct: false},
            {text: "1989", correct: true},
            {text: "1991", correct: false}
        ]
    },
    {
        question: "Who discovered America in 1492?",
        answers: [
            {text: "Marco Polo", correct: false},
            {text: "Ferdinand Magellan", correct: false},
            {text: "Christopher Columbus", correct: true},
            {text: "Leif Erikson", correct: false}
        ]
    },
    {
        question: "What was the main reason for the start of the American Civil War?",
        answers: [
            {text: "Taxation without representation", correct: false},
            {text: "Disagreement over slavery", correct: true},
            {text: "The discovery of gold", correct: false},
            {text: "Dispute over land with Mexico", correct: false}
        ]
    },
    {
        question: "Who was the first emperor of Rome?",
        answers: [
            {text: "Julius Caesar", correct: false},
            {text: "Nero", correct: false},
            {text: "Augustus", correct: true},
            {text: "Caligula", correct: false}
        ]
    },
    {
        question: "What year did the French Revolution begin?",
        answers: [
            {text: "1755", correct: false},
            {text: "1776", correct: false},
            {text: "1789", correct: true},
            {text: "1801", correct: false}
        ]
    },
    {
        question: "Which ancient wonder was located in Greece?",
        answers: [
            {text: "The Great Pyramid of Giza", correct: false},
            {text: "Hanging Gardens of Babylon", correct: false},
            {text: "Statue of Zeus at Olympia", correct: true},
            {text: "Temple of Artemis at Ephesus", correct: false}
        ]
    },

    {
        question: "Who was the leader of the Soviet Union during World War II?",
        answers: [
            {text: "Vladimir Lenin", correct: false},
            {text: "Leon Trotsky", correct: false},
            {text: "Mikhail Gorbachev", correct: false},
            {text: "Joseph Stalin", correct: true}
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

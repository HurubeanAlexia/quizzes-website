const questions = [
    {
        question: "Which is the largest organ in the human body?",
        answers: [
            {text: "Liver", correct: false},
            {text: "Brain", correct: false},
            {text: "Skin", correct: true},
            {text: "Heart", correct: false}
        ]
    },
    {
        question: "What is the name of the smallest bone in the human body?",
        answers: [
            {text: "Stapes", correct: true},
            {text: "Fibula", correct: false},
            {text: "Radius", correct: false},
            {text: "Ulna", correct: false}
        ]
    },
    {
        question: "Which part of the human brain controls voluntary movements?",
        answers: [
            {text: "Cerebrum", correct: true},
            {text: "Cerebellum", correct: false},
            {text: "Brainstem", correct: false},
            {text: "Hypothalamus", correct: false}
        ]
    },
    {
        question: "How many ribs does a typical human have?",
        answers: [
            {text: "10 pairs", correct: false},
            {text: "12 pairs", correct: true},
            {text: "14 pairs", correct: false},
            {text: "16 pairs", correct: false}
        ]
    },
    {
        question: "Which human organ can regenerate itself if a part of it is removed?",
        answers: [
            {text: "Heart", correct: false},
            {text: "Kidney", correct: false},
            {text: "Liver", correct: true},
            {text: "Pancreas", correct: false}
        ]
    },
    {
        question: "What is the main function of red blood cells?",
        answers: [
            {text: "To fight infection", correct: false},
            {text: "To transport oxygen", correct: true},
            {text: "To produce hormones", correct: false},
            {text: "To regulate body temperature", correct: false}
        ]
    },
    {
        question: "What part of the eye is responsible for its color?",
        answers: [
            {text: "Retina", correct: false},
            {text: "Cornea", correct: false},
            {text: "Iris", correct: true},
            {text: "Pupil", correct: false}
        ]
    },
    {
        question: "Which vitamin is produced when human skin is exposed to sunlight?",
        answers: [
            {text: "Vitamin A", correct: false},
            {text: "Vitamin C", correct: false},
            {text: "Vitamin D", correct: true},
            {text: "Vitamin E", correct: false}
        ]
    },
    {
        question: "What part of the human body contains the most bones?",
        answers: [
            {text: "Spine", correct: false},
            {text: "Hands", correct: false},
            {text: "Feet", correct: true},
            {text: "Skull", correct: false}
        ]
    },
    {
        question: "What is the body's largest muscle?",
        answers: [
            {text: "Biceps", correct: false},
            {text: "Quadriceps", correct: false},
            {text: "Gluteus maximus", correct: true},
            {text: "Pectoralis major", correct: false}
        ]
    },
    {
        question: "How many taste buds does an average human have on their tongue?",
        answers: [
            {text: "Around 500", correct: false},
            {text: "Around 2,000", correct: false},
            {text: "Around 5,000", correct: true},
            {text: "Around 10,000", correct: false}
        ]
    },
    {
        question: "Which part of the brain is responsible for regulating balance and coordination?",
        answers: [
            {text: "Cerebrum", correct: false},
            {text: "Brainstem", correct: false},
            {text: "Cerebellum", correct: true},
            {text: "Hypothalamus", correct: false}
        ]
    },
    {
        question: "Which blood type is known as the universal donor?",
        answers: [
            {text: "A+", correct: false},
            {text: "B-", correct: false},
            {text: "AB+", correct: false},
            {text: "O-", correct: true}
        ]
    },
    {
        question: "Which organ is responsible for filtering toxins from the blood?",
        answers: [
            {text: "Heart", correct: false},
            {text: "Liver", correct: true},
            {text: "Pancreas", correct: false},
            {text: "Spleen", correct: false}
        ]
    },
    {
        question: "How many bones does a newborn baby have, approximately?",
        answers: [
            {text: "100", correct: false},
            {text: "206", correct: false},
            {text: "270", correct: true},
            {text: "350", correct: false}
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

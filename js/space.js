const questions = [
    {
        question: "Which planet is known as the 'Red Planet'?",
        answers: [
            {text: "Venus", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
            {text: "Saturn", correct: false}
        ]
    },
    {
        question: "What is the name of the largest planet in our solar system?",
        answers: [
            {text: "Earth", correct: false},
            {text: "Saturn", correct: false},
            {text: "Jupiter", correct: true},
            {text: "Neptune", correct: false}
        ]
    },
    {
        question: "What is the closest star to Earth?",
        answers: [
            {text: "Alpha Centauri", correct: false},
            {text: "Betelgeuse", correct: false},
            {text: "Proxima Centauri", correct: false},
            {text: "The Sun", correct: true}
        ]
    },
    {
        question: "Who was the first person to walk on the moon?",
        answers: [
            {text: "Yuri Gagarin", correct: false},
            {text: "Buzz Aldrin", correct: false},
            {text: "Neil Armstrong", correct: true},
            {text: "Michael Collins", correct: false}
        ]
    },
    {
        question: "What galaxy is our solar system a part of?",
        answers: [
            {text: "Andromeda Galaxy", correct: false},
            {text: "Whirlpool Galaxy", correct: false},
            {text: "Milky Way Galaxy", correct: true},
            {text: "Triangulum Galaxy", correct: false}
        ]
    },
    {
        question: "Which planet has a prominent ring system?",
        answers: [
            {text: "Mars", correct: false},
            {text: "Saturn", correct: true},
            {text: "Uranus", correct: false},
            {text: "Neptune", correct: false}
        ]
    },
    {
        question: "What is the name of NASA's most famous space telescope?",
        answers: [
            {text: "Kepler Space Telescope", correct: false},
            {text: "Hubble Space Telescope", correct: true},
            {text: "James Webb Space Telescope", correct: false},
            {text: "Chandra X-ray Observatory", correct: false}
        ]
    },
    {
        question: "Who was the first human to journey into outer space?",
        answers: [
            {text: "John Glenn", correct: false},
            {text: "Buzz Aldrin", correct: false},
            {text: "Yuri Gagarin", correct: true},
            {text: "Alan Shepard", correct: false}
        ]
    },
    {
        question: "What is the name of the dwarf planet located in the Kuiper Belt?",
        answers: [
            {text: "Ceres", correct: false},
            {text: "Pluto", correct: true},
            {text: "Makemake", correct: false},
            {text: "Haumea", correct: false}
        ]
    },
    {
        question: "Which planet is often called Earth's 'twin' due to its similar size and composition?",
        answers: [
            {text: "Venus", correct: true},
            {text: "Mars", correct: false},
            {text: "Mercury", correct: false},
            {text: "Neptune", correct: false}
        ]
    },
    {
        question: "What is the name of the first artificial satellite sent into space?",
        answers: [
            {text: "Sputnik 1", correct: true},
            {text: "Explorer 1", correct: false},
            {text: "Luna 2", correct: false},
            {text: "Vostok 1", correct: false}
        ]
    },
    {
        question: "What type of star is our Sun classified as?",
        answers: [
            {text: "Red giant", correct: false},
            {text: "White dwarf", correct: false},
            {text: "Yellow dwarf", correct: true},
            {text: "Neutron star", correct: false}
        ]
    },
    {
        question: "Which planet has the largest volcano in the solar system, Olympus Mons?",
        answers: [
            {text: "Earth", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
            {text: "Venus", correct: false}
        ]
    },
    {
        question: "What is the name of the force that keeps planets in orbit around the Sun?",
        answers: [
            {text: "Magnetism", correct: false},
            {text: "Gravity", correct: true},
            {text: "Friction", correct: false},
            {text: "Nuclear force", correct: false}
        ]
    },
    {
        question: "What is the brightest object in the night sky, besides the Moon?",
        answers: [
            {text: "Mars", correct: false},
            {text: "Venus", correct: true},
            {text: "Jupiter", correct: false},
            {text: "Sirius", correct: false}
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

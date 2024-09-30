const questions = [
    {
        question: "Who is the king of the gods in Greek mythology?",
        answers: [
            {text: "Hades", correct: false},
            {text: "Poseidon", correct: false},
            {text: "Zeus", correct: true},
            {text: "Apollo", correct: false}
        ]
    },
    {
        question: "In Norse mythology, what is the name of Thor's hammer?",
        answers: [
            {text: "Gungnir", correct: false},
            {text: "Mjolnir", correct: true},
            {text: "Excalibur", correct: false},
            {text: "Durandal", correct: false}
        ]
    },
    {
        question: "Which Egyptian god is known as the god of the underworld?",
        answers: [
            {text: "Ra", correct: false},
            {text: "Anubis", correct: false},
            {text: "Osiris", correct: true},
            {text: "Horus", correct: false}
        ]
    },
    {
        question: "What is the name of the great hall where Viking warriors are said to go after death in Norse mythology?",
        answers: [
            {text: "Olympus", correct: false},
            {text: "Avalon", correct: false},
            {text: "Elysium", correct: false},
            {text: "Valhalla", correct: true}
        ]
    },
    {
        question: "In Greek mythology, who is the hero that completed the Twelve Labors?",
        answers: [
            {text: "Perseus", correct: false},
            {text: "Theseus", correct: false},
            {text: "Hercules", correct: true},
            {text: "Achilles", correct: false}
        ]
    },
    {
        question: "Who was the trickster god in Norse mythology, known for causing trouble among gods and mortals?",
        answers: [
            {text: "Odin", correct: false},
            {text: "Loki", correct: true},
            {text: "Balder", correct: false},
            {text: "Freyr", correct: false}
        ]
    },
    {
        question: "What creature in Greek mythology has the body of a lion, the head of a human, and sometimes wings?",
        answers: [
            {text: "Centaur", correct: false},
            {text: "Minotaur", correct: false},
            {text: "Sphinx", correct: true},
            {text: "Griffin", correct: false}
        ]
    },
    {
        question: "Which legendary island is said to have sunk into the sea, as described by the philosopher Plato?",
        answers: [
            {text: "Atlantis", correct: true},
            {text: "El Dorado", correct: false},
            {text: "Camelot", correct: false},
            {text: "Shangri-La", correct: false}
        ]
    },
    {
        question: "In Hindu mythology, which god is known as the preserver and protector of the universe?",
        answers: [
            {text: "Brahma", correct: false},
            {text: "Shiva", correct: false},
            {text: "Vishnu", correct: true},
            {text: "Indra", correct: false}
        ]
    },
    {
        question: "Who is the Greek goddess of wisdom and warfare, often depicted with an owl?",
        answers: [
            {text: "Aphrodite", correct: false},
            {text: "Hera", correct: false},
            {text: "Athena", correct: true},
            {text: "Artemis", correct: false}
        ]
    },
    {
        question: "In Celtic mythology, what is the name of the mystical place where King Arthur is said to have gone to heal his wounds?",
        answers: [
            {text: "Avalon", correct: true},
            {text: "Camelot", correct: false},
            {text: "Glastonbury", correct: false},
            {text: "Stonehenge", correct: false}
        ]
    },
    {
        question: "Who is the Egyptian goddess of magic, fertility, and motherhood?",
        answers: [
            {text: "Hathor", correct: false},
            {text: "Bastet", correct: false},
            {text: "Isis", correct: true},
            {text: "Nephthys", correct: false}
        ]
    },
    {
        question: "In Greek mythology, what was the name of the winged horse born from the blood of Medusa?",
        answers: [
            {text: "Phoenix", correct: false},
            {text: "Pegasus", correct: true},
            {text: "Chiron", correct: false},
            {text: "Hydra", correct: false}
        ]
    },
    {
        question: "According to legend, which king turned everything he touched into gold?",
        answers: [
            {text: "King Arthur", correct: false},
            {text: "King Midas", correct: true},
            {text: "King Minos", correct: false},
            {text: "King Solomon", correct: false}
        ]
    },
    {
        question: "What is the name of the fire-breathing creature in Greek mythology that has the body parts of a lion, a goat, and a serpent?",
        answers: [
            {text: "Hydra", correct: false},
            {text: "Chimera", correct: true},
            {text: "Cerberus", correct: false},
            {text: "Cyclops", correct: false}
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

const questions = [
    {
        question: "Who is credited with inventing the first practical light bulb?",
        answers: [
            {text: "Alexander Graham Bell", correct: false},
            {text: "Nikola Tesla", correct: false},
            {text: "Thomas Edison", correct: true},
            {text: "Benjamin Franklin", correct: false}
        ]
    },
    {
        question: "Who is known for inventing the telephone?",
        answers: [
            {text: "Guglielmo Marconi", correct: false},
            {text: "Alexander Graham Bell", correct: true},
            {text: "Samuel Morse", correct: false},
            {text: "John Logie Baird", correct: false}
        ]
    },
    {
        question: "Which inventor developed the theory of alternating current (AC) electricity?",
        answers: [
            {text: "Thomas Edison", correct: false},
            {text: "Nikola Tesla", correct: true},
            {text: "Michael Faraday", correct: false},
            {text: "James Watt", correct: false}
        ]
    },
    {
        question: "Who is credited with inventing the World Wide Web (WWW)?",
        answers: [
            {text: "Bill Gates", correct: false},
            {text: "Steve Jobs", correct: false},
            {text: "Tim Berners-Lee", correct: true},
            {text: "Mark Zuckerberg", correct: false}
        ]
    },
    {
        question: "What invention is Johannes Gutenberg famous for?",
        answers: [
            {text: "The printing press", correct: true},
            {text: "The steam engine", correct: false},
            {text: "The microscope", correct: false},
            {text: "The telescope", correct: false}
        ]
    },
    {
        question: "Who invented the first successful airplane?",
        answers: [
            {text: "Samuel Morse", correct: false},
            {text: "Henry Ford", correct: false},
            {text: "The Wright brothers", correct: true},
            {text: "Leonardo da Vinci", correct: false}
        ]
    },
    {
        question: "Who invented the first practical automobile?",
        answers: [
            {text: "Henry Ford", correct: false},
            {text: "Gottlieb Daimler", correct: false},
            {text: "Karl Benz", correct: true},
            {text: "Enzo Ferrari", correct: false}
        ]
    },
    {
        question: "What was invented by Samuel Morse?",
        answers: [
            {text: "Television", correct: false},
            {text: "Telephone", correct: false},
            {text: "Morse code and the telegraph", correct: true},
            {text: "Radio", correct: false}
        ]
    },
    {
        question: "Who invented the process of vaccination?",
        answers: [
            {text: "Louis Pasteur", correct: false},
            {text: "Edward Jenner", correct: true},
            {text: "Alexander Fleming", correct: false},
            {text: "Robert Koch", correct: false}
        ]
    },
    {
        question: "Who is known as the 'father of computers' for designing the first mechanical computer?",
        answers: [
            {text: "Alan Turing", correct: false},
            {text: "John von Neumann", correct: false},
            {text: "Charles Babbage", correct: true},
            {text: "Bill Gates", correct: false}
        ]
    },
    {
        question: "Who invented the phonograph, an early device for recording and playing sound?",
        answers: [
            {text: "Thomas Edison", correct: true},
            {text: "Alexander Graham Bell", correct: false},
            {text: "Guglielmo Marconi", correct: false},
            {text: "John Logie Baird", correct: false}
        ]
    },
    {
        question: "Who invented penicillin, the world's first antibiotic?",
        answers: [
            {text: "Joseph Lister", correct: false},
            {text: "Alexander Fleming", correct: true},
            {text: "Edward Jenner", correct: false},
            {text: "Marie Curie", correct: false}
        ]
    },
    {
        question: "Who invented the first electric battery?",
        answers: [
            {text: "Michael Faraday", correct: false},
            {text: "Thomas Edison", correct: false},
            {text: "Alessandro Volta", correct: true},
            {text: "Benjamin Franklin", correct: false}
        ]
    },
    {
        question: "Who is credited with inventing the modern steam engine, which helped launch the Industrial Revolution?",
        answers: [
            {text: "Robert Fulton", correct: false},
            {text: "James Watt", correct: true},
            {text: "George Stephenson", correct: false},
            {text: "Thomas Savery", correct: false}
        ]
    },
    {
        question: "Who invented the polio vaccine?",
        answers: [
            {text: "Edward Jenner", correct: false},
            {text: "Louis Pasteur", correct: false},
            {text: "Albert Sabin", correct: false},
            {text: "Jonas Salk", correct: true}
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

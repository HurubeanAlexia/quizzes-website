const questions = [
    {
        question: "Who was the first female Prime Minister of the United Kingdom?",
        answers: [
            {text: "Indira Gandhi", correct: false},
            {text: "Margaret Thatcher", correct: true},
            {text: "Golda Meir", correct: false},
            {text: "Angela Merkel", correct: false}
        ]
    },
    {
        question: "Which civil rights leader delivered the famous 'I Have a Dream' speech?",
        answers: [
            {text: "Nelson Mandela", correct: false},
            {text: "Martin Luther King Jr.", correct: true},
            {text: "Malcolm X", correct: false},
            {text: "Rosa Parks", correct: false}
        ]
    },
    {
        question: "Who was the scientist that developed the theory of general relativity?",
        answers: [
            {text: "Isaac Newton", correct: false},
            {text: "Albert Einstein", correct: true},
            {text: "Marie Curie", correct: false},
            {text: "Galileo Galilei", correct: false}
        ]
    },
    {
        question: "Which artist painted the ceiling of the Sistine Chapel in Vatican City?",
        answers: [
            {text: "Leonardo da Vinci", correct: false},
            {text: "Vincent van Gogh", correct: false},
            {text: "Michelangelo", correct: true},
            {text: "Raphael", correct: false}
        ]
    },
    {
        question: "Who was the first Emperor of China, known for unifying the country?",
        answers: [
            {text: "Qin Shi Huang", correct: true},
            {text: "Sun Tzu", correct: false},
            {text: "Genghis Khan", correct: false},
            {text: "Confucius", correct: false}
        ]
    },
    {
        question: "Which French military leader became Emperor and established a vast European empire in the early 19th century?",
        answers: [
            {text: "Louis XIV", correct: false},
            {text: "Charlemagne", correct: false},
            {text: "Napoleon Bonaparte", correct: true},
            {text: "Henry IV", correct: false}
        ]
    },
    {
        question: "Who was the ancient Greek philosopher known as the 'Father of Western Philosophy'?",
        answers: [
            {text: "Socrates", correct: true},
            {text: "Aristotle", correct: false},
            {text: "Plato", correct: false},
            {text: "Pythagoras", correct: false}
        ]
    },
    {
        question: "Which South African leader fought against apartheid and became the country's first black president?",
        answers: [
            {text: "Desmond Tutu", correct: false},
            {text: "Nelson Mandela", correct: true},
            {text: "Thabo Mbeki", correct: false},
            {text: "Oliver Tambo", correct: false}
        ]
    },
    {
        question: "Who wrote the influential political treatise 'The Prince'?",
        answers: [
            {text: "Karl Marx", correct: false},
            {text: "Jean-Jacques Rousseau", correct: false},
            {text: "Niccolò Machiavelli", correct: true},
            {text: "John Locke", correct: false}
        ]
    },
    {
        question: "Who was the first woman to win a Nobel Prize and the only person to win in two different scientific fields?",
        answers: [
            {text: "Rosalind Franklin", correct: false},
            {text: "Marie Curie", correct: true},
            {text: "Ada Lovelace", correct: false},
            {text: "Florence Nightingale", correct: false}
        ]
    },
    {
        question: "Which American president is known for the Emancipation Proclamation, which led to the abolition of slavery?",
        answers: [
            {text: "George Washington", correct: false},
            {text: "Thomas Jefferson", correct: false},
            {text: "Abraham Lincoln", correct: true},
            {text: "Theodore Roosevelt", correct: false}
        ]
    },
    {
        question: "Who was the famous nurse known for her role in the Crimean War and is considered the founder of modern nursing?",
        answers: [
            {text: "Clara Barton", correct: false},
            {text: "Florence Nightingale", correct: true},
            {text: "Mary Seacole", correct: false},
            {text: "Dorothea Dix", correct: false}
        ]
    },
    {
        question: "Which explorer is credited with being the first to circumnavigate the globe?",
        answers: [
            {text: "Christopher Columbus", correct: false},
            {text: "Ferdinand Magellan", correct: true},
            {text: "Marco Polo", correct: false},
            {text: "Vasco da Gama", correct: false}
        ]
    },
    {
        question: "Which physicist is known as the 'father of modern physics' for his work on classical mechanics?",
        answers: [
            {text: "Niels Bohr", correct: false},
            {text: "Albert Einstein", correct: false},
            {text: "Isaac Newton", correct: true},
            {text: "Max Planck", correct: false}
        ]
    },
    {
        question: "Who was the Indian leader known for his non-violent struggle for independence from British rule?",
        answers: [
            {text: "Jawaharlal Nehru", correct: false},
            {text: "Subhas Chandra Bose", correct: false},
            {text: "Mahatma Gandhi", correct: true},
            {text: "Bhagat Singh", correct: false}
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

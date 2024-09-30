const questions = [
    {
        question: "Which country is known for its massive Carnival celebration, featuring parades and samba music?",
        answers: [
            {text: "Spain", correct: false},
            {text: "Brazil", correct: true},
            {text: "Italy", correct: false},
            {text: "Mexico", correct: false}
        ]
    },
    {
        question: "What is the name of the Hindu festival of lights, celebrated with oil lamps, fireworks, and sweets?",
        answers: [
            {text: "Diwali", correct: true},
            {text: "Holi", correct: false},
            {text: "Navaratri", correct: false},
            {text: "Raksha Bandhan", correct: false}
        ]
    },
    {
        question: "In which country is the 'Day of the Dead' (Día de los Muertos) celebrated to honor deceased loved ones?",
        answers: [
            {text: "Colombia", correct: false},
            {text: "Spain", correct: false},
            {text: "Mexico", correct: true},
            {text: "Peru", correct: false}
        ]
    },
    {
        question: "Which festival involves throwing colored powders and water, celebrated in the spring in India?",
        answers: [
            {text: "Diwali", correct: false},
            {text: "Holi", correct: true},
            {text: "Onam", correct: false},
            {text: "Vaisakhi", correct: false}
        ]
    },
    {
        question: "What is the name of the Japanese festival that celebrates the blooming of cherry blossoms?",
        answers: [
            {text: "Obon", correct: false},
            {text: "Tanabata", correct: false},
            {text: "Hanami", correct: true},
            {text: "Setsubun", correct: false}
        ]
    },
    {
        question: "What is the name of the Christian holiday that celebrates the resurrection of Jesus Christ?",
        answers: [
            {text: "Christmas", correct: false},
            {text: "Easter", correct: true},
            {text: "Good Friday", correct: false},
            {text: "Pentecost", correct: false}
        ]
    },
    {
        question: "Which festival, known as the 'Festival of Sacrifice', is one of the two major Islamic holidays?",
        answers: [
            {text: "Eid al-Fitr", correct: false},
            {text: "Eid al-Adha", correct: true},
            {text: "Ramadan", correct: false},
            {text: "Ashura", correct: false}
        ]
    },
    {
        question: "Which country celebrates Bastille Day on July 14th, marking the beginning of its revolution?",
        answers: [
            {text: "Italy", correct: false},
            {text: "United States", correct: false},
            {text: "France", correct: true},
            {text: "Canada", correct: false}
        ]
    },
    {
        question: "In which country is the Lunar New Year, also known as the 'Spring Festival', one of the most important holidays?",
        answers: [
            {text: "Japan", correct: false},
            {text: "Vietnam", correct: false},
            {text: "China", correct: true},
            {text: "Thailand", correct: false}
        ]
    },
    {
        question: "What is the name of the Islamic holy month of fasting, prayer, and reflection?",
        answers: [
            {text: "Eid al-Fitr", correct: false},
            {text: "Ramadan", correct: true},
            {text: "Hajj", correct: false},
            {text: "Mawlid", correct: false}
        ]
    },
    {
        question: "Which Celtic festival, marking the end of the harvest season, is believed to be the origin of Halloween?",
        answers: [
            {text: "Beltane", correct: false},
            {text: "Samhain", correct: true},
            {text: "Imbolc", correct: false},
            {text: "Lughnasadh", correct: false}
        ]
    },
    {
        question: "Which Jewish festival, also known as the 'Festival of Lights', is celebrated by lighting candles on a menorah?",
        answers: [
            {text: "Passover", correct: false},
            {text: "Rosh Hashanah", correct: false},
            {text: "Hanukkah", correct: true},
            {text: "Yom Kippur", correct: false}
        ]
    },
    {
        question: "What festival is celebrated in Thailand by releasing lanterns into the sky or floating them on rivers?",
        answers: [
            {text: "Songkran", correct: false},
            {text: "Loy Krathong", correct: true},
            {text: "Yi Peng", correct: false},
            {text: "Vesak", correct: false}
        ]
    },
    {
        question: "Which Scottish festival, celebrated on December 31st, is known for its traditional song 'Auld Lang Syne'?",
        answers: [
            {text: "Guy Fawkes Night", correct: false},
            {text: "Burns Night", correct: false},
            {text: "Hogmanay", correct: true},
            {text: "St. Andrew's Day", correct: false}
        ]
    },
    {
        question: "Which country celebrates Thanksgiving on the second Monday of October?",
        answers: [
            {text: "United States", correct: false},
            {text: "Canada", correct: true},
            {text: "Mexico", correct: false},
            {text: "Australia", correct: false}
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

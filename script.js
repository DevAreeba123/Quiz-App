const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language","High Tool Markup Language","Hyperlink Text Machine Language","Home Transfer Markup"],
        correct: 0
    },
    {
        question: "Which language is used to style a webpage?",
        options: ["Java","Python","CSS","PHP"],
        correct: 2
    },
    {
        question: "Which tag is used to display an image in HTML?",
        options: ["<src>","<image>","<img>","<pic>"],
        correct: 2
    },
    {
        question: "What is the correct way to write a comment in JavaScript?",
        options: ["<!-- comment -->","# comment","// comment","comment"],
        correct: 2
    },
    {
        question: "Which symbol is used to access an array index?",
        options: ["{ }","( )","[ ]","< >"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

// DOM Elements
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextbtn');
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restartbtn');

function loadQuestion() {
    const currentQuiz = quizQuestions[currentQuestion];
    questionElement.textContent = currentQuiz.question;
    optionsElement.innerHTML = '';

    currentQuiz.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.className = 'option';
        btn.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(btn);
    });

    nextButton.style.display = 'none';
}

function selectOption(selectedIndex) {
    const options = document.querySelectorAll('.option');
    const correctIndex = quizQuestions[currentQuestion].correct;

    options.forEach((option, index) => {
        option.disabled = true;
        if(index === correctIndex) option.style.backgroundColor = '#28a745';
        else if(index === selectedIndex && index !== correctIndex) option.style.backgroundColor = '#dc3545';
    });

    if(selectedIndex === correctIndex) score++;
    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
    currentQuestion++;
    if(currentQuestion < quizQuestions.length) loadQuestion();
    else showResult();
});

function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreElement.textContent = `${score} / ${quizQuestions.length}`;
}

restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    loadQuestion();
});

// Initialize
loadQuestion();
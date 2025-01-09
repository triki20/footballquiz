const questions = [
    {
        question: "מי זכה בגביע העולם 2022?",
        choices: ["ברזיל", "צרפת", "ארגנטינה", "פורטוגל"],
        correct: 2
    },
    {
        question: "כמה פעמים זכה ליאו מסי בכדור הזהב?",
        choices: ["6", "7", "8", "5"],
        correct: 1
    },
    {
        question: "באיזו שנה זכתה ישראל באליפות אסיה?",
        choices: ["1964", "1970", "1976", "1968"],
        correct: 0
    },
    {
        question: "מי הוא השחקן שהבקיע הכי הרבה שערים בהיסטוריה?",
        choices: ["פלה", "כריסטיאנו רונאלדו", "ליאו מסי", "רומריו"],
        correct: 1
    },
    {
        question: "איזו נבחרת זכתה הכי הרבה פעמים בגביע העולם?",
        choices: ["ארגנטינה", "גרמניה", "ברזיל", "איטליה"],
        correct: 2
    },
    {
        question: "באיזו שנה נוסד פיפ״א?",
        choices: ["1904", "1900", "1896", "1908"],
        correct: 0
    },
    {
        question: "מי הוא המאמן המצליח ביותר בליגת האלופות?",
        choices: ["פפ גווארדיולה", "קרלו אנצ׳לוטי", "זינדין זידאן", "סר אלכס פרגוסון"],
        correct: 1
    },
    {
        question: "איזה שחקן הבקיע הכי הרבה שערים במשחק אחד בליגת העל?",
        choices: ["אלון מזרחי", "זלטן אבוקסיס", "איל ברקוביץ׳", "ניסים אבוקסיס"],
        correct: 0
    },
    {
        question: "באיזו שנה נוסדה ליגת האלופות?",
        choices: ["1955", "1960", "1950", "1965"],
        correct: 0
    },
    {
        question: "מי הוא השוער עם הכי הרבה משחקים נקיים בהיסטוריה?",
        choices: ["איקר קסיאס", "ג׳יאנלואיג׳י בופון", "פטר צ׳ך", "מנואל נוייר"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedChoice = null;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const submitBtn = document.getElementById('submit');
const quizEl = document.getElementById('quiz');
const resultsEl = document.getElementById('results');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart');

function showQuestion() {
    const question = questions[currentQuestion];
    questionEl.innerHTML = `שאלה ${currentQuestion + 1}/10: ${question.question}`;
    
    choicesEl.innerHTML = '';
    question.choices.forEach((choice, index) => {
        const button = document.createElement('div');
        button.innerHTML = choice;
        button.classList.add('choice');
        button.addEventListener('click', () => selectChoice(index));
        choicesEl.appendChild(button);
    });
    
    selectedChoice = null;
    submitBtn.disabled = true;
}

function selectChoice(index) {
    const choices = document.querySelectorAll('.choice');
    choices.forEach(choice => choice.classList.remove('selected'));
    choices[index].classList.add('selected');
    selectedChoice = index;
    submitBtn.disabled = false;
}

function showResults() {
    quizEl.classList.add('hide');
    resultsEl.classList.remove('hide');
    scoreEl.innerHTML = `הציון שלך: ${score} מתוך 100`;
}

submitBtn.addEventListener('click', () => {
    const choices = document.querySelectorAll('.choice');
    const correctAnswer = questions[currentQuestion].correct;
    
    // הצג את התשובה הנכונה והשגויה
    choices[correctAnswer].classList.add('correct');
    if (selectedChoice !== correctAnswer) {
        choices[selectedChoice].classList.add('wrong');
    }
    
    if (selectedChoice === correctAnswer) {
        score += 10;
    }
    
    // המתן שנייה לפני המעבר לשאלה הבאה
    submitBtn.disabled = true;
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
});

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizEl.classList.remove('hide');
    resultsEl.classList.add('hide');
    showQuestion();
});

showQuestion(); 
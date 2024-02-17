window.onload = function () {
    show(0);  
}

let questions = [
    {
        id: 1,
        questions: "What is the full form of RAM?",
        answer: "Random Access Memory",
        options: [
            "Random Access Memory",
            "Randomely Access Memory",
            "Run Accept Memory",
            "None of these"
        ]
    },
    {
        id: 2,
        questions: "What is the full form of CPU?",
        answer: "Central Processing Unit",
        options: [
            "Central Program Unit",
            "Central Processing Unit",
            "Central Preload Unit",
            "None of these"
        ]
    },
    {
        id: 3,
        questions: "What is the full form of E-mail?",
        answer: "Electronic Mail",
        options: [
            "Electronic Mail",
            "Electric Mail",
            "Engine Mail",
            "None of these"
        ]
    },
];

function submitForm(e) {
    e.preventDefault();
    let name = document.forms["welcome_from"]["name"].value;

    sessionStorage.setItem("name", name);
    location.href = "quiz.html";
}

let questions_count = 0;
let point = 0;
let mytime;  // Добавлено определение времени

function next() {
    let user_answer = document.querySelector("li.option.active").innerHTML;

    // Проверка ответа пользователя
    if (user_answer == questions[questions_count].answer) {
        point += 10;
        sessionStorage.setItem("points", point);
    }

    if (questions_count == questions.length - 1) {
        sessionStorage.setItem("time", `${minutes} minutes and ${seconds} seconds`);
        clearInterval(mytime);
        location.href = "end.html";
        return;
    }

    questions_count++;
    show(questions_count);
}

function show(count) {
    let questionsElement = document.getElementById("questions");

    questionsElement.innerHTML = `
    <h2>Q${questions[count].id}. ${questions[count].questions}</h2>
    <ul class="option_group">
        <li class="option">${questions[count].options[0]}</li>
        <li class="option">${questions[count].options[1]}</li>
        <li class="option">${questions[count].options[2]}</li>
        <li class="option">${questions[count].options[3]}</li>
    </ul>
    <button class="btn-next" onclick="next()">Next Question</button>
    `;

    getoption();
}

function getoption() {
    let option = document.querySelectorAll("li.option");

    for (let i = 0; i < option.length; i++) {
        option[i].onclick = function () {
            for (let j = 0; j < option.length; j++) {
                if (option[j].classList.contains("active")) {
                    option[j].classList.remove("active");
                }
            }
            option[i].classList.add("active");
        };
    }
}

// Добавлено определение времени
let dt = new Date(new Date().setTime(0));
let time = dt.getTime();
let seconds = Math.floor((time % (1000 * 60)) / 1000);
let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

mytime = setInterval(function () {
    if (seconds < 59) {
        seconds++;
    } else {
        minutes++;
        seconds = 0;
    }
    let formatted_sec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    let formatted_min = minutes < 10 ? `0${minutes}` : `${minutes}`;
    document.querySelector(".time").innerHTML = `${formatted_min} : ${formatted_sec}`;
}, 1000);
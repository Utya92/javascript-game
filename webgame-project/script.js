'use strict';


let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let bestResult = 0;


const displayGetMessage = (selector, message) => {
    document.querySelector(selector).textContent = message
};
const displayGetValue = (selector) => {
    return document.querySelector(selector).value
};
const setCssBackground = (selector, param) => {
    document.querySelector(selector).style.backgroundColor = param
};
const setWidth = (selector, rem) => {
    document.querySelector(selector).style.width = rem
};

const blockButton = (isBlock) => {
    document.querySelector(".check").disabled = isBlock
}

/*логика кнопки Сначала*/
document.querySelector(".again").addEventListener('click', () => {
    secretNumber = Math.trunc(Math.random() * 20 + 1);
    score = 20;

    displayGetMessage(".question", "???");
    setWidth(".question", "25rem");
    displayGetMessage(".guess-message", "Начни угадывать!");
    displayGetMessage(".score", score);
    displayGetValue(".number-input", "");
    setCssBackground("body", "rgb(0, 0, 0)");
    blockButton(false);

});

/* логика ввода числа в форму  проверить*/
document.querySelector(".check")
    .addEventListener('click', () => {
        const guessingNumber = parseInt(displayGetValue(".number-input"));

        /*логика выйгрыша*/
        if (guessingNumber === secretNumber) {
            displayGetMessage(".guess-message", "Правильно!");
            setCssBackground("body", "rgb(9,250,21)");
            setWidth(".question", "50rem");
            displayGetMessage(".question", secretNumber);
            blockButton(true)
            /*логика функционала лучшего результата*/
            if (score > bestResult) {
                bestResult = score;
                displayGetMessage(".highscore", bestResult);
            }
        }


        /*порог ввода минимального значения*/
        if (score > 0) {
            /*если введенное число больше/меньше секретного*/
            if (guessingNumber !== secretNumber && !isNaN(guessingNumber)) {
                displayGetMessage(".guess-message",
                    guessingNumber > secretNumber ? "Слишком много!" : "Слишком мало!");
                score--;
                displayGetMessage(".score", score);
            }
        }

        /*случай ввода невалидного числа*/
        if (guessingNumber <= 0 || guessingNumber > 20 || isNaN(guessingNumber)) {
            displayGetMessage(".guess-message", "Невалидный ввод!");
        }

        /*логика пройгрыша*/
        if (score < 1) {
            console.log(displayGetValue(".number-input"))
            displayGetMessage(".guess-message", "You lose!");
            blockButton(true);
        }
    });




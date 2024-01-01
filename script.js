//variables from the HTML index
var screen = document.querySelector('#inputBox');
var numBtn = document.querySelectorAll('.btn');
var functionBtn = document.querySelectorAll('.function');

// Function to handle character computation for numeric and special characters
function computeCharacters(e) {
    let buttonContent = e.target.innerText;

    switch (buttonContent) {
        case 'x':
            buttonContent = '*';
            break;
        case '÷':
            buttonContent = '/';
            break;
        case 'π':
            buttonContent = 3.1416;
            break;
        case '(-)':
            buttonContent = '-';
            break;
        case 'x□':
            buttonContent = '**';
            break;
        case 'x-1':
            buttonContent = '**-1';
            break;
    }
    screen.value += buttonContent;
}

// Function to handle mathematical operations
function operationFunction(e) {
    let content = e.target.innerText;

    switch (content) {
        case 'sin':
            content = Math.sin(inputBox.value);
            break;
        case 'cos':
            content = Math.cos(inputBox.value);
            break;
        case 'tan':
            content = Math.tan(inputBox.value);
            break;
        case 'Abs':
            content = Math.abs(inputBox.value);
            break;
        case 'Ln':
            content = Math.log(inputBox.value);
            break;
        case 'log':
            content = Math.log10(inputBox.value);
            break;
        case 'x²':
            content = Math.pow(inputBox.value, 2);
            break;
        case 'x3':
            content = Math.pow(inputBox.value, 3);
            break;
        case '√':
            content = Math.sqrt(inputBox.value, 2);
            break;
    }
    screen.value = content;
}
// Event listeners for number buttons
for (const button of numBtn) {
    button.addEventListener('click', computeCharacters);
}
// Event listeners for operation buttons
for (const operation of functionBtn) {
    operation.addEventListener('click', operationFunction);
}

//onclick events
function copy() {
    navigator.clipboard.writeText(screen.value);
}
function paste() {

    navigator.clipboard.readText()
        .then(text => {

            screen.value = screen.value + text;

        })
        .catch(err => {
            console.error('Syntax Error', err);
        });

}
function result() {
    try {
        screen.value = eval(screen.value);
    } catch (error) {
        screen.value = 'Syntax Error';
    }
}
//Not implemented function for logarithm in any base
/*
function logBase(){
   
}
*/

function eng() {
    const exp = Math.floor(Math.log10(Math.abs(inputBox.value)));
    const mantissa = screen.value / Math.pow(10, exp);
    screen.value = mantissa + "E" + exp;
}

function sexagesimal() {
    screen.value = screen.value + "°" + "0' " + "0''"
}

//DOM Events
document.addEventListener('DOMContentLoaded', function () {
    const box = document.getElementById('inputBox');
    const powerBtn = document.getElementById('start');
    const backg = document.getElementsByClassName('container')[0];
    const effectsBtn = document.getElementById('config');
    const delBtn = document.getElementById('DE');

    // Power button click event to start operations
    powerBtn.addEventListener('click', () => {
        const greenScreen = `rgb(37, 218, 116)`;
        const isClicked = box.dataset.eventActivated === 'true';
        if (isClicked) {
            box.style.backgroundColor = greenScreen;
        } else {
            box.style.backgroundColor = "";
            box.value = "";
            backg.style.backgroundImage = "";

        }
        box.dataset.eventActivated = isClicked ? 'false' : 'true';
    });
    //Change background event
    effectsBtn.addEventListener('click', () => {
        const bg = "url('bg-src/Casio-bg.png')";
        const isClicked = backg.dataset.eventActivated === 'true';
        if (isClicked) {
            backg.style.backgroundImage = bg;
            backg.style.backgroundSize = "cover";
        } else {
            backg.style.backgroundImage = "";
        }
        backg.dataset.eventActivated = isClicked ? 'false' : 'true';
    });
    // Sound effects for button clicks
    numBtn.forEach(function (playButton) {
        playButton.addEventListener('click', function () {
            var audio;
            const rndNumber = Math.floor(Math.random() * 3 + 1) + 1;
            switch (rndNumber) {
                case 1:
                    audio = new Audio('SFX-src/btnKeys-SFX1.mp3');
                    break;
                case 2:
                    audio = new Audio('SFX-src/btnKeys-SFX2.mp3');
                    break;
                case 3:
                    audio = new Audio('SFX-src/btnKeys-SFX3.mp3');
                    break;
            }
            audio.play();
        });
    });
    functionBtn.forEach(function (play) {
        play.addEventListener('click', function () {
            var audio;
            audio = new Audio('SFX-src/btnKeys-SFX4.mp3');
            audio.play();
        });
    });
    // Delete button click event
    delBtn.addEventListener('click', function () {
        const startPosition = box.selectionStart;
        const endPosition = box.selectionEnd;

        if (startPosition < endPosition) {
            const textBeforeCaret = box.value.substring(0, startPosition);
            const textAfterCaret = box.value.substring(endPosition);
            box.value = textBeforeCaret + textAfterCaret;
            setSelectionRange(box, startPosition, startPosition);
        }
        else if (startPosition > 0) {
            const textBeforeCaret = box.value.substring(0, startPosition);
            const textAfterCaret = box.value.substring(startPosition);
            box.value = textBeforeCaret + textAfterCaret;
            setSelectionRange(box, startPosition - 1, startPosition - 1);

        }
        box.value = box.value.substr(0, box.value.length - 1);
    });
    // Move the caret position to the right and left

    function moveCaretRight() {

        const currentPosition = box.selectionStart;
        const newPosition = currentPosition + 1;

        setSelectionRange(box, newPosition, newPosition);
    }

    function moveCaretLeft() {

        const currentPosition = box.selectionStart;
        const newPosition = currentPosition - 1;

        setSelectionRange(box, newPosition, newPosition);
    }
    // Event listeners to move caret buttons
    const moveRightBtn = document.getElementById('right-btn');
    moveRightBtn.addEventListener('click', moveCaretRight);
    const moveLeftBtn = document.getElementById('left-btn');
    moveLeftBtn.addEventListener('click', moveCaretLeft);

    //Set the selection range for a given character position
    function setSelectionRange(input, start, end) {
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(start, end);
        } else if (input.createTextRange) {
            const range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    }
});



let buffer = '0';
let previousOperator;
let runningTotal = 0;

const screen = document.querySelector('.screen');


document.querySelector('.calc-buttons').addEventListener('click', (event) => {
    buttonClick(event.target.innerHTML);
});

buttonClick = value => {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

handleSymbol = value => {
    switch (value) {
        case 'C':
            buffer = '0';
            previousOperator = null;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = ' ' + runningTotal;
            runningTotal = 0;
            break;
        default:
            handleMath(value);
            break;

    }
}

handleNumber = value => {
    if (buffer === '0') {
        buffer = value;
    } else {
        buffer += value;
    }

}

handleMath = value => {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = '0';
}

flushOperation = intBuffer => {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '*') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }

}

rerender = () => {
    screen.innerText = buffer;
}
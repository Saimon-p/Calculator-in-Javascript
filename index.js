let buttonContainer = document.querySelector('.button-container');
let mainDisplay =  document.querySelector('.main-display');
let input = 0;
mainDisplay.textContent = input;
let iteration = 0;
let arr = [];
let dotFlag = false;


buttonContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('button-container') || e.target.classList.contains('buttons-row')) return;
    input = e.target.value;    
    operate(input);
})

function operate(input) {
    // if(input === arr[arr.length-1]) return;
    
    if('.+-∗÷'.includes(input)){
        if(input === arr[arr.length-1]) return;
    }

    if(input === 'C') {
        mainDisplay.textContent = 0;
        iteration = 0;
        input = 0;
        index = 0;
        dotFlag = false;
        arr = [];
        return;
    }

    if(input === 'back'){
        mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
        arr.pop(); 
        console.log(arr);
        if(mainDisplay.textContent === ''){
            mainDisplay.textContent = 0;
            iteration = 0;
        } 
        dotFlag = false;
        return;
    }

    if (iteration <= 0) {        
        iteration++;
        if(input === '-') {
            mainDisplay.textContent = '-';
            arr.push('-');
            return;
        }
        if(input === '.') {
            mainDisplay.textContent += '.';
            arr.push('0');
            arr.push('.')
            dotFlag = true;
            return;
        }
        if('123456789'.includes(input)){            
            mainDisplay.textContent = input;            
            arr.push(input);
            return;
        }
        if(input === '0') {
            iteration -= 1;
            return;
        }   
    }
    
    if(input === '.' && dotFlag === true) return;
    mainDisplay.textContent += input;
    arr = mainDisplay.textContent.split("");
    console.log(arr);

    switch (input) {
        case '+':
            dotFlag = false
            if('.-∗÷'.includes(arr[arr.length-2])) {
                arr.pop();
                arr[arr.length-1] = input;
            }
            break;
        case '-':
            dotFlag = false
            if ('.+∗÷'.includes(arr[arr.length-2])) {
                arr.pop();
                arr[arr.length-1] = input;
            }
            break;
        case '∗':
            dotFlag = false
            if ('.+-÷'.includes(arr[arr.length-2])) {
                arr.pop();
                arr[arr.length-1] = input;
            }
            break;
        case '÷':
            dotFlag = false;
            if ('.+-∗'.includes(arr[arr.length-2])) {
                arr.pop();
                arr[arr.length-1] = input;
            }
            break;
        case '.':
            console.log('uh');
            dotFlag = true;
            if ('+-∗÷'.includes(arr[arr.length-2])) {
                dotFlag = false;
                arr.pop();
            }
            break;
    }
    calculate(arr);
    mainDisplay.textContent = arr.join('');
}

function calculate(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}

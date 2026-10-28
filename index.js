let buttonContainer = document.querySelector('.button-container');
let mainDisplay =  document.querySelector('.main-display');
let bottomDisplay = document.querySelector('.bottom-display');
let input = 0;
mainDisplay.textContent = input;
let iteration = 0;
let arr = [];
let dotFlag = false;
let equalsFlag = false;
let audio = new Audio('raaaaaah.mp3');

window.addEventListener('keydown', (e) => {
    input = '0';
    if(e.key === 'Shift') return;
    let key = e.key.toLowerCase();
    if ('0123456789cg.+-*/=backspace'.includes(key)) {
        if('0123456789c.+-='.includes(key)) {input = key}
        else if('g*//backspace'.includes(key)) {
            switch (key) {
                case '*': 
                    input = '∗';
                    break;
                case '/':
                    input = '÷';
                    break;
                case 'backspace':
                    input = 'back';
                    break;
                case 'g':
                    window.open('https://github.com/Saimon-p/Calculator-in-Javascript');
                    break;
            }
        }    
    }    
    operate(input);
})

buttonContainer.addEventListener('click', (e) => {
    if(e.target.localName === 'a') return;
    if(e.target.classList.contains('button-container') || e.target.classList.contains('buttons-row')) return;
    input = e.target.value;    
    operate(input);
})

function operate(input) {    
    if('.+-∗÷='.includes(input)){
        if(input === arr[arr.length-1]) return;
    }

    if(input === 'c') {
        mainDisplay.classList.remove('active');
        bottomDisplay.classList.remove('active');
        mainDisplay.textContent = '0';
        bottomDisplay.textContent = '';
        iteration = 0;
        input = 0;
        dotFlag = false;
        equalsFlag = false;
        arr = [];
        return;
    }

    if(input === 'back'){
        mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
        arr.pop(); 
        console.log(arr);
        if(mainDisplay.textContent === ''){
            mainDisplay.textContent = 0;
            iteration = 0
        } 
        bottomDisplay.textContent = '';
        calculate(arr);
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
        if(input === '0' || input === '=') {
            iteration -= 1;
            return;
        }
    }
    
    if(input === '.' && dotFlag === true) return;
    if (input === '='){
        equalsFlag = true;
       arr.push(input); 
       calculate(arr);
       return;
    };
    if(equalsFlag){
        mainDisplay.textContent = bottomDisplay.textContent;
        mainDisplay.classList.remove('active');
        bottomDisplay.classList.remove('active');
        equalsFlag = false;
    }
    mainDisplay.textContent += input;
    arr = mainDisplay.textContent.split("");

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
    let temp = '';
    let iterator = 0;
    let negative = false;

    let organisedArray = [];
    arr.forEach((element) => {
        if ('0123456789.'.includes(element)) {
            temp += element;
            organisedArray[iterator] = temp;
        } else {
            if(arr[0] === '-' && !negative){
                temp+= element;
                negative = true;
                return;
            }
            organisedArray.push(element);
            temp = '';
            iterator+=2;
        }
    });

    console.log(organisedArray);
    

    if (organisedArray.some((el) => '='.includes(el))) {
        bottomDisplay.textContent = organisedArray[0];
        mainDisplay.classList.add('active');
        bottomDisplay.classList.add('active');
        organisedArray.splice(organisedArray.lastIndexOf('='), 1);
    }

    let leftOperand = '';
    let rigthOperand = '';
    let operationIndex = '';
    let result = 0;

    while (organisedArray.some((el) =>'+-∗÷'.includes(el))) {
        if(organisedArray.lastIndexOf('÷') !== -1){
            operationIndex = organisedArray.lastIndexOf('÷');
        } else if (organisedArray.lastIndexOf('∗') !== -1){
            operationIndex = organisedArray.lastIndexOf('∗')
        } else if (organisedArray.lastIndexOf('-') !== -1){
            operationIndex = organisedArray.lastIndexOf('-')
        } else if (organisedArray.lastIndexOf('+') !== -1){
            operationIndex = organisedArray.lastIndexOf('+')
        } 
 
        leftOperand = organisedArray[operationIndex-1];
        rigthOperand = organisedArray[operationIndex+1];

        if(rigthOperand !== undefined){
            switch (organisedArray[operationIndex]) {
                case '+':
                    result = +leftOperand + +rigthOperand;
                    break;
                case '-':
                    result = +leftOperand - +rigthOperand;
                    break;
                case '÷':
                if(rigthOperand === '0') {audio.play(); break;};
                    result = +leftOperand / +rigthOperand;
                    break;
                case '∗':
                    result = +leftOperand * +rigthOperand;
                    break;
            }
            
            organisedArray.splice(operationIndex, 2);
            organisedArray[operationIndex-1] = result;
            leftOperand = 0;
            rigthOperand = 0
            bottomDisplay.textContent = organisedArray[0];  
        } else{  
            break;
        }
    }
}

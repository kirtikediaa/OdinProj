const calcKeys = document.querySelector('.all-buttons');
const userInput = document.querySelector('#user-input');
const calculator = document.querySelector('.calculator');
const displayResult = document.querySelector('#result');
let isEqualsPressed = false;
let equation = 0; 
let checkForDecimal = ''; 

calcKeys.addEventListener('click', (event) => {

	const key = event.target;
	const keyValue = key.textContent;
	let inputDisplay = userInput.textContent;

	const { type } = key.dataset;
	const { previousKeyType } = calculator.dataset;
		
	
	if(type === 'number' && !isEqualsPressed) {
		
		if (inputDisplay === '0') {
			userInput.textContent = (previousKeyType === 'operator') ? inputDisplay + keyValue : keyValue;
			equation = (previousKeyType === 'operator') ? equation + key.value : key.value;
			checkForDecimal = checkForDecimal + keyValue;
		}else {
			
			if (checkForDecimal.length >= 19) {
				let replaceNumber = checkForDecimal;
				checkForDecimal = Number(checkForDecimal).toExponential(2);
				userInput.textContent = inputDisplay.replace(replaceNumber, checkForDecimal);
			}
            else {				
				userInput.textContent = userInput.textContent.includes('N') ? 'NaN' : 
										userInput.textContent.includes('I') ? 'Infinity' : inputDisplay + keyValue;
				equation = equation + key.value;
				checkForDecimal = checkForDecimal + keyValue;
			}
		}
	}

		if (type === 'operator' && previousKeyType !== 'operator'
		&& !isEqualsPressed && !inputDisplay.includes('Infinity')) {
		checkForDecimal = '';
		userInput.textContent = inputDisplay + ' ' + keyValue + ' ';
		equation = equation + ' ' + key.value + ' ';
	}

	
	if (type === 'decimal' && (previousKeyType === 'number' || inputDisplay === '0')
		&& !isEqualsPressed && !inputDisplay.includes('Infinity')) {
		if (!checkForDecimal.includes('.')) {
			userInput.textContent = inputDisplay + keyValue;
			equation = equation + key.value;
			checkForDecimal = checkForDecimal + keyValue;
		}
        else
        userInput.textContent = "Error";
	}

	if ((type === 'backspace' || type === 'reset') && inputDisplay !== '0') {
		if (type === 'backspace' && !isEqualsPressed) {
			userInput.textContent = inputDisplay.substring(0, inputDisplay.length - 1);
			equation = equation.substring(0, equation.length - 1);
			checkForDecimal = checkForDecimal.substring(0, checkForDecimal.length - 1);
		} else {
			inputDisplay = '0';
			userInput.textContent = inputDisplay;
			displayResult.innerHTML = '&nbsp;';
			isEqualsPressed = false;
			equation = '';
			checkForDecimal = '';
		}

	}

	if (type === 'equal') {
    	
	    isEqualsPressed = true;
	    const finalResult = handleEquation(equation);
	    
	    if ( finalResult === 0) {
	    	displayResult.textContent = (!Number.isInteger(finalResult)) ? finalResult.toFixed(2) : 
	    								(finalResult.toString().length >= 16) ? finalResult.toExponential(2) : finalResult ;
	    } else {
	    	displayResult.textContent = 'Math Error';
	    }
	    
  }

	calculator.dataset.previousKeyType = type;
})


function calculate(firstNumber, operator, secondNumber) {

	firstNumber = Number(firstNumber);
	secondNumber = Number(secondNumber);

    if ( operator === '+') return firstNumber + secondNumber;
    if ( operator === '-') return firstNumber - secondNumber;
    if ( operator === 'x') return firstNumber * secondNumber;
    if ( operator === '/') return firstNumber / secondNumber;
    if ( operator === '%') return firstNumber % secondNumber;
}

function handleEquation(equation) {

	equation = equation.split(" ");
	const operators = ['/', 'x', '%', '+', '-'];
	let firstNumber;
	let secondNumber;
	let operator;
	let operatorIndex;
	let result;

	
	for (var i = 0; i < operators.length; i++) {
		while (equation.includes(operators[i])) {
			operatorIndex = equation.findIndex(item => item === operators[i]);
			firstNumber = equation[operatorIndex-1];
			operator = equation[operatorIndex];
			secondNumber = equation[operatorIndex+1];
			result = calculate(firstNumber, operator, secondNumber);
			equation.splice(operatorIndex - 1, 3, result);
		}
	}

	return result;
}


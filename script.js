/* APPLICATION CONSTANTS */
const calculatorResult = document.querySelector('.calculator-input');
const calcArea = document.querySelector('.grid-wrapper');

let currentCalcVal = '';


/* READ INPUT */

/* MODIFY INPUT */

function setCurrentResultVal(val) {
	if (currentCalcVal === 0){
		currentCalcVal = val;
		calculatorResult.value = currentCalcVal;
	} else {
		currentCalcVal += val;
		calculatorResult.value = currentCalcVal;
	}
}

function resetCurrentResultVal(){
	currentCalcVal = 0;
	calculatorResult.value = 0;
}

function addToCalcInput(evt) {
	if(evt.target.textContent === 'AC'){
		return resetCurrentResultVal();
	} else if (evt.target.textContent === '=') {
		return calculateVal(calculatorResult.value);
	} else if (evt.target.className === 'operator') {
		return setCurrentResultVal(' ' + evt.target.textContent + ' ');
	} else {
		return setCurrentResultVal(evt.target.textContent);
	}
}

/* CALCULATE INPUT */

function calculateVal(targetVal) {
	let valArr = targetVal.split(' ');
	console.log(valArr);
}

/* HELPER FUNCTIONS */


/* BROWSER EVENTS */

calcArea.addEventListener('click', function(evt){
	if(evt.target.nodeName === "BUTTON"){
		return addToCalcInput(evt);
	}
});

calcArea.addEventListener('touchstart', function(evt){
	if(evt.nodeName === 'BUTTON'){
		return addToCalcInput(evt);
	}
});

calcArea.addEventListener('keydown', function(evt){
	if(evt.target === 13){
		return addToCalcInput(evt);
	}
});

calculatorResult.addEventListener('change', function(evt){
	currentCalcVal = evt.target.value;
});

// todos
// 1 - ensure really consistent ui input 
// 1a - can we remove the input tag and make it look like an area someone would expect output?
// 1b - there are alot of data validation problems that would be fixed by doing that
// 2 - can we construct a binary tree where the operands sit between the numbers they are operating on?
// 2a - or we can convert the string input to a valid expression that oututs a number
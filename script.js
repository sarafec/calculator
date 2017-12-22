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
// 1 - add space after closing paren
// 2 - add helper method to decide if value is a operator or a number
// 3 - create tree-like data structure to traverse input array
// 4 - calculate input from traversing tree-like data structure
// 5 - change input to reflect calculation
// 6 - add a testing library + assertions

// question
// 1 - how do you transform a string form operator into an actual operator
//	   we could always create a switch statement, but is there a better way?
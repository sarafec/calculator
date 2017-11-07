/* PRIORITY QUEUE IMPLEMENTATION */
function Queue() {
	this.dataStore = [];
	this.enqueue = enqueue;
	this.dequeue = dequeue;
	this.front = front;
	this.back = back;
	this.toString = toString;
	this.isEmpty = isEmpty;
}

function enqueue(elem) {
	this.dataStore.push(elem);
}

function dequeue() {
	let entry = 0;
	for (let i = 0; i < this.dataStore.length; i++) {
		if (this.dataStore[i].priority < this.dataStore[entry].code){
			entry = i;
		}
	}
	return this.dataStore.splice(entry, 1);
}

function front() {
	return this.dataStore[0];
}

function back() {
	return this.dataStore[this.dataStore.length - 1];
}

function toString() {
	let formattedStr = '';
	for (let i = 0; i < this.dataStore.length; i++) {
		formattedStr += this.dataStore[i].priority + ' value: ' + this.dataStore[i].value + '\n';
	}
	return formattedStr;
}

function isEmpty() {
	if(this.dataStore.length === 0) {
		return true;
	} else {
		return false;
	}
}


/* HELPER FUNCTIONS */
function isWhiteSpace(ch) {
	//return tab key, space, or no break space
	return (ch === 'u0009') || (ch === '') || (ch === 'u00A0');
}

function isLetter(ch) {
	return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
}

function isDecimalDigit(ch) {
	return (ch >= '0') && (ch <= '9');
}


/* BROWSER EVENTS */
let calculatorResult = document.querySelector('.calculator-input');
let calcArea = document.querySelector('.grid-wrapper');

let currentCalcVal = '';


function setCurrentResultVal(val) {
	if (currentCalcVal === 0){
		currentCalcVal = val;
		calculatorResult.value = currentCalcVal;
	} else {
		currentCalcVal += val;
		calculatorResult.value = currentCalcVal;
	}
}

function getCurrentResultVal(val) {
	return currentCalcVal;
}

function resetCurrentResultVal(){
	currentCalcVal = 0;
	calculatorResult.value = 0;
}

function addToCalcInput(evt) {
	if(evt.target.textContent === 'AC'){
		return resetCurrentResultVal();
	} else if (evt.target.textContent === '=') {
		return readExprModule.read(calculatorResult.value);
	} else if (evt.target.className === 'operator') {
		return setCurrentResultVal(' ' + evt.target.textContent + ' ');
	} else {
		return setCurrentResultVal(evt.target.textContent);
	}
}

//input events
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
	//can we move this out to its own function?
	currentCalcVal = evt.target.value;
});

// todo
// 1 - add identifiers into priority queue
// 2 - evaluate from priority queue based on precedence
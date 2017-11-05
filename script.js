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

/* LEXER IMPLEMENTATION */
/* ReadExpr Module */
//analyze expression
//load into queue

let readExprModule = function() {
	//private functions
	function readInput(input) {
		console.log(input);
	}

	//public methods
	return {
		read: readInput
	};
}();

/* PARSER IMPLEMENTATION */
/* EvaluateExpr Module */
//evaluate queue with a running total


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

//creates an object for a given token type and value
function createToken(priority, value) {
	return {
		priority: priority,
		value: value
	};
}

//advance to the next chracter
function getNextChar() {
	let ch = 'x00',
		i = index;
	if (i < length) {
		ch = expression.charAt(i);
		index += 1;
	}
	return ch;
}

//look at next character without moving forward
function peekNextChar(){
	let i = index;
	return (( i < length) ? expression.charAt(i) : 'x00');
}

//skip whitespace
function skipSpaces(){
	let ch;

	while (index < length){
		ch = peekNextChar();
		if (!isWhiteSpace(ch)) {
			break;
		}
		getNextChar();
	}
}

function scanOperator() {
	let ch = peekNextChar();
	if ('+-*/()%='.indexOf(ch) >= 0) {
		return createToken('Operator', getNextChar());
	}
	return undefined;
}

//decide whether a series of characters is an identifier
function isIdentifierStart(ch) {
	return (ch === '_') || isLetter(ch);
}

function isIdentifierPart(ch) {
	return isIdentifierStart(ch) || isDecimalDigit(ch);
}

function scanIdentifier() {
	let ch, id;
	ch = peekNextChar();
	if (!isIdentifierStart(ch)) {
		return unefined;
	}

	id = getNextChar();
	while(true) {
		ch = peekNextChar();
		if(!isIdentifierPart(ch)) {
			break;
		}
		id += getNextChar();
	}
	return createToken('Identifier', id);
}

//return a token representing a number
//return undefined if no number is recognized
function scanNumber() {
	let ch;
	//detect if the character is a number
	ch = peekNextChar();
	if (!isDecimalDigit(ch) && (ch !== '.')) {
		return undefined;
	}
	number = '';
	if (ch !== '.'){
		number = getNextChar();
		while(true) {
			ch = peekNextChar();
			if(!isDecimalDigit(ch)) {
				break;
			}
			number += getNextChar();
		}
	//support for floating point numbers
	} else if(ch === '.'){
		number += getNextChar();
		while (true){
			ch = peekNextChar();
			if (!isDecimalDigit(ch)) {
				break;
			}
			number += getNextChar();
		}
	}
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
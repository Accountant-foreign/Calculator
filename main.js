var firstOperand="";//For LHS operand
var secondOperand="";//For RHS operand
var controller=0;//Controller to assign values to first or second operand
var op=""//Store the current operation value;
var numberOfOperators=0;//If the number of operators exceed more than one, we must compute the previous two elements
var displayValue="";//Value that is eventually computed
var numberOfDecimals=0;//To make sure a maximum of one decimal can be entered

document.getElementById('clear').onclick=clear;
document.getElementById('equals').onclick=equals;
document.getElementById('decimal').onclick=decimal;
Array.from(document.getElementsByClassName('btn')).forEach(element => {//Set the attribute of each element of class 'btn'
    element.setAttribute('onclick', 'compute(this)');
});



/**
 * To compute operation between two numbers
 * @param {*} a This takes the firstOperand
 * @param {*} operator The operator used to compute from both sides
 * @param {*} b This takes secondOperand
 * @returns computed operation
 */
function operate(a, operator, b){
    if(operator==="+"){
        return (+a)+(+b)
    } 
    else if(operator==="-"){
        return a-b;
    }
    else if(operator==="x"){
        return a*b;
    }
    else if(operator==="÷"){
        if(isFinite(a/b)){
            return a/b;
        }
        document.getElementById('snark').textContent="No";
        return;
    }
    else if(operator==="%"){
        return a%b;
    }
    else {
        return;
    }
}

/**
 * 
 * @param {*} value This takes the textContent of the current element
 */
function compute(value){
    value=value.textContent;
    //If condition to check if the value is a number or not
    if(Number.isInteger(+value)){
        document.getElementById('operations').textContent+=value;
        if(controller==0){//If it is 0, it means that the first operator has not been introduced
            firstOperand+=value;
            document.getElementById('number-op').textContent=firstOperand;
        } else {//The second operator has been introduced
            secondOperand+=value;
            document.getElementById('number-op').textContent=secondOperand;
        }
    } else {
        if(numberOfOperators==1 && secondOperand==""){//RHS operand not entered;
            return;
        }
        document.getElementById('operations').textContent+=value;
        controller++;//This means that we no longer have to assign values to the rhs operand; It shall always be there for us;
        numberOfDecimals=0;
        if(numberOfOperators==1){
            displayValue=operate(firstOperand, op, secondOperand);
            firstOperand=displayValue;
            document.getElementById('operations').textContent=displayValue+op;
            document.getElementById('number-op').textContent=displayValue;
            numberOfOperators=0;
            secondOperand="";
            numberOfDecimals=0;
        }
        op=value;
        numberOfOperators=1;//We have already completed one operation and the stack must be full
    }
}

/**
 * Compute the operation between first and second operands.
 * @returns Undefined if second operand is not there
 */
function equals(){
    if(numberOfOperators==1 && secondOperand==""){//RHS operand not entered;
        return;
    }
    if(numberOfOperators==0 && secondOperand==""){
        document.getElementById('operations').textContent=firstOperand;
        document.getElementById('number-op').textContent=firstOperand;
        return;
    }
    displayValue=operate(firstOperand, op, secondOperand);
    firstOperand=displayValue;
    document.getElementById('operations').textContent=displayValue;
    document.getElementById('number-op').textContent=displayValue;
    secondOperand="";
    op="";
    numberOfOperators=0;
}

function decimal(){
    if(numberOfDecimals==0){
        if(numberOfOperators==0){
            firstOperand=firstOperand+"";
            if(!(firstOperand.indexOf('.'))===-1){
                return;
            }
            firstOperand+="."
            document.getElementById('number-op').textContent=firstOperand;
            document.getElementById('operations').textContent+=".";
        } else {
            secondOperand+=".";
            document.getElementById('number-op').textContent=secondOperand;
            document.getElementById('operations').textContent+=".";
        }
    }
    numberOfDecimals++;
}

/**
 * Function to completely re-start the calculator and its operations
 */
function clear(){
    document.getElementById('operations').textContent="\u00A0";
    document.getElementById('number-op').textContent="0";
    firstOperand="";//For LHS operand
    secondOperand="";//For RHS operand
    controller=0;//Controller to assign values to first or second operand
    op=""//Store the current operation value;
    numberOfOperators=0;//If the number of operators exceed more than one, we must compute the previous two elements
    displayValue="";//Value that is eventually computed
    numberOfDecimals=0;//To make sure a maximum of one decimal can be entered
    document.getElementById('snark').textContent="";
}
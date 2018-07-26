const keys = document.querySelector('.calculator_keys')
const display = document.querySelector('.calculator_display')
var logArea = document.getElementById('log_area')
var initialState = false
var tString = ""
var tArray = []

Array.prototype.peek = function() {
  return this[this.length - 1]
}

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent

    if (display.textContent === "0") {
      display.textContent = ""
    }

    if (initialState === true) {
      display.textContent = ""
      initialState = false
    }

    if (!action) {
      display.textContent += keyContent
      tString += keyContent
    }

    if (action === "(" || action === ")") {
      if (tString.length !== 0) {
        tArray.push(parseFloat(tString), keyContent)
        tString = ""
      } else {
        tArray.push(keyContent)
      }
      display.textContent += keyContent
    }

    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
      if (tString.length !== 0) {
        tArray.push(parseFloat(tString))
      }
      if (tArray.length === 0 || isNaN(tArray.peek()) === true && tArray.peek() !== ")") {
        return
      } else {
        tArray.push(keyContent)
        display.textContent += keyContent
        tString = ""
      }
    }

    if (action === 'decimal') {
      if (tString[tString.length - 1] === '.') {
        return
      }
      tString += keyContent
      display.textContent += keyContent
    }

    if (action === 'calculate') {
      if (tArray.length === 0) {
        return
      }
      if (tString.length !== 0) {
        tArray.push(parseFloat(tString))
      }
      var postfix = infixToPostfix(tArray)
      var result = evalPostfix(postfix)
      var displayForLog = " → " + display.textContent + " = " + result + "<br/>"
      logArea.innerHTML += displayForLog
      display.textContent = result
      initialState = true
      tString = ""
      tArray = []
    }

    if (action === 'all_clear') {
      display.textContent = ""
      tString = ""
      tArray = []
    }

    if (action === 'log_clear') {
      logArea.innerHTML = ""
      display.textContent = ""
    }

    //convert infix expression to postfix expression
    function infixToPostfix(exp){
      var stack = []
      var output = []
      var precedenceMap = {
        "+": 1,
        "-": 1,
        "÷": 2,
        "×": 2
      }

      function precedenceOf(val) {
        return precedenceMap[val]
      }

      for (var i = 0; i < exp.length; i++) {
        if (isNaN(exp[i]) === false) {
          output.push(exp[i])
        }

        if (exp[i] === "(") {
          stack.push(exp[i])
        }

        if (exp[i] === ")") {
          while (stack.length !== 0 && stack.peek() !== "(") {
            output.push(stack.pop())
          }
          stack.pop()
        }

        if (exp[i] === "×" || exp[i] === "÷" || exp[i] === "+" || exp[i] === "-") {
          if (stack.length === 0 || stack.peek() === "(") {
            stack.push(exp[i])
          } else {
            while (stack.length !== 0 && stack.peek() !== "(" && precedenceOf(exp[i]) <= precedenceOf(stack.peek())) {
              output.push(stack.pop())
            }
            stack.push(exp[i])
          }
        }
      }

      while (stack.length !== 0) {
        output.push(stack.pop())
      }
      return output
    }

    //evaluate postfix expression
    function evalPostfix(val) {
      var stack = []
      var output = ""
      //if operand is found
      for (var i = 0; i < val.length; i++) {
        if (isNaN(val[i]) === false) {
          stack.push(val[i])
        } else { //if operator is found
          var secondNum = stack.pop()
          var firstNum = stack.pop()
          switch (val[i]) {
            case '+': stack.push(firstNum + secondNum)
                      break;
            case '-': stack.push(firstNum - secondNum)
                      break;
            case '×': stack.push(firstNum * secondNum)
                      break;
            case '÷': stack.push(firstNum / secondNum)
                      break;
          }
        }
      }
      output = stack.pop()
      return output
    }
  }
})

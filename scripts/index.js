const keys = document.querySelector('.calculator_keys')
const display = document.querySelector('.calculator_display')
var displayForEval = ""
var logArea = document.getElementById('log_area')
var result = 0
var initialState = false
var duplicateOperator = false

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
     displayForEval += keyContent
    }

    if (action === 'add' || action === 'subtract') {
     display.textContent += keyContent
     displayForEval += keyContent
    }

    if (action === 'multiply') {
     display.textContent += keyContent
     displayForEval += "*"
    }

    if (action === 'divide') {
     display.textContent += keyContent
     displayForEval += "/"
    }

    if (action === 'decimal') {
     display.textContent += keyContent
     displayForEval += keyContent
    }

    if (action === 'calculate') {
     result = eval(displayForEval)
     logArea.innerHTML += display.textContent + "=" + result + "<br/>"
     display.textContent = result
     initialState = true
     displayForEval = ""
    }

    if (action === 'clear') {
     display.textContent = "0"
     displayForEval = ""
    }

    if (action === 'log_clear') {
     logArea.innerHTML = ""
     display.textContent = "0"
    }
  }
})

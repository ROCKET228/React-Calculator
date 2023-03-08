export function evaluate({currentOperand, previousOperand, operation}) {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if(isNaN(prev) || isNaN(current)) return ""
    let computation = ""
    switch (operation) {
        case "+":
            computation = prev + current
            return computation.toString()
        case "-":
            computation = prev - current
            return computation.toString()
        case "*":
            computation = prev * current
            return computation.toString()
        case "/":
            computation = prev / current
            return computation.toString()
        default:
            return computation.toString()
    }
}
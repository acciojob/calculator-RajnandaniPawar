//your code here
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.id;

            if (id.startsWith('block')) {
                currentInput += button.innerText;
            } else if (id === 'dot') {
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                }
            } else if (id === 'clr') {
                currentInput = '';
                previousInput = '';
                operator = '';
            } else if (id === 'plus' || id === 'minus' || id === 'multiply' || id === 'divide') {
                if (currentInput === '' && operator !== '') {
                    operator = button.innerText;
                } else {
                    previousInput = currentInput;
                    currentInput = '';
                    operator = button.innerText;
                }
            } else if (id === 'ans') {
                if (operator && currentInput) {
                    previousInput = evaluate(previousInput, currentInput, operator);
                    currentInput = previousInput.toString();
                    operator = '';
                }
            }

            input.value = currentInput;
        });
    });

    function evaluate(prev, curr, op) {
        const a = parseFloat(prev);
        const b = parseFloat(curr);
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b === 0) return a === 0 ? 'NaN' : 'Infinity';
                return a / b;
            default:
                return curr;
        }
    }
});

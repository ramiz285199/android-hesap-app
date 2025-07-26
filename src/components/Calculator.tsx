import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CalculatorProps {}

export const Calculator: React.FC<CalculatorProps> = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const toggleSign = () => {
    if (display !== '0') {
      setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-background rounded-3xl shadow-2xl overflow-hidden">
      {/* Display */}
      <div className="bg-calc-display shadow-display p-8 pb-6">
        <div className="text-right">
          <div className="text-calc-display-text text-5xl font-light tracking-wide leading-tight overflow-hidden">
            {display.length > 9 ? display.slice(0, 9) + '...' : display}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="p-4 grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-calc-function text-calc-function-text hover:bg-calc-function/80 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-xl font-medium"
          onClick={clear}
        >
          AC
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-calc-function text-calc-function-text hover:bg-calc-function/80 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-xl font-medium"
          onClick={toggleSign}
        >
          ±
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-calc-function text-calc-function-text hover:bg-calc-function/80 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-xl font-medium"
          onClick={percentage}
        >
          %
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-gradient-operator text-calc-operator-text hover:opacity-80 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-2xl font-medium"
          onClick={() => performOperation('÷')}
        >
          ÷
        </Button>

        {/* Row 2 */}
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-gradient-number text-calc-number-text hover:opacity-90 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-2xl font-medium"
          onClick={() => inputNumber('7')}
        >
          7
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-gradient-number text-calc-number-text hover:opacity-90 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-2xl font-medium"
          onClick={() => inputNumber('8')}
        >
          8
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-gradient-number text-calc-number-text hover:opacity-90 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-2xl font-medium"
          onClick={() => inputNumber('9')}
        >
          9
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-gradient-operator text-calc-operator-text hover:opacity-80 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-2xl font-medium"
          onClick={() => performOperation('×')}
        >
          ×
        </Button>

        {/* Row 3 */}
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-gradient-number text-calc-number-text hover:opacity-90 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-2xl font-medium"
          onClick={() => inputNumber('4')}
        >
          4
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-gradient-number text-calc-number-text hover:opacity-90 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-2xl font-medium"
          onClick={() => inputNumber('5')}
        >
          5
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-gradient-number text-calc-number-text hover:opacity-90 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-2xl font-medium"
          onClick={() => inputNumber('6')}
        >
          6
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-gradient-operator text-calc-operator-text hover:opacity-80 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-2xl font-medium"
          onClick={() => performOperation('-')}
        >
          −
        </Button>

        {/* Row 4 */}
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-gradient-number text-calc-number-text hover:opacity-90 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-2xl font-medium"
          onClick={() => inputNumber('1')}
        >
          1
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-gradient-number text-calc-number-text hover:opacity-90 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-2xl font-medium"
          onClick={() => inputNumber('2')}
        >
          2
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-gradient-number text-calc-number-text hover:opacity-90 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-2xl font-medium"
          onClick={() => inputNumber('3')}
        >
          3
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-gradient-operator text-calc-operator-text hover:opacity-80 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-2xl font-medium"
          onClick={() => performOperation('+')}
        >
          +
        </Button>

        {/* Row 5 */}
        <Button
          variant="ghost"
          size="lg"
          className="h-16 col-span-2 bg-gradient-number text-calc-number-text hover:opacity-90 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-2xl font-medium"
          onClick={() => inputNumber('0')}
        >
          0
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-gradient-number text-calc-number-text hover:opacity-90 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-2xl font-medium"
          onClick={inputDecimal}
        >
          .
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="h-16 bg-gradient-primary text-calc-equals-text hover:opacity-80 rounded-2xl shadow-button transition-all duration-200 active:scale-95 text-2xl font-medium"
          onClick={performEquals}
        >
          =
        </Button>
      </div>
    </div>
  );
};
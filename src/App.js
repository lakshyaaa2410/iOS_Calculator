import React, { useState } from "react";
import "./App.css";
import Display from "./components/Display";
import Keypad from "./components/Keypad";
import ConfettiExplosion from "react-confetti-explosion";

const App = () => {
	// State hooks to manage various aspects of the calculator
	const [expression, setExpression] = useState(""); // Current expression to evaluate
	const [result, setResult] = useState(""); // Result of the expression evaluation
	const [showConfetti, setShowConfetti] = useState(false); // Flag to show confetti animation
	const [numberEntered, setNumberEntered] = useState(false); // Flag indicating if a number has been entered
	const [previousResult, setPreviousResult] = useState(""); // Store previous result
	const [usingPreviousResult, setUsingPreviousResult] = useState(false); // Flag indicating if using previous result
	const [confettiTriggered, setConfettiTriggered] = useState(false); // Flag to track if confetti has been triggered

	// Function to clear all calculator states
	const clearCalculator = () => {
		setExpression("");
		setResult("");
		setShowConfetti(false);
		setNumberEntered(false);
		setPreviousResult("");
		setUsingPreviousResult(false);
		setConfettiTriggered(false);
	};

	// Function to evaluate the current expression
	const calculateResult = () => {
		try {
			const evalResult = eval(expression); // Evaluate the expression (caution: potential security risk)
			setResult(evalResult.toString()); // Update the result state with evaluated result

			// Trigger confetti if result includes both "3" and "4" and confetti hasn't been triggered yet
			if (
				evalResult.toString().includes("3") &&
				evalResult.toString().includes("4") &&
				!confettiTriggered
			) {
				setShowConfetti(true); // Show confetti animation
				// Hide confetti after 3 seconds and set confettiTriggered flag
				setTimeout(() => {
					setShowConfetti(false);
					setConfettiTriggered(true);
				}, 3000);
			}

			setPreviousResult(evalResult.toString()); // Store the evaluated result as previous result
			setUsingPreviousResult(true); // Set flag to indicate using previous result
			setNumberEntered(false); // Reset numberEntered flag
		} catch (error) {
			setResult("Error"); // Display "Error" in case of invalid expression
			setShowConfetti(false); // Hide confetti animation
		}
	};

	// Function to handle arithmetic operators (+, -, *, /)
	const handleOperator = (value) => {
		if (expression !== "" && !isNaN(expression.slice(-1))) {
			const firstNumber = expression.split(" ")[0];
			// Check if the first number is neither "3" nor "4", reset numberEntered flag accordingly
			if (firstNumber !== "3" && firstNumber !== "4") {
				setNumberEntered(false);
			} else {
				setNumberEntered(true); // Set numberEntered flag if the first number is "3" or "4"
			}

			// Update expression with the operator
			setExpression(
				usingPreviousResult
					? `${previousResult} ${value}`
					: `${expression} ${value}`
			);
		}
		setUsingPreviousResult(false); // Reset usingPreviousResult flag
		setShowConfetti(false); // Hide confetti animation
	};

	// Function to handle default button clicks
	const handleDefault = (value) => {
		// Trigger confetti if no number was entered before and the value is "3" or "4"
		if (
			!numberEntered &&
			!usingPreviousResult &&
			(value === "3" || value === "4") &&
			!confettiTriggered
		) {
			setShowConfetti(true); // Show confetti animation
			// Hide confetti after 3 seconds and set confettiTriggered flag
			setTimeout(() => {
				setShowConfetti(false);
				setConfettiTriggered(true);
			}, 3000);
		}
		// Update expression with the clicked value and set numberEntered flag
		setExpression((prev) => {
			setNumberEntered(true);
			return prev + value;
		});
	};

	// Function to apply mathematical functions (sin, cos, tan, ln, etc.)
	const applyMathFunction = (func) => {
		return () => {
			if (!numberEntered) {
				setShowConfetti(true); // Show confetti animation
				setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
			}
			setExpression((prev) => `${func}(${prev})`); // Update expression with the function applied
			setNumberEntered(false); // Reset numberEntered flag
		};
	};

	// Function to apply power of a number (x², x³, xʸ)
	const applyPowerOf = (power) => {
		return () => {
			setExpression((prev) => `Math.pow(${prev}, ${power})`); // Update expression with power operation
			setNumberEntered(false); // Reset numberEntered flag
			setShowConfetti(false); // Hide confetti animation
		};
	};

	// Function to handle radians conversion (Rad)
	const applyRadians = () => {
		setExpression((prev) => `${prev} * (Math.PI / 180)`); // Update expression with radians conversion
		setNumberEntered(false); // Reset numberEntered flag
		setShowConfetti(false); // Hide confetti animation
	};

	// Function to handle random number generation (Rand)
	const applyRandom = () => {
		setExpression((prev) => `${prev} * Math.random()`); // Update expression with random number generation
		setNumberEntered(false); // Reset numberEntered flag
		setShowConfetti(false); // Hide confetti animation
	};

	// Function to handle button clicks from the Keypad component
	const handleButtonClick = (value) => {
		switch (value) {
			case "clear":
				clearCalculator(); // Call clearCalculator function on "clear" button click
				break;
			case "calculate":
				calculateResult(); // Call calculateResult function on "calculate" button click
				break;
			case "±":
				negateExpression(); // Call negateExpression function on "±" button click
				break;
			case "÷":
			case "*":
			case "-":
			case "+":
				handleOperator(value); // Call handleOperator function with the operator value
				break;
			case "x²":
				applyPowerOf(2)(); // Apply power of 2 to the expression
				break;
			case "x³":
				applyPowerOf(3)(); // Apply power of 3 to the expression
				break;
			case "xʸ":
				applyPowerOf(); // Start applying power of custom exponent
				break;
			case "eˣ":
				applyMathFunction("Math.exp")(); // Apply exponential function (eˣ)
				break;
			case "10ˣ":
				applyMathFunction("Math.pow(10,")(); // Start applying exponential function (10ˣ)
				break;
			case "sin":
				applyMathFunction("Math.sin")(); // Apply sine function (sin)
				break;
			case "cos":
				applyMathFunction("Math.cos")(); // Apply cosine function (cos)
				break;
			case "tan":
				applyMathFunction("Math.tan")(); // Apply tangent function (tan)
				break;
			case "ln":
				applyMathFunction("Math.log")(); // Apply natural logarithm function (ln)
				break;
			case "log₁₀":
				applyMathFunction("Math.log10")(); // Apply base-10 logarithm function (log₁₀)
				break;
			case "ʸ√x":
				applyMathFunction("Math.sqrt")(); // Apply square root function (ʸ√x)
				break;
			case "Rad":
				applyRadians(); // Convert degrees to radians (Rad)
				break;
			case "sinh":
				applyMathFunction("Math.sinh")(); // Apply hyperbolic sine function (sinh)
				break;
			case "cosh":
				applyMathFunction("Math.cosh")(); // Apply hyperbolic cosine function (cosh)
				break;
			case "tanh":
				applyMathFunction("Math.tanh")(); // Apply hyperbolic tangent function (tanh)
				break;
			case "π":
				applyMathFunction("Math.PI")(); // Apply value of π (π)
				break;
			case "Rand":
				applyRandom(); // Apply random number generation (Rand)
				break;
			default:
				handleDefault(value); // Handle default button clicks
				break;
		}
	};

	// Function to negate the expression (±)
	const negateExpression = () => {
		if (expression !== "" && !isNaN(expression.slice(-1))) {
			setExpression((prev) => prev + " * -1"); // Negate the current expression
		}
		setNumberEntered(false); // Reset numberEntered flag
	};

	// Return JSX for rendering the calculator app
	return (
		<div className="App">
			<div className="calculator">
				{/* Display component to show the current expression and result */}
				<Display expression={expression} result={result} />

				{/* Keypad component for user input */}
				<Keypad onButtonClick={handleButtonClick} />

				{/* ConfettiExplosion component to show confetti animation */}
				{showConfetti && <ConfettiExplosion />}
			</div>
		</div>
	);
};

export default App;

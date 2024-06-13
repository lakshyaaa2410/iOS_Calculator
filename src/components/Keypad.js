import React from "react";
import Button from "./Button";

const Keypad = ({ onButtonClick }) => {
	const buttons = [
		"(",
		")",
		"mc",
		"m+",
		"m-",
		"mr",
		"C",
		"±",
		"%",
		"÷",
		"2nd",
		"x²",
		"x³",
		"xʸ",
		"eˣ",
		"10ˣ",
		"7",
		"8",
		"9",
		"×",
		"¹/ₓ",
		"²/ₓ",
		"³/ₓ",
		"ʸ√x",
		"ln",
		"log₁₀",
		"4",
		"5",
		"6",
		"-",
		"x!",
		"sin",
		"cos",
		"tan",
		"e",
		"EE",
		"1",
		"2",
		"3",
		"+",
		"Rad",
		"sinh",
		"cosh",
		"tanh",
		"π",
		"Rand",
		"0",
		".",
		"=",
	];

	const handleButtonClick = (value) => {
		switch (value) {
			case "C":
				onButtonClick("clear");
				break;
			case "=":
				onButtonClick("calculate");
				break;
			case "±":
				onButtonClick("negate");
				break;
			case "÷":
				onButtonClick("/");
				break;
			case "×":
				onButtonClick("*");
				break;
			case "sin":
				onButtonClick("sin");
				break;
			case "cos":
				onButtonClick("cos");
				break;
			case "tan":
				onButtonClick("tan");
				break;
			case "mc":
				onButtonClick("mc");
				break;
			case "m+":
				onButtonClick("m+");
				break;
			case "m-":
				onButtonClick("m-");
				break;
			case "mr":
				onButtonClick("mr");
				break;
			default:
				onButtonClick(value);
				break;
		}
	};

	const getButtonClassName = (btn) => {
		switch (btn) {
			case "10ˣ":
			case "2nd":
				return ""; // Replace with your desired class name or empty string if no class needed
			case "=":
				return "equal";
			case "÷":
			case "×":
			case "-":
			case "+":
				return "operation";
			case "sin":
			case "cos":
			case "tan":
			case "ln":
			case "log₁₀":
			case "x²":
			case "x³":
			case "xʸ":
			case "eˣ":
			case "ʸ√x":
			case "x!":
			case "Rad":
			case "sinh":
			case "cosh":
			case "tanh":
			case "π":
			case "Rand":
				return "function";
			case "0":
				return "number span-two"; // Adding span-two class for button "0"
			default:
				return /\d|\./.test(btn) ? "number" : "";
		}
	};

	return (
		<div className="keysWindow">
			{buttons.map((btn, index) => (
				<Button
					key={index}
					value={btn}
					className={getButtonClassName(btn)}
					onClick={() => handleButtonClick(btn)}
				/>
			))}
		</div>
	);
};

export default Keypad;

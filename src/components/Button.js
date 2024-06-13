import React from "react";

const Button = ({ value, onClick, className }) => {
	const handleClick = () => {
		onClick(value);
	};

	return (
		<button className={`button ${className}`} onClick={handleClick}>
			{value}
		</button>
	);
};

export default Button;

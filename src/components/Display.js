import React from "react";

const Display = ({ expression, result }) => {
	return (
		<div className="displayWindow">
			<div className="expression">{expression}</div>
			<div className="result">{result}</div>
		</div>
	);
};

export default Display;

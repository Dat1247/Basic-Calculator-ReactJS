import React, { useState } from "react";
import styled from "styled-components";

export default function Calculator(props) {
	const [value, setValue] = useState({
		prevValue: "",
		result: "",
	});

	const renderDigits = () => {
		return digits.map((item, index) => {
			const gridClass =
				item === "=" ? "item-equal" : item === "+" ? "item-plus" : "";
			return (
				<KeyButton
					key={index}
					className={gridClass}
					name={item}
					onClick={(e) => {
						handleClick(e.target.name);
					}}>
					{item}
				</KeyButton>
			);
		});
	};

	const handleClick = (e) => {
		switch (e) {
			case "CE":
				clearAll();
				break;
			case "C":
				clearDigit();
				break;
			case "+":
			case "-":
			case "*":
			case "/":
			case ".":
				choseOperators(e);
				break;
			case "=":
				equalDigit();
				break;
			default:
				changeNumber(e);
				break;
		}
	};

	const changeNumber = (e) => {
		if (value.result === "0" && e === "0") {
			return;
		}
		setValue({
			prevValue: value.result.concat(e),
			result: value.result.concat(e),
		});
	};

	const choseOperators = (e) => {
		const ops = ["/", "*", "+", "-", "."];
		if (
			(value.result === "" && ops.includes(e)) ||
			(ops.includes(e) && ops.includes(value.result.slice(-1)))
		) {
			return;
		}

		if (
			value.result.includes(ops[4]) &&
			e === "." &&
			!value.result.includes(ops[0]) &&
			!value.result.includes(ops[1]) &&
			!value.result.includes(ops[2]) &&
			!value.result.includes(ops[3])
		) {
			return;
		}

		setValue({
			prevValue: value.result.concat(e),
			result: value.result.concat(e),
		});
	};

	const equalDigit = () => {
		const ops = ["/", "*", "+", "-", "."];

		try {
			if (ops.includes(value.result.slice(-1))) {
				return;
			}
			if (
				!value.result.includes(ops[0]) &&
				!value.result.includes(ops[1]) &&
				!value.result.includes(ops[2]) &&
				!value.result.includes(ops[3])
			) {
				return;
			}
			if (value.result) {
				if (value.result[0] === "0" && value.result[1] !== ".") {
					value.result = value.result.slice(1);

					let result = new Function("return " + value.result)();
					setValue({
						...value,
						result: parseFloat(result.toFixed(4)).toString(),
					});
				}
				let result = new Function("return " + value.result)();
				setValue({
					...value,
					result: parseFloat(result.toFixed(4)).toString(),
				});
			}
		} catch (err) {
			alert(err);
		}
	};

	const clearDigit = () => {
		setValue({
			prevValue: value.prevValue.slice(0, -1),
			result: value.result.slice(0, -1),
		});
	};

	const clearAll = () => {
		setValue({
			prevValue: "",
			result: "",
		});
	};

	return (
		<Container>
			<Screenshot>
				<Span>
					<p>{value.prevValue === "" ? "0" : value.prevValue}</p>
					<p>{value.result === "" ? "0" : value.result}</p>
				</Span>
			</Screenshot>
			<ButtonGroup>{renderDigits()}</ButtonGroup>
		</Container>
	);
}

const digits = [
	"CE",
	"C",
	"/",
	"*",
	"7",
	"8",
	"9",
	"-",
	"4",
	"5",
	"6",
	"+",
	"1",
	"2",
	"3",
	"0",
	".",
	"=",
];

const Container = styled.div`
	width: 350px;
	height: 450px;
	border: 1px solid black;
	border-radius: 10px;
	padding: 2rem 1.5rem;
`;

const Screenshot = styled.div`
	height: 75px;
	border: 1px solid black;
	border-radius: 5px;
	width: 100%;
	margin-bottom: 2rem;
	text-align: right;
	display: flex;
	align-items: center;
	justify-content: right;
	box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
	background-color: #ddd;
`;

const Span = styled.span`
	padding: 1rem 1rem;
	& {
		p {
			margin: 0;
		}
		p:first-of-type {
			font-size: 0.9rem;
			margin-bottom: 0.3rem;
			font-style: italic;
		}
		p:last-of-type {
			font-size: 1.1rem;
			font-weight: 600;
		}
	}
`;

const ButtonGroup = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 1rem;
`;

const KeyButton = styled.button`
	padding: 1rem;
	border: 1px solid black;
	border-radius: 50%;
	font-size: 1.1rem;
	cursor: pointer;
	transition: all 0.5s;
	&:hover {
		color: red;
		box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.2);
	}

	&.item-plus {
		grid-column: 4;
		grid-row: 3 / span 2;
	}

	&.item-equal {
		grid-column-start: 3;
		grid-column-end: 5;
	}
`;

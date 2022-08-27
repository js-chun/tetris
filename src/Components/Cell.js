import React from "react"
import styled from "styled-components"

const colors = {
	0: "#4a4e69",
	1: "#ffadad",
	2: "#ffd6a5",
	3: "#fdffb6",
	4: "#caffbf",
	5: "#9bf6ff",
	6: "#a0c4ff",
	7: "#bdb2ff",
	10: "#4a4e69",
}

const Square = styled.div`
	width: 30px;
	height: 30px;
	margin: 2px;
	border-radius: 5px;
	box-sizing: border-box;
	background-color: ${(props) =>
		props.inGame
			? props.value
				? colors[props.value]
				: colors[0]
			: props.value
			? colors[props.value]
			: "transparent"};
	box-shadow: ${(props) =>
		props.inGame
			? props.value
				? `0 0 2px ${colors[props.value]}, 0 0 10px ${colors[props.value]}`
				: `0 0 2px ${colors[0]}, 0 0 10px ${colors[0]}`
			: props.value
			? `0 0 2px ${colors[props.value]}, 0 0 10px ${colors[props.value]}`
			: `none`};
	border: ${(props) =>
		!props.gameOver
			? props.value === 10
				? "3px #f2e9e4 solid"
				: "none"
			: "none"};
`
export default function Cell(props) {
	const { value, inGame, gameOver } = props
	return <Square value={value} inGame={inGame} gameOver={gameOver}></Square>
}

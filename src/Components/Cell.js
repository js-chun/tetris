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
}

const Square = styled.div`
	width: 30px;
	height: 30px;
	margin: 2px;
	border-radius: 5px;
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
`
export default function Cell(props) {
	return <Square value={props.value} inGame={props.inGame}></Square>
}

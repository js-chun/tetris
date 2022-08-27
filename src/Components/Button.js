import React from "react"
import styled from "styled-components"

const StartButton = styled.button`
	cursor: pointer;
	font-family: inherit;
	font-size: 2rem;
	background-color: #f2e9e4;
	border: none;
	font-weight: 700;
	color: #4a4e69;
	padding: 1rem;
	border-bottom-right-radius: 1rem;
	box-shadow: 0 0 2px #f2e9e4, 0 0 10px #f2e9e4;
	&:hover {
		background-color: white;
		box-shadow: 0 0 2px white, 0 0 10px white;
	}
	&:disabled {
		background-color: #9a8c98;
		color: #4a4e69;
		&:hover {
			box-shadow: none;
      cursor: not-allowed;d
		}
	}
`

export default function Button(props) {
	const { gameOver, playClick } = props
	const handlePlayClick = () => {
		playClick()
	}
	return (
		<StartButton disabled={!props.gameOver} onClick={handlePlayClick}>
			{props.gameOver ? "Play" : "Playing"}
		</StartButton>
	)
}

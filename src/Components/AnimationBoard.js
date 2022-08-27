import React from "react"
import styled, { keyframes } from "styled-components"
import { Board, Container } from "../styles/DashboardStyles"

const scale = keyframes`
from {
  transform: scaleY(0);
} 
to { 
  transform: scaleY(1);
}`

const Line = styled.div`
	height: 50px;
	width: 10px;
	background-color: ${(props) => (props.color ? props.color : "transparent")};
	margin: 5px;
	animation: ${scale} 500ms linear infinite alternate-reverse;
	animation-delay: ${(props) => (props.delay ? `${props.delay}ms` : "0ms")};
`

const fadeIn = keyframes`
from {
  opacity: 0;
} 
to { 
  opacity: 1;
}`

const Header = styled.h1`
	margin: 0;
	font-size: 2.2rem;
	line-height: 4rem;
	animation: ${fadeIn} 1s 1 ease-in-out forwards;
`

export default function AnimationBoard(props) {
	const { gameOver } = props
	return (
		<Board m={5} h={100} tr br>
			{gameOver ? (
				<Container>
					<Header>GAME OVER</Header>
				</Container>
			) : (
				<Container>
					<Line color="#ffadad" />
					<Line color="#ffd6a5" delay={50} />
					<Line color="#fdffb6" delay={100} />
					<Line color="#caffbf" delay={150} />
					<Line color="#9bf6ff" delay={200} />
					<Line color="#a0c4ff" delay={250} />
					<Line color="#bdb2ff" delay={300} />
				</Container>
			)}
		</Board>
	)
}

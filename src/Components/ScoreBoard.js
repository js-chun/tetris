import React from "react"
import { Board, Title, Container } from "../styles/DashboardStyles"

export default function ScoreBoard(props) {
	const { score } = props
	return (
		<Board m={props.m} h={props.h} tl bl>
			SCORE
			<Container h={80}>
				<Title>{score}</Title>
			</Container>
		</Board>
	)
}

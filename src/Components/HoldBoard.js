import React from "react"
import Tetromino from "./Tetromino"
import { Board, Container } from "../styles/DashboardStyles"

export default function HoldBoard(props) {
	const { pc } = props
	return (
		<Board h={200} tl bl>
			HOLD
			<Container h={180}>{pc ? <Tetromino pc={pc} /> : "No Piece"}</Container>
		</Board>
	)
}

import React from "react"
import { Title, Board, DbColumn } from "../styles/DashboardStyles"
import ScoreBoard from "./ScoreBoard"
import HoldBoard from "./HoldBoard"

export default function LeftDashboard(props) {
	return (
		<DbColumn>
			<Board m={2} h={100}>
				<Title>TETRIS</Title>
			</Board>
			<HoldBoard m={2} h={200} />
			<ScoreBoard m={2} h={150} />
		</DbColumn>
	)
}

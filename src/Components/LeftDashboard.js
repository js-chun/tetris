import React from "react"
import { Title, Board, DbColumn, Text } from "../styles/DashboardStyles"
import ScoreBoard from "./ScoreBoard"
import HoldBoard from "./HoldBoard"

export default function LeftDashboard(props) {
	const { score, holdPc } = props
	return (
		<DbColumn>
			<Board m={2} h={100} tl bl>
				<Title>TETRIS</Title>
			</Board>
			<HoldBoard m={2} h={200} pc={holdPc} />
			<ScoreBoard m={2} h={125} score={score} />
			<Board m={1} h={150} tl bl>
				<Text>Controls</Text>
				<Text>A - Move Left</Text>
				<Text>D - Move Right</Text>
				<Text>S - Soft Drop</Text>
				<Text>Space - Hard Drop</Text>
				<Text>G - Hold Piece</Text>
				<Text>Q - Rotate Counter-Clockwise</Text>
				<Text>E - Rotate Clockwise</Text>
			</Board>
		</DbColumn>
	)
}

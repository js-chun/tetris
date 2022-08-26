import React from "react"
import { DbColumn, Board } from "../styles/DashboardStyles"
import NextBoard from "./NextBoard"
import Button from "./Button"

export default function RightDashboard(props) {
	const { nextPcs, gameOver, playClick } = props
	return (
		<DbColumn>
			<NextBoard h={450} nextPcs={nextPcs} />
			<Button gameOver={gameOver} playClick={playClick} />
			<Board m={5} h={100} tr br></Board>
		</DbColumn>
	)
}

import React from "react"
import { DbColumn } from "../styles/DashboardStyles"
import NextBoard from "./NextBoard"
import AnimationBoard from "./AnimationBoard"
import Button from "./Button"

export default function RightDashboard(props) {
	const { nextPcs, gameOver, playClick } = props
	return (
		<DbColumn>
			<NextBoard h={450} nextPcs={nextPcs} />
			<Button gameOver={gameOver} playClick={playClick} />
			<AnimationBoard gameOver={gameOver} />
		</DbColumn>
	)
}

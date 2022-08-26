import React from "react"
import { DbColumn } from "../styles/DashboardStyles"
import NextBoard from "./NextBoard"
import Button from "./Button"

export default function RightDashboard(props) {
	return (
		<DbColumn>
			<NextBoard h={450} nextPcs={props.nextPcs} />
			<Button gameOver={props.gameOver} />
		</DbColumn>
	)
}

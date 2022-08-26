import React from "react"
import { DbColumn } from "../styles/DashboardStyles"
import NextBoard from "./NextBoard"
import Button from "./Button"

export default function RightDashboard(props) {
	return (
		<DbColumn>
			<NextBoard h={400} />
			<Button gameOver={props.gameOver} />
		</DbColumn>
	)
}

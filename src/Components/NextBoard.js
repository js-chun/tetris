import React from "react"
import { Board } from "../styles/DashboardStyles"
import Tetromino from "./Tetromino"

export default function NextBoard(props) {
	const { nextPcs } = props
	return (
		<Board m={props.m} h={props.h} tr>
			NEXT
			{nextPcs.map((nextPc) => (
				<Tetromino pc={nextPc.tetromino} />
			))}
		</Board>
	)
}

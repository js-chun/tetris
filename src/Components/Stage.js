import React from "react"
import styled from "styled-components"
import Cell from "./Cell"

const StageContainer = styled.div`
	background-color: #08090a;
	padding: 10px;
	border-radius: 5px;
	height: 700px;
`

const Row = styled.div`
	display: flex;
	width: 330px;
`

export default function Stage(props) {
	const { state, player } = props

	return (
		<StageContainer>
			{state.map((row, rowNum) => {
				if (rowNum >= 3) {
					return (
						<Row>
							{row.map((col, colNum) => (
								<Cell value={state[rowNum][colNum]} />
							))}
						</Row>
					)
				}
			})}
		</StageContainer>
	)
}

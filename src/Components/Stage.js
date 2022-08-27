import React from "react"
import styled from "styled-components"
import Cell from "./Cell"

const StageContainer = styled.div`
	background-color: #22223b;
	padding: 10px;
	border-radius: 5px;
	height: 700px;
`

const Row = styled.div`
	display: flex;
	width: 330px;
`

export default function Stage(props) {
	const { state, gameOver } = props

	return (
		<StageContainer>
			{state.map((row, rowNum) => {
				if (rowNum >= 4) {
					return (
						<Row>
							{row.map((col, colNum) => (
								<Cell
									value={state[rowNum][colNum]}
									inGame={true}
									gameOver={gameOver}
								/>
							))}
						</Row>
					)
				}
			})}
		</StageContainer>
	)
}

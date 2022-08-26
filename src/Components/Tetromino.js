import React from "react"
import Cell from "./Cell"
import styled from "styled-components"
import { TETROMINOS } from "../utils/tetrominos"

const TetrominoContainer = styled.div`
	width: 100%;
	height: 100px;
	margin-bottom: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transform: scale(0.8);
`

const Row = styled.div`
	display: flex;
	width: max-content;
`

export default function Tetromino(props) {
	const { pc } = props
	return (
		<TetrominoContainer>
			{pc.shape.map((row) => {
				return (
					<Row>
						{row.map((col) => (
							<Cell value={col ? pc.num : 0} inGame={false} />
						))}
					</Row>
				)
			})}
		</TetrominoContainer>
	)
}

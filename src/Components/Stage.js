import React from "react"
import styled from "styled-components"

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

const Cell = styled.div`
	width: 30px;
	height: 30px;
	margin: 2px;
	border-radius: 5px;
	background-color: #4a4e69;
`

export default function Stage(props) {
	const { state } = props
	return (
		<StageContainer>
			{state.map((col) => (
				<Row>
					{col.map((cell) => (
						<Cell />
					))}
				</Row>
			))}
		</StageContainer>
	)
}

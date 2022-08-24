import React from "react"
import styled from "styled-components"
import NextBoard from "./NextBoard"

const DbColumn = styled.div`
	height: 700px;
	display: flex;
	flex-direction: column;
`

export default function Dashboard() {
	return (
		<DbColumn>
			<NextBoard />
		</DbColumn>
	)
}

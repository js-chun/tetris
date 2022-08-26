import styled from "styled-components"

export const Title = styled.h1`
	font-size: 4rem;
	color: white;
	margin: 0;
	text-shadow: 0 0 2px white, 0 0 10px white;
`

export const DbColumn = styled.div`
	height: 700px;
	width: 200px;
	display: flex;
	flex-direction: column;
`
export const Board = styled.div`
	width: 100%;
	background-color: #22223b;
	color: white;
	padding: 1rem;
	box-sizing: border-box;
	font-style: italic;
	height: ${(props) => (props.h ? `${props.h}px` : "250px")};
	margin: ${(props) => (props.m ? `${0.5 * props.m}rem 0` : "0")};
	text-shadow: 0 0 2px white, 0 0 10px white;
`

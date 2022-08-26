import styled from "styled-components"

export const Title = styled.h1`
	font-size: 4rem;
	color: white;
	margin: 0;
	line-height: 4rem;
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
	border-top-right-radius: ${(props) => (props.tr ? "1rem" : "0")};
	border-top-left-radius: ${(props) => (props.tl ? "1rem" : "0")};
	border-bottom-right-radius: ${(props) => (props.br ? "1rem" : "0")};
	border-bottom-left-radius: ${(props) => (props.bl ? "1rem" : "0")};
	height: ${(props) => (props.h ? `${props.h}px` : "250px")};
	margin: ${(props) => (props.m ? `${0.5 * props.m}rem 0` : "0")};
	text-shadow: 0 0 2px white, 0 0 10px white;
`
export const Text = styled.div`
	margin: 0;
	font-size: 0.82rem;
`
export const Container = styled.div`
	width: 100%;
	height: ${(props) => (props.h ? `${props.h}px` : "")};
	display: flex;
	justify-content: center;
	align-items: center;
`

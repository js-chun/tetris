import React, { useState, useEffect } from "react"
import Stage from "./Stage"
import Dashboard from "./Dashboard"
import { Container } from "../styles/TetrisAppStyles"
import { createArray, updateStage } from "../helper"
import {
	getRandomTetromino,
	getMaxMins,
	getFullLocations,
	rotateCounter,
} from "../tetrominos"

const COLUMNS = 10
const ROWS = 23

export default function TetrisApp() {
	const [player, setPlayer] = useState({
		position: { x: 4, y: 3 },
		tetromino: getRandomTetromino(),
		collided: false,
	})
	const [state, setState] = useState(createArray(ROWS, COLUMNS))
	const [copyStage, setCopyStage] = useState(state)

	const [dropTime, setDropTime] = useState(null)
	const [gameOver, setGameOver] = useState(false)

	const handleKeyDown = (evt) => {
		let posX = player.position.x
		let posY = player.position.y
		if (["a", "d", "s"].includes(evt.key)) {
			const maxMins = getMaxMins(player.tetromino)
			if (evt.key === "a") {
				posY--
				if (posY < 0 - maxMins.minY) posY = -maxMins.minY
			} else if (evt.key === "d") {
				posY++
				if (posY + maxMins.maxY > COLUMNS - 1) posY--
			} else if (evt.key === "s") {
				posX++
				if (posX + maxMins.maxX > ROWS - 1) posX--
			}
			setPlayer({
				...player,
				position: { x: posX, y: posY },
			})
		} else if (evt.key === "r") {
			const newTetro = { ...player.tetromino }
			newTetro.shape = rotateCounter(newTetro)
			const maxMins = getMaxMins(newTetro)
			if (posY < 0 - maxMins.minY) posY = -maxMins.minY
			if (posY + maxMins.maxY > COLUMNS - 1) posY = COLUMNS - 1 - maxMins.maxY
			if (posX + maxMins.maxX > ROWS - 1) posX = ROWS - 1 - maxMins.maxX
			setPlayer({
				...player,
				tetromino: newTetro,
				position: { x: posX, y: posY },
			})
		}
	}

	useEffect(() => {
		const tetroLocs = getFullLocations(player.tetromino, player.position)

		setCopyStage(updateStage(state, tetroLocs, player.tetromino.num))
	}, [player])

	return (
		<Container onKeyDown={handleKeyDown} tabIndex={0}>
			<Stage state={copyStage} player={player} />
			<div>
				<Dashboard />
			</div>
		</Container>
	)
}

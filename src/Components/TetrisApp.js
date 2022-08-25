import React, { useState, useEffect } from "react"
import Stage from "./Stage"
import Dashboard from "./Dashboard"
import { Container } from "../styles/TetrisAppStyles"
import { createArray, updateStage } from "../gameHelper"
import {
	getRandomTetromino,
	getMaxMins,
	getFullLocations,
	rotate,
} from "../tetrominos"
import { canMoveDown, moveHorizontal, moveDown } from "../colliderHelper"
import { ROWS, COLUMNS } from "../gameVariables"
import useInterval from "../useInterval"

export default function TetrisApp() {
	const [player, setPlayer] = useState({
		position: { x: 0, y: 0 },
		tetromino: getRandomTetromino(),
	})
	const [stage, setStage] = useState(createArray(ROWS, COLUMNS))
	const [copyStage, setCopyStage] = useState(stage)

	const [dropTime, setDropTime] = useState(1000)
	const [gameOver, setGameOver] = useState(false)

	const getNewPiece = () => {
		setStage(copyStage)
		setPlayer({
			position: { x: 4, y: 3 },
			tetromino: getRandomTetromino(),
		})
	}

	const handleKeyDown = (evt) => {
		if (["a", "d", "s"].includes(evt.key)) {
			let pos
			if (evt.key === "a") {
				pos = moveHorizontal(true, player, stage)
			}
			if (evt.key === "d") {
				pos = moveHorizontal(false, player, stage)
			}
			if (evt.key === "s") {
				pos = moveDown(player, stage)
			}
			if (pos)
				setPlayer({
					...player,
					position: pos,
				})
		} else if (["q", "e"].includes(evt.key)) {
			let posX = player.position.x
			let posY = player.position.y
			const newTetro = { ...player.tetromino }
			if (evt.key === "q") newTetro.shape = rotate(true, newTetro)
			else if (evt.key === "e") newTetro.shape = rotate(false, newTetro)
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

	useInterval(() => {
		if (canMoveDown(player, stage)) {
			let pos = moveDown(player, stage)
			setPlayer({ ...player, position: pos })
		} else {
			getNewPiece()
		}
	}, dropTime)

	useEffect(() => {
		if (!canMoveDown(player, stage)) {
		}

		const tetroLocs = getFullLocations(player.tetromino, player.position)
		setCopyStage(updateStage(stage, tetroLocs, player.tetromino.num))
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

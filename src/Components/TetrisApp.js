import React, { useState, useEffect } from "react"
import Stage from "./Stage"
import { Container } from "../styles/TetrisAppStyles"
import {
	createArray,
	updateStage,
	checkAndRemoveRows,
} from "../utils/gameHelper"
import {
	getRandomTetromino,
	getMaxMins,
	getFullLocations,
	rotate,
} from "../utils/tetrominos"
import { canMoveDown, moveHorizontal, moveDown } from "../utils/colliderHelper"
import { ROWS, COLUMNS } from "../utils/gameVariables"
import useInterval from "../hooks/useInterval"
import LeftDashboard from "./LeftDashboard"
import RightDashboard from "./RightDashboard"

const initialPc = getRandomTetromino()
const initialNextPcs = [
	getRandomTetromino(),
	getRandomTetromino(),
	getRandomTetromino(),
]

export default function TetrisApp() {
	const [player, setPlayer] = useState({
		position: { x: initialPc.offset, y: 4 },
		tetromino: initialPc.tetromino,
	})
	const [nextPcs, setNextPcs] = useState(initialNextPcs)
	const [stage, setStage] = useState(createArray(ROWS, COLUMNS))
	const [copyStage, setCopyStage] = useState(stage)

	const [dropTime, setDropTime] = useState(1000)
	const [gameOver, setGameOver] = useState(false)

	const getNewPiece = () => {
		const changedStage = checkAndRemoveRows(
			copyStage,
			getFullLocations(player.tetromino, player.position)
		)
		setStage(changedStage)
		const nexts = [...nextPcs]
		const newPiece = nexts.shift()
		console.log(newPiece)
		nexts.push(getRandomTetromino())

		if (stage[2].some((col) => col !== 0)) setGameOver(true)
		setNextPcs(nexts)
		setPlayer({
			position: { x: newPiece.offset, y: 4 },
			tetromino: newPiece.tetromino,
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
			<LeftDashboard />
			<Stage state={copyStage} />
			<RightDashboard nextPcs={nextPcs} gameOver={gameOver} />
		</Container>
	)
}

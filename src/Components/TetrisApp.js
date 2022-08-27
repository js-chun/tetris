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
import {
	canMoveDown,
	moveHorizontal,
	moveDown,
	getLowest,
	getPredictedLocations,
} from "../utils/colliderHelper"
import { ROWS, COLUMNS } from "../utils/gameVariables"
import useInterval from "../hooks/useInterval"
import LeftDashboard from "./LeftDashboard"
import RightDashboard from "./RightDashboard"

const initialPc = getRandomTetromino()

export default function TetrisApp() {
	const [player, setPlayer] = useState({
		position: { x: initialPc.offset, y: 4 },
		tetromino: initialPc.tetromino,
	})
	const [holdPc, setHoldPc] = useState(null)
	const [nextPcs, setNextPcs] = useState([])
	const [stage, setStage] = useState(createArray(ROWS, COLUMNS))
	const [copyStage, setCopyStage] = useState(stage)

	const [score, setScore] = useState(0)
	const [dropTime, setDropTime] = useState(1000)
	const [gameOver, setGameOver] = useState(true)

	const getNewPiece = () => {
		const result = checkAndRemoveRows(
			copyStage,
			getFullLocations(player.tetromino, player.position)
		)
		setStage(result.stage)
		setScore(score + 5 + 100 * result.completeRows)

		const nexts = [...nextPcs]
		const newPiece = nexts.shift()
		nexts.push(getRandomTetromino())

		if (stage[3].some((col) => col !== 0)) setGameOver(true)
		setNextPcs(nexts)
		setPlayer({
			position: { x: newPiece.offset, y: 4 },
			tetromino: newPiece.tetromino,
		})
	}

	const handleKeyDown = (evt) => {
		if (!gameOver) {
			if (evt.code === "Space") {
				const lowestPos = { x: getLowest(player, stage), y: player.position.y }
				setPlayer({ ...player, position: lowestPos }, () => {
					getNewPiece()
				})
			} else if (evt.key === "g") {
				const switchPc = holdPc
				setHoldPc(player.tetromino)
				if (switchPc) {
					const { maxX } = getMaxMins(switchPc)
					const offset = 3 - maxX
					setPlayer({
						position: { x: offset, y: 4 },
						tetromino: switchPc,
					})
				} else {
					const nexts = [...nextPcs]
					const newPiece = nexts.shift()
					nexts.push(getRandomTetromino())
					setPlayer({
						position: { x: newPiece.offset, y: 4 },
						tetromino: newPiece.tetromino,
					})
				}
			} else if (["a", "d", "s"].includes(evt.key)) {
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
	}

	const handlePlayClick = () => {
		if (gameOver) {
			setStage(createArray(ROWS, COLUMNS))
			setHoldPc(null)
			setGameOver(false)
			const initialPc = getRandomTetromino()
			const initialNextPcs = [
				getRandomTetromino(),
				getRandomTetromino(),
				getRandomTetromino(),
			]
			setPlayer({
				position: { x: initialPc.offset, y: 4 },
				tetromino: initialPc.tetromino,
			})
			setNextPcs(initialNextPcs)
		}
	}

	useInterval(() => {
		if (!gameOver) {
			if (canMoveDown(player, stage)) {
				let pos = moveDown(player, stage)
				setPlayer({ ...player, position: pos })
			} else {
				getNewPiece()
			}
		}
	}, dropTime)

	useEffect(() => {
		const tetroLocs = getFullLocations(player.tetromino, player.position)
		setCopyStage(
			updateStage(
				stage,
				tetroLocs,
				getPredictedLocations(player, stage),
				player.tetromino.num
			)
		)
	}, [player])

	return (
		<Container onKeyDown={handleKeyDown} tabIndex={0}>
			<LeftDashboard score={score} holdPc={holdPc} />
			<Stage state={copyStage} gameOver={gameOver} />
			<RightDashboard
				nextPcs={nextPcs}
				gameOver={gameOver}
				playClick={handlePlayClick}
			/>
		</Container>
	)
}

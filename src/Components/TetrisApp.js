import React, { useState, useEffect } from "react"
import Stage from "./Stage"
import LeftDashboard from "./LeftDashboard"
import RightDashboard from "./RightDashboard"
import { Container } from "../styles/TetrisAppStyles"
import {
	createArray,
	updateStage,
	checkAndRemoveRows,
	calculateScoreGain,
} from "../utils/gameHelper"
import {
	getRandomTetromino,
	getMaxMins,
	getFullLocations,
} from "../utils/tetrominos"
import {
	canMoveDown,
	moveHorizontal,
	moveDown,
	getLowest,
	getPredictedLocations,
	getPossibleRotation,
} from "../utils/colliderHelper"
import { ROWS, COLUMNS } from "../utils/gameVariables"
import useInterval from "../hooks/useInterval"
import { playAudio, stopAudio } from "../utils/audioPlayer"

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
	const [numPieces, setNumPieces] = useState(0)
	const [dropTime, setDropTime] = useState(1000)
	const [gameOver, setGameOver] = useState(true)
	const [placedDown, setPlacedDown] = useState(false)

	const getNewPiece = () => {
		setPlacedDown(false)
		const result = checkAndRemoveRows(
			copyStage,
			getFullLocations(player.tetromino, player.position)
		)
		setStage(result.stage)
		setScore(score + calculateScoreGain(result.completeRows))

		const nexts = [...nextPcs]
		const newPiece = nexts.shift()
		nexts.push(getRandomTetromino())

		if (stage[3].some((col) => col !== 0)) {
			stopAudio("audio-bg")
			playAudio("audio-gameover", 0.3)
			setGameOver(true)
		}

		setNumPieces(numPieces + 1)

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
				setPlayer({ ...player, position: lowestPos })
				playAudio("audio-fall", 0.2)
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
				playAudio("audio-move", 0.2)
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
				playAudio("audio-move", 0.2)
				let counterClockwise
				if (evt.key === "q") counterClockwise = true
				else counterClockwise = false
				setPlayer(getPossibleRotation(counterClockwise, player, stage))
			}
		}
	}

	const handlePlayClick = () => {
		if (gameOver) {
			playAudio("audio-bg", 0.1)
			setStage(createArray(ROWS, COLUMNS))
			setHoldPc(null)
			setGameOver(false)
			const initialPc = getRandomTetromino()
			const initialNextPcs = [
				getRandomTetromino(),
				getRandomTetromino(),
				getRandomTetromino(),
			]
			setNumPieces(1)
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
				setPlacedDown(true)
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

	useEffect(() => {
		if (numPieces % 10 === 0 && !gameOver) {
			const newDropTime = Math.floor(dropTime * 0.95)
			if (newDropTime >= 100) {
				setDropTime(newDropTime)
			}
		}
	}, [numPieces])

	useEffect(() => {
		if (placedDown) {
			getNewPiece()
		}
	}, [placedDown])

	return (
		<Container onKeyDown={handleKeyDown} tabIndex={0}>
			<audio className="audio-fall">
				<source
					src={`${process.env.PUBLIC_URL}/audio/fall.wav`}
					type="audio/wav"
				/>
			</audio>
			<audio className="audio-move">
				<source
					src={`${process.env.PUBLIC_URL}/audio/move.wav`}
					type="audio/wav"
				/>
			</audio>
			<audio className="audio-gameover">
				<source
					src={`${process.env.PUBLIC_URL}/audio/GameOver.wav`}
					type="audio/wav"
				/>
			</audio>
			<audio className="audio-bg" loop={true}>
				<source
					src={`${process.env.PUBLIC_URL}/audio/bg.ogg`}
					type="audio/ogg"
				/>
			</audio>
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

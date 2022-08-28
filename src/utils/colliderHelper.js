import {
	findMaxX,
	findMinY,
	findMaxY,
	getMaxMins,
	getFullLocations,
} from "./tetrominos"
import { ROWS, COLUMNS } from "./gameVariables"

export const canMoveDown = (player, stage) => {
	const maxX = findMaxX(player.tetromino)
	const locs = getFullLocations(player.tetromino, player.position).filter(
		(loc) =>
			loc.x - player.position.x == maxX ||
			(loc.x - player.position.x != maxX &&
				player.tetromino.shape[loc.x - player.position.x + 1][
					loc.y - player.position.y
				] === 0)
	)
	if (player.position.x + maxX >= ROWS - 1) {
		return false
	} else {
		return locs.every((loc) => stage[loc.x + 1][loc.y] === 0)
	}
}

const canMoveLeft = (player, stage) => {
	const minY = findMinY(player.tetromino)
	const locs = getFullLocations(player.tetromino, player.position).filter(
		(loc) =>
			loc.y - player.position.y == minY ||
			(loc.y - player.position.y != minY &&
				player.tetromino.shape[loc.x - player.position.x][
					loc.y - player.position.y - 1
				] === 0)
	)
	if (player.position.y + minY <= 0) {
		return false
	} else {
		return locs.every((loc) => stage[loc.x][loc.y - 1] === 0)
	}
}

const canMoveRight = (player, stage) => {
	const maxY = findMaxY(player.tetromino)
	const locs = getFullLocations(player.tetromino, player.position).filter(
		(loc) =>
			loc.y - player.position.y == maxY ||
			(loc.y - player.position.y != maxY &&
				player.tetromino.shape[loc.x - player.position.x][
					loc.y - player.position.y + 1
				] === 0)
	)
	if (player.position.y + maxY >= COLUMNS - 1) {
		return false
	} else {
		return locs.every((loc) => stage[loc.x][loc.y + 1] === 0)
	}
}

export const moveHorizontal = (goLeft, player, stage) => {
	let posY = player.position.y
	let condition
	let amount = 0
	if (goLeft) {
		condition = canMoveLeft(player, stage)
		amount = -1
	} else {
		condition = canMoveRight(player, stage)
		amount = 1
	}

	if (condition) {
		posY += amount
	}
	return { x: player.position.x, y: posY }
}

export const moveDown = (player, stage) => {
	let posX = player.position.x
	if (canMoveDown(player, stage)) {
		posX++
	}
	return { x: posX, y: player.position.y }
}

export const getLowest = (player, stage) => {
	let lowestRow = player.position.x
	for (let r = player.position.x; r < ROWS - 1; r++) {
		const canDrop = canMoveDown(
			{
				tetromino: player.tetromino,
				position: { x: r, y: player.position.y },
			},
			stage
		)
		if (canDrop) {
			lowestRow = r + 1
		} else {
			break
		}
	}
	return lowestRow
}

export const getPredictedLocations = (player, stage) => {
	const lowestRow = getLowest(player, stage)
	const predictedPos = { x: lowestRow, y: player.position.y }
	return getFullLocations(player.tetromino, predictedPos)
}

const isOccupied = (player, stage) => {
	const rotatedLocs = getFullLocations(player.tetromino, player.position)
	return rotatedLocs.some((loc) => stage[loc.x][loc.y] !== 0)
}

export const rotate = (isCounterClockwise, tetromino) => {
	const arr = tetromino.shape.map((row) => row.map((col) => col))

	if (isCounterClockwise) {
		return Array.from(arr[0], (x, col) =>
			Array.from(arr, (y, row) => arr[row][arr[0].length - col - 1])
		)
	} else {
		return Array.from(arr[0], (x, col) =>
			Array.from(arr, (y, row) => arr[arr.length - row - 1][col])
		)
	}
}

export const getPossibleRotation = (isCounterClockwise, player, stage) => {
	let posX = player.position.x
	let posY = player.position.y
	const newTetro = { ...player.tetromino }

	newTetro.shape = rotate(isCounterClockwise, newTetro)
	const maxMins = getMaxMins(newTetro)

	if (posY < 0 - maxMins.minY) posY = -maxMins.minY
	if (posY + maxMins.maxY > COLUMNS - 1) posY = COLUMNS - 1 - maxMins.maxY
	if (posX + maxMins.maxX > ROWS - 1) posX = ROWS - 1 - maxMins.maxX

	if (
		isOccupied({ position: { x: posX, y: posY }, tetromino: newTetro }, stage)
	) {
		return player
	} else {
		return { position: { x: posX, y: posY }, tetromino: newTetro }
	}
}

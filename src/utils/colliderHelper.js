import { findMaxX, findMinY, findMaxY, getFullLocations } from "./tetrominos"
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

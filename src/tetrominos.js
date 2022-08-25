export const TETROMINOS = {
	0: { shape: [[0]] },
	I: {
		shape: [
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
		],
		num: 1,
		nxn: 4,
	},
	J: {
		shape: [
			[0, 1, 0],
			[0, 1, 0],
			[1, 1, 0],
		],
		num: 2,
		nxn: 3,
	},
	L: {
		shape: [
			[0, 1, 0],
			[0, 1, 0],
			[0, 1, 1],
		],
		num: 3,
		nxn: 3,
	},
	O: {
		shape: [
			[1, 1],
			[1, 1],
		],
		num: 4,
		nxn: 2,
	},
	S: {
		shape: [
			[0, 1, 1],
			[1, 1, 0],
			[0, 0, 0],
		],
		num: 5,
		nxn: 3,
	},
	T: {
		shape: [
			[0, 0, 0],
			[1, 1, 1],
			[0, 1, 0],
		],
		num: 6,
		nxn: 3,
	},
	Z: {
		shape: [
			[1, 1, 0],
			[0, 1, 0],
			[0, 1, 1],
		],
		num: 7,
		nxn: 3,
	},
}

export const getRandomTetromino = () => {
	const tetrominos = "IJLOSTZ"
	const randTetromino =
		tetrominos[Math.floor(Math.random() * tetrominos.length)]
	return TETROMINOS[randTetromino]
}

export const findMinY = (tetromino) => {
	let cols = []
	for (let row = 0; row < tetromino.nxn; row++) {
		for (let col = 0; col < tetromino.nxn; col++) {
			if (tetromino.shape[row][col] !== 0) {
				cols.push(col)
			}
		}
	}
	return Math.min(...cols)
}

export const findMaxY = (tetromino) => {
	let cols = []
	for (let row = 0; row < tetromino.nxn; row++) {
		for (let col = 0; col < tetromino.nxn; col++) {
			if (tetromino.shape[row][col] !== 0) {
				cols.push(col)
			}
		}
	}
	return Math.max(...cols)
}

export const findMaxX = (tetromino) => {
	let max = 0
	for (let i = 0; i < tetromino.nxn; i++) {
		for (let row of tetromino.shape[i]) {
			if (row !== 0) {
				max = i
			}
		}
	}
	return max
}

export const getMaxMins = (tetromino) => {
	return {
		minY: findMinY(tetromino),
		maxY: findMaxY(tetromino),
		maxX: findMaxX(tetromino),
	}
}

export const getFlatLocations = (tetromino) => {
	const result = []
	tetromino.shape.forEach((row, rowNum) => {
		row.forEach((col, colNum) => {
			if (col !== 0) {
				result.push({
					x: rowNum,
					y: colNum,
				})
			}
		})
	})
	return result
}

export const getFullLocations = (tetromino, position) => {
	const locs = getFlatLocations(tetromino)
	return locs.map((loc) => ({ x: loc.x + position.x, y: loc.y + position.y }))
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

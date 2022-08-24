export const TETROMINOS = {
	0: { shape: [[0]], color: "0,0,0" },
	I: {
		shape: [
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
		],
		color: "0,0,0",
	},
	J: {
		shape: [
			[0, 1, 0],
			[0, 1, 0],
			[1, 1, 0],
		],
		color: "0,0,0",
	},
	L: {
		shape: [
			[0, 1, 0],
			[0, 1, 0],
			[0, 1, 1],
		],
		color: "0,0,0",
	},
	O: {
		shape: [
			[1, 1],
			[1, 1],
		],
		color: "0,0,0",
	},
	S: {
		shape: [
			[0, 1, 1],
			[1, 1, 0],
			[0, 0, 0],
		],
		color: "0,0,0",
	},
	T: {
		shape: [
			[0, 0, 0],
			[1, 1, 1],
			[0, 1, 0],
		],
		color: "0,0,0",
	},
	Z: {
		shape: [
			[1, 1, 0],
			[0, 1, 0],
			[0, 1, 1],
		],
		color: "0,0,0",
	},
}

export const getRandomTetromino = () => {
	const tetrominos = "IJLOSTZ"
	const randTetromino =
		tetrominos[Math.floor(Math.random() * tetrominos.length)]
	return TETROMINOS[randTetromino]
}

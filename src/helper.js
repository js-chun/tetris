export const createArray = (cols, rows) => {
	const arr = []
	for (let x = 0; x < cols; x++) {
		arr.push(Array(rows).fill(0))
	}
	return arr
}

export const updateStage = (staticStage, locations, num) => {
	const result = staticStage.map((row) => {
		return row.map((col) => col)
	})
	locations.forEach((loc) => {
		result[loc.x][loc.y] = num
	})
	return result
}

export const createArray = (cols, rows) => {
	const arr = []
	for (let x = 0; x < cols; x++) {
		arr.push(Array(rows).fill(0))
	}
	return arr
}

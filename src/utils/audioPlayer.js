export const playAudio = (audioClass, volume = 1) => {
	const audioEl = document.getElementsByClassName(audioClass)[0]
	audioEl.volume = volume
	audioEl.play()
}

export const stopAudio = (audioClass) => {
	const audioEl = document.getElementsByClassName(audioClass)[0]
	audioEl.pause()
	audioEl.currentTime = 0
}

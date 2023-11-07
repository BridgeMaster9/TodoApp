function changeTime(currentTime) {
  const indOfDotes = currentTime.indexOf(':')
  let min = currentTime.slice(0, indOfDotes) - 0
  let sec = currentTime.slice(indOfDotes + 1, currentTime.length) - 0
  if (sec <= 0 && min <= 0) return 'time is up'
  sec -= 1

  if (sec < 0 && min > 0) {
    sec = 59
    min -= 1
  }
  if (sec < 10) {
    sec = `0${sec}`
  }
  if (min < 10) min = `0${min}`
  return `${min}:${sec}`
}

export default changeTime

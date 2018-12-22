const clientRect = element => {
  let rect = element.getBoundingClientRect()
  return {
    top: rect.top,
    left: rect.left
  }
}
module.exports = {
  clientRect
}

const clientRect = element => {
  let rect = element.getBoundingClientRect()
  return {
    top: rect.top,
    left: rect.left
  }
}

const transForm =(element, style) => {
  element.style.transform = style
}

module.exports = {
  clientRect,
  transForm
}

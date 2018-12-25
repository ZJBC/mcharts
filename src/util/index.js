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
const positionByAngle = (angle, radius) => {
  let ANGLE_RATIO = Math.PI / 180;
 
  return {
    x: Math.sin(angle * ANGLE_RATIO) * radius,
		y: Math.cos(angle * ANGLE_RATIO) * radius,
	}
}
module.exports = {
  clientRect,
  transForm,
  positionByAngle
}

const clientRect = element => {
  let rect = element.getBoundingClientRect()
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height
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

const createSVG = (options, tag) => {
  const element = document.createElementNS("http://www.w3.org/2000/svg",  tag)
  for(let key in options) {
    const val = options[key]
    if(tag === 'text') {
      element.innerHTML = val
      element.setAttribute(key, val)
    } else {
      element.setAttribute(key, val)
    }
  }
  return element
}
const drawY = (x1, x2, yDiff, yTextDiff, yTextValue) => {
  let drawYline = createSVG( {
    x1: x1,
    x2: x2,
    y1: 0,
    y2: 0,
    "stroke-width": 2,
    "stroke": "#dadada",
    "stroke": "rgb(99,99,99)",
  },"line")
  let drawYg = createSVG({
    "stroke-opacity": 1,
    "transform": `translate(0, ${yDiff})`
  },"g")
  let drawYtest = createSVG({
    x:0,
    y:yTextDiff,
    text: yTextValue.toString()
  }, 'text')
  drawYg.appendChild(drawYline)
  drawYg.appendChild(drawYtest)
  return drawYg
}
const drawX = (y2, xDiff, xTextDiff, xTextValue) => {
  let drawXline = createSVG({
    x1: 0,
    x2: 0,
    y1: 15,
    y2: y2-15,
    "stroke-width": 2,
    "stroke": "#dadada",
    "stroke": "rgb(99,99,99)",
  },"line")
  let drawXg = createSVG({
    "stroke-opacity": 1,
    "transform": `translate(${xDiff}, 0)`
  },"g")
  let drawXtest = createSVG({
    x:-15,
    y:y2-5,
    text: xTextValue
  }, 'text')
  drawXg.appendChild(drawXline)
  drawXg.appendChild(drawXtest)
  return drawXg
}

module.exports = {
  clientRect,
  transForm,
  positionByAngle,
  createSVG,  // 创建Svg
  drawY, // 画Y轴
  drawX, // 画X轴
}

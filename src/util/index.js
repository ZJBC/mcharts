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
    "stroke-width": 1,
    "stroke": "#dadada",
  },"line")
  let drawYg = createSVG({
    "stroke-opacity": 1,
    "transform": `translate(0, ${yDiff})`
  },"g")
  let drawYtest = createSVG({
    x:0,
    y:yTextDiff+4, // 将文字放在线的中间
    text: yTextValue.toString()
  }, 'text')
  drawYg.appendChild(drawYline)
  drawYg.appendChild(drawYtest)
  return drawYg
}
const drawX = (y2, xDiff, xTextDiff, xTextValue, type) => {
  let drawXg = createSVG({
    "stroke-opacity": 1,
    "transform": `translate(${xDiff}, 0)`
  },"g")
  if(type === 'line') {
    let drawXline = createSVG({
      x1: 0,
      x2: 0,
      y1: 0,
      y2: y2,
      "stroke-width": 1,
      "stroke": "#dadada",
    },"line")
    drawXg.appendChild(drawXline)
  }
  let drawXtest = createSVG({
    x:-10,
    y:y2+10,
    text: xTextValue
  }, 'text')
  
  drawXg.appendChild(drawXtest)
  return drawXg
}
//节流 deb  thr
const mchartsDebounce =function(func, delay, isimmdeiate) {
  let timer = null
  return function() {
    let context = this
    let args = arguments
    if(timer) {
      clearTimeout(timer)
    }
    if(isimmdeiate) {
      let dotime = !timer
      timer = setTimeout(function(){
        timer = null
      },delay)
      if(dotime) {
        func.apply(context, args)
      }
    } else {
      timer = setTimeout(function(){
        func.apply(context, args)
      }, delay)
    }
  }
}
const mchartsThrottle = function(func, delay) {
  let startTime = Date.now()
  return function() {
    let context = this
    let args = arguments
    let currTime = Date.now()
    let timer = null
    
    if(currTime - startTime >= delay) {
      func.apply(context, args)
      startTime = Date.now()
    } else {
      clearTimeout(timer)
      timer = setTimeout(function(){
        startTime = currTime
        func.apply(context, args)
      }, delay)
    }
  }
}

// y轴上的值
const getYPosition = (values,yPositons) => {
  const maxYValue = Math.max(...values)
  const minYValue = Math.min(...values)
  const maxYPosition = Math.max(...yPositons)
  const minYPosition = Math.min(...yPositons)
  const yInterval = (maxYPosition - minYPosition) / (maxYValue - minYValue)
  return values.map((value) => {
    return minYPosition + ((maxYValue - value) * yInterval)
  })
}

module.exports = {
  clientRect,
  mchartsThrottle,
  mchartsDebounce,
  transForm,
  positionByAngle,
  createSVG,  // 创建Svg
  drawY, // 画Y轴
  drawX, // 画X轴
  getYPosition,
}

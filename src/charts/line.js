/**
 * 线图 line
 * 
    
 */
import AxisCharts from './AxisCharts'
import util from '../util'

class Line extends AxisCharts  {
  constructor(arg) {
    super(arg)
    this.init()
  }
  init() {
    // 链接点之间的线
    this.getLinkLine()
  }
  getLinkLine() {
    // 根绝数据创建g
    const {configData} = this
    const {colors} = this.config
    configData.map((item, index)=> {
      let gLine = util.createSVG({
        "stroke-opacity": "1",
       },'g')
       const {containertem} = this
       let createPath = this.getLinePath(item.values, colors[index])
       gLine.appendChild(createPath)
       containertem.appendChild(gLine)
    })
  
  }
  getLinePath(values,colors) {
    const yPositions = this.getYPosition(values)
    yPositions.reverse()
    console.log("太热太热太热特让他热", yPositions)

    let lineList = yPositions.map((yval, index) => {
      return `${this.xPositons[index]},${yval}`
    })
    let lineL = lineList.join("L")
    let createPath = util.createSVG({
      "d":`M${lineL}`,
      "stroke-width":2,
      "style":`stroke:${colors}; fill: none;`
    },'path')
    return createPath
  }
  getYPosition(values) {
    const maxYValue = Math.max(...values)
    const minYValue = Math.min(...values)
    const maxYPosition = Math.max(...this.yPositons)
    const minYPosition = Math.min(...this.yPositons)
    const yInterval = (maxYPosition - minYPosition) / (maxYValue - minYValue)
    return values.map((value) => {
      return minYPosition + ((maxYValue - value) * yInterval)
    })
  }
}

export default Line
/**
 * 柱状图 bar
 * 
    
 */
import AxisCharts from './AxisCharts'
import Tooltip from '../component/toolTip'
import util from '../util'
class Bar extends AxisCharts {
  constructor(arg) {
    super(arg)
    this.yPositionsToolTip = []
    // this.tooltip = new Tooltip() // 提示拿过来
    this.init()
  }
  init() {
    this.getBarrect()  // 新建bar

  }
  getBarrect() {
    // 根绝数据创建g
    const {configData} = this
    const {colors} = this.config
    let gLine = util.createSVG({
      "stroke-opacity": "1",
    },'g')
    const {containertem} = this
    let createPath = configData.map((item, index)=> {
      return this.getBarPath(item.values, colors[index])
    })[0]
    createPath.forEach(element => {
      gLine.appendChild(element)
    })
   
    containertem.appendChild(gLine)
  }
  getBarPath(values,colors) {
    const yPositions = this.getYPosition(values)
    let yPositionsitem = yPositions.concat()
    yPositionsitem.reverse()
    this.yPositionsToolTip.push(yPositions)
    let lineList = yPositionsitem.map((yval, index) => {
      let translatew  = this.xPositons[index]

      let createPath = util.createSVG({
        "x":0,
        "y":yval,
        "height": this.chartsHeight-yval-20,
        "width":10,
        "stroke-width":1,
        "style":`stroke:${colors}; fill: none;`,
        "transform": `translate(${translatew}, 0)`,
      },'rect')
      return createPath
    })
    return lineList
  }
  getYPosition(values) {
    console.log("L:L:L:L:L", values)
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

export default Bar
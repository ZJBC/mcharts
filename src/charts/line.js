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
    // 创建一个g
   let gLine = util.createSVG({
    "stroke-opacity": "1",
   },'g')
   const {containertem} = this
   let createPath = this.getLinePath()
   gLine.appendChild(createPath)
   containertem.appendChild(gLine)

  }
  getLinePath() {
    const {colors} = this.config
     this.yPositons.sort(function(a, b) {
      return a-b
    })
    let lineList = this.yPositons.map((yval, index) => {
      return `${yval-50},${this.xPositons[index]}`
    })
    let lineL = lineList.join("L")
    let createPath = util.createSVG({
      "d":`M${lineL}`,
      "stroke-width":2,
      "style":`stroke:${colors[0]}; fill: none;`
    },'path')
    return createPath
  }
}

export default Line
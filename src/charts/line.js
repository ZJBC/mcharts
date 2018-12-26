/**
 * 线图 line
 * 
    
 */
import AxisCharts from './AxisCharts'
import util from '../util'

class Line extends AxisCharts  {
  constructor(arg) {
    super(arg)
    console.log("gas法萨顶顶撒", arg)
    this.init()
  }
  init() {
    // 创建一个svg
    // let svgDom = util.createSVG()
  }
}

export default Line
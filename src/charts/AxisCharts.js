import baseCharts from "./baseCharts"
import util from '../util'
/**
 * 坐标系的组件
 */
class AxisCharts extends baseCharts {
  constructor(args) {
    super(args)
    console.log("基础组件11", args)
    const { data, type, title } = args
    this.configData = data.datasets
    this.labels = data.labels
    this.title = title
    this.type = type
    this.drawHeight = 400
    this.drawWidth = 400
    this.config = args
    this.initAxisY()  // 创建Y
    this.initAxisX()   // 创建X
  }

  initAxisX() {
    // 创建X轴数据
    let xVal = this.createAxisX()
    const xPosInterval = this.drawWidth / 8
    xVal.map((value, index) => {
      const xDiff = this.drawWidth - (xPosInterval * index)
      this.drawXAxis(value, xDiff)
    })
  }
  drawXAxis(xTextValue, xDiff) {

    const {containertem} = this
    let rect = util.clientRect(containertem)
    let xTextDiff = 4
    const {height} = rect
    const xLine = util.drawX(height, xDiff, xTextDiff, xTextValue)
    
    containertem.appendChild(xLine)
  }
  createAxisX() {
    return this.getAxisXValue()
  }
  getAxisXValue() {
    const {labels} = this
    return labels.reverse()
  }




  initAxisY() {
    // 创建Y轴数据
    let yVal = this.createAxisY()
    const yPosInterval = this.drawHeight / 8
    yVal.map((value, index) => {
      const yDiff = this.drawHeight - (yPosInterval * index)
      this.drawYAxis(value, yDiff)
    })
  }
  drawYAxis(yTextValue, yDiff) {
    const {containertem} = this
    const x1 = 6
    const yTextDiff = 0
    let rect = util.clientRect(containertem)
    const {width} = rect
    const yLine = util.drawY(x1, width - 15, yDiff, yTextDiff, yTextValue)
    
    containertem.appendChild(yLine)
  }
  createAxisY() {
    return this.getAxisYValue()
  }
  getAxisYValue() {
    const {configData} = this
    let confiarr = configData[0].values
    return confiarr.sort(function(a,b){
      return a-b
    })
  }
}

export default AxisCharts
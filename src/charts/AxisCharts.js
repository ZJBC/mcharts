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
    this.diffLen = data.datasets[0].values.length
    this.config = args
    this.xPositons = []
    this.yPositons = []
    this.allVal = []
    this.initAxisY()  // 创建Y
    this.initAxisX()   // 创建X
  }

  initAxisX() {
    // 创建X轴数据
    let xVal = this.createAxisX()
    const xPosInterval = this.drawWidth / this.diffLen
    xVal.map((value, index) => {
      const xDiff = this.drawWidth - (xPosInterval * index)
      this.xPositons.push(xDiff)
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
    console.log("frfarererterre发撒的发生地方都是", this)
    let yVal = this.createAxisY()
    const yPosInterval = this.drawHeight / this.diffLen
    yVal.map((value, index) => {
      const yDiff = this.drawHeight - (yPosInterval * index)
      this.yPositons.push(yDiff)
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
    let allVal = []
    this.configData.forEach(element => {
      allVal = allVal.concat(element.values)
    })
    this.allVal = allVal
    return this.getAxisYValue(allVal)
  }
  getAxisYValue(allVal) {

    // const {configData} = this
    // let confiarr = configData[0].values
   console.log("谁发个啥粉色啊",allVal)
    const max = Math.max(...allVal)
    const min = Math.min(...allVal)
    const interval = (max - min) / this.diffLen + 2
    const middle = (max + min) / 2
    const yAxisValues = []
    for (let i = 0; i < this.diffLen; i++) {
      const firstValue = middle - interval * 3
      const value = firstValue + (interval * i)
      // const value = interval+allVal[i]
      yAxisValues.push(Math.floor(value)-5)
    }
    
    // console.log("个人供热哥特瑞特让他热我考虑率来看地方 ", confiarr)
    console.log("水电费发放更多的是", yAxisValues)
    return yAxisValues.sort(function(a,b){
      return a-b
    })
  }
}

export default AxisCharts
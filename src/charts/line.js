/**
 * 线图 line
 * 
    
 */
import AxisCharts from './AxisCharts'
import Tooltip from '../component/toolTip'
import util from '../util'

class Line extends AxisCharts  {
  constructor(arg) {
    super(arg)
    this.tooltip = new Tooltip() // 提示拿过来
    this.init()
  }
  init() {
    // 链接点之间的线
    this.getLinkLine()
    // 添加事件
    this.addLineEvent()
  }
  addLineEvent() {
    const {container} = this.config
    container.addEventListener('mousemove', this.mouseMove.bind(this))
    container.addEventListener('mouseleave', this.mouseLeave.bind(this))
  }
  mouseMove(e) {
    console.log("fsdfsdfsdf", e)
    const {container} = this.config
    const {pageX, pageY} = e
    let rect = util.clientRect(container)
    let endX = pageX - rect.left
    let endY = pageY - rect.top
    const activeIndex = Math.floor(endX / this.xPosInterval)
   console.log("fertfertrertreg防守打法", activeIndex)
    this.hoverSlice(activeIndex,endX,endY,container)
  }
  mouseLeave() {
    this.tooltip.getHideTooltip()
  }
  getConfigData(labels, configData, aindex) {
    let datas = configData.map(function(item, index){
      return  {
        label: labels,
        value: item.values[aindex],
      }
    })
    return datas
  }
  hoverSlice(i,endX,endY,container) {
    console.log("分割法都是GV地方是", i)
   
    const {labels,configData} = this
    let res = []
    for(let aindex in labels) {
      res.push(this.getConfigData(labels[aindex], configData, aindex))
    }
    console.log("范德萨大声道撒", res)
    this.tooltip.getShowTooltip(endX, endY, res[i], container)
    
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
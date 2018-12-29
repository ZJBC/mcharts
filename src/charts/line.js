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
    this.yPositionsToolTip = []
    this.init()
  }
  init() {
    // 链接点之间的线
    this.getLinkLine()
    // 添加事件
    this.addLineEvent()
  }
  addLineEvent() {
    // const {container} = this.config
    const {lineContainer} = this
    lineContainer.addEventListener('mousemove', this.mouseMove.bind(this))
    lineContainer.addEventListener('mouseleave', this.mouseLeave.bind(this))
  }
  mouseMove(e) {
    // const {container} = this.config
    const {lineContainer} = this
    const {pageX, pageY} = e
    let rect = util.clientRect(lineContainer)
    let endX = pageX - rect.left
    let endY = pageY - rect.top
    const activeIndex = Math.floor(endX / this.xPosInterval)
    if(activeIndex>=this.diffLen) {
      this.mouseLeave()
    } else {
      this.hoverSlice(activeIndex, lineContainer)
    }
  }
  mouseLeave() {
    this.tooltip.getHideTooltip()
  }
  getConfigData(labels, configData, aindex, colors) {
    let datas = configData.map(function(item, index){
      return  {
        title: item.title,
        value: item.values[aindex],
        colors: colors[index]
      }
    })
    return datas
  }
  getYitemDatas(configData, aindex) {
    // console.log("儿童热特瑞特人员投入和认同", configData)
    let datas = configData.map(function(item, index){
      return  item[aindex]
    })
    return datas
  }
  hoverSlice(i,lineContainer) {
    const {labels,configData} = this
    const {colors} = this.config
    let xitem = this.xPositons.concat()
    let yitem = this.yPositionsToolTip

    let res = []
    let yres = []
    for(let aindex in labels) {
      res.push(this.getConfigData(labels[aindex], configData, aindex, colors))
      yres.push(this.getYitemDatas(yitem, aindex))
    }
    
    let height = null
    let width = null
    let mchartstip = document.getElementById('mcharts-tip')
    if(mchartstip) {
      let mchartsTipClient = util.clientRect(mchartstip)
      console.log("范德萨发的所发生的", mchartsTipClient)
      height = mchartsTipClient.height
      width = mchartsTipClient.width
    }
    let y = height? Math.min(...yres[i])-height+20 :Math.min(...yres[i])
    let x = width? xitem.reverse()[i]-width/2+31: xitem.reverse()[i]
    
    this.tooltip.getShowTooltip(x, y, res[i], lineContainer, labels[i])
  }
  getToolTipY(res, indexs) {
    let datas = res.map(function(item, index){
      return  item.map(function(items){
        return  Math.max(items.value)
      })
    })
    return datas
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
   
    let yPositionsitem = yPositions.concat()
    yPositionsitem.reverse()
    this.yPositionsToolTip.push(yPositions)
    let lineList = yPositionsitem.map((yval, index) => {
      return `${this.xPositons[index]},${yval}`
    })
    let lineL = lineList.join("L")
    let createPath = util.createSVG({
      "d":`M${lineL}`,
      "stroke-width":1,
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
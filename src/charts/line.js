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
    const {mchartsContainer} = this
    mchartsContainer.addEventListener('mousemove', this.mouseMove.bind(this))
    mchartsContainer.addEventListener('mouseleave', this.mouseLeave.bind(this))
  }
  mouseMove(e) {
    const {mchartsContainer} = this
    const {pageX, pageY} = e
    let rect = util.clientRect(mchartsContainer)
    let endX = pageX - rect.left
    let endY = pageY - rect.top
    const activeIndex = Math.floor(endX / this.xPosInterval)
    if(activeIndex>=this.diffLen) {
      this.mouseLeave()
    } else {
      this.hoverSlice(activeIndex, mchartsContainer)
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
    let datas = configData.map(function(item, index){
      return  item[aindex]
    })
    return datas
  }
  hoverSlice(i,mchartsContainer) {
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
      height = mchartsTipClient.height
      width = mchartsTipClient.width
    }
    let y = height? Math.min(...yres[i])-25 :Math.min(...yres[i])
    let x = width? xitem.reverse()[i]-12: xitem.reverse()[i]
    this.tooltip.getShowTooltip(x, y, res[i], mchartsContainer, labels[i])
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

       let createCircleg = this.getCircleG()
       this.getCircle(item.values, colors[index], createCircleg, gLine)

       gLine.appendChild(createPath)
       containertem.appendChild(gLine)  // 连线
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
  getCircle(values, colors, createCircleg, gLine) {
    const yPositions = this.getYPosition(values)
   
    let yPositionsitem = yPositions.concat()
    yPositionsitem.reverse()
    this.yPositionsToolTip.push(yPositions)
    yPositionsitem.map((yval, index) => {
      let createCircle = util.createSVG({
        "fill":`${colors}`,
        "cx": `${this.xPositons[index]}`,
        "cy": `${yval}`,
        "r": "5" 
      },'circle')
      createCircleg.appendChild(createCircle)
      gLine.appendChild(createCircleg) // 连线间的圆
    })
  }
  // 创建getCircleG
  getCircleG() {
    let createG = util.createSVG({},'g')
    return createG
  }
}

export default Line
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
    this.tooltip = new Tooltip() // 提示拿过来
    this.init()
  }
  init() {
    this.getBarrect()  // 新建bar
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
    this.hoverSlice(activeIndex, mchartsContainer)
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
    let mchartstip = document.getElementById('mcharts-tip')
    if(mchartstip) {
      let mchartsTipClient = util.clientRect(mchartstip)
      height = mchartsTipClient.height
    }
    let y = height? Math.min(...yres[i]) :Math.min(...yres[i])
    let x = xitem.reverse()[i]+34
    this.tooltip.getShowTooltip(x, y, res[i], mchartsContainer, labels[i])
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
    const yPositions = util.getYPosition(values, this.yPositons)
    let yPositionsitem = yPositions.concat()
    yPositionsitem.reverse()
    this.yPositionsToolTip.push(yPositions)
    let lineList = yPositionsitem.map((yval, index) => {
      let translatew  = this.xPositons[index]-10

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
}

export default Bar
/**
 * 饼图 pie
 * 
 *  MoveTo(缩写成M或m)
    LineTo(缩写成L或l)
    CurveTo(缩写成C或c)
    ArcTo(缩写成A或a)
    ClosePath(缩写成Z或z)
 */
import baseCharts from './baseCharts'
import Tooltip from '../component/toolTip'
import util from '../util'

class Pie extends baseCharts {
  constructor(arg) {
    super(arg)
    this.grandTotal = 0 // 总数
    // this.raduis = 85 // 半径
    this.svgDom = null
    this.path = null
    this.pathActiveSliceIndex = null // 当前path index
    this.pathActive  = null
    this.tooltip = new Tooltip() // 提示拿过来
    this.properties = []  // 所有一开始的角度
    this.beginAngel = 0 // 开始初始角度

    this.init()
  }
  init() {
    // 计算总数量
    this.grandTotal = this.getPieNum()
    // 计算每一项的比例
    let pieScale = this.getScale(this.grandTotal)
    // 计算每一项的角度
    this.getAngle()
    // svg path路径
    let svgPath = this.getSvgPath(pieScale)
    // 创建一个svg容器
    this.getContainer()
    // 创建svgpath容器
    this.getPathContainer(svgPath)
    // 添加事件
    this.addEvent()
    // 渲染 svg
    this.render()

  }
  getPieNum() {
    const {values} = this.configData.datasets[0]
    console.log("数量", values)
    return values.reduce((pre, next) => pre + next)
  }
  getAngle() {
    const {values} = this.configData.datasets[0]
    let a = values.map(total => {
      return (total/this.grandTotal)*360
    })
    this.properties = a.reverse()
  }
  getScale(pieNum) {
    const {values} = this.configData.datasets[0]
    return values.map(item => item / pieNum)
  }
  getSvgPath(pieScale, hoverDiff=0) {
    console.log("fesfas",pieScale)
    let startAngle = this.beginAngel
    let endangle = this.beginAngel
    let largeFlag = 0

    let pathArr = []
    pieScale.forEach((element, index) => {
      endangle = startAngle + element * Math.PI * 2
      if (endangle - startAngle > Math.PI) {
        largeFlag = 1
      }
      let x1 = 200 + this.raduis * Math.sin(startAngle)
      let y1 = 200 - this.raduis * Math.cos(startAngle)
      let x2 = 200 + this.raduis * Math.sin(endangle)
      let y2 = 200 - this.raduis * Math.cos(endangle)
      const path = 
      `M${200+hoverDiff} ${200+hoverDiff}
      L ${x1+hoverDiff} ${y1+hoverDiff}
      A ${this.raduis} ${this.raduis} 0 ${largeFlag} 1 ${x2+hoverDiff} ${y2+hoverDiff}
      Z`
      startAngle = endangle
      pathArr.push(path)
    })
    
    return pathArr
  }
  render() {
    this.mchartsContainer.appendChild(this.svgDom)
  }
  getContainer() {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg:svg')
    svg.setAttribute('width', this.chartsWidth + '')
    svg.setAttribute('height', this.chartsHeight + '')
    svg.setAttribute('viewBox', '0 0 ' + this.chartsWidth + ' ' + this.chartsHeight)
    this.svgDom = svg
  }
  getPathContainer(svgPath) {
    // <path d="M100 100 A 40 40 0 0 0 140 60" fill="transparent" stroke="#03a9f4" stroke-width="3"/>
    let pathDom = []
    svgPath.forEach((item, index) => {
      let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', item)
      path.setAttribute('stroke-width', '2')
      path.setAttribute('fill', this.config.colors[index])
      pathDom.push(path)
      this.svgDom.appendChild(path)
    })
    this.path = pathDom
  }
  addEvent() {
    this.mchartsContainer.addEventListener('mousemove', this.mouseMove.bind(this))
    this.mchartsContainer.addEventListener('mouseleave', this.mouseLeave.bind(this))
  }
  mouseMove(e){
    const {target} = e
    let prevIndex = this.pathActiveIndex
		let prevAcitve = this.pathActive
    if(this.path.includes(target)) {
      let i = this.path.indexOf(target)
      this.hoverSlice(prevAcitve, prevIndex,false)
      this.pathActive = target
			this.pathActiveIndex = i
			this.hoverSlice(target, i, true, e)
    } else {
      this.mouseLeave()
    }
  }
  hoverSlice(path,i,flag,e){
		if(!path) return
		if(flag) {
      const {pageX, pageY} = e
      const {colors} = this.config
      const {mchartsContainer} = this
      let rect = util.clientRect(mchartsContainer)
      let endX = pageX - rect.left
      let endY = pageY - rect.top
      const {labels, datasets} = this.configData
      let configdata = this.getConfigData(labels, datasets[0], colors)
      let len = this.properties.length-1
      util.transForm(path, this.calTranslateByAngle(i,this.properties[len-i]))
      this.tooltip.getShowTooltip(endX, endY, configdata[i], mchartsContainer, labels[i])
		} else {
      util.transForm(path,'translate3d(0px, 0px, 0px)')
      this.tooltip.getHideTooltip()
		}
	}
  mouseLeave() {
    this.hoverSlice(this.pathActive,this.pathActiveIndex,false)
  }
  calTranslateByAngle(i, angle) {
    let len = this.properties.length-1
    let ress = this.properties.reduce(function(pre,cur,index){
      if(i == len) {
        return 180
      }
      if(index<len-i){
        return pre+cur
      }
      return pre+0
    },0)
    let res = 0
    if(i == len) {
      res =ress
    } else {
      res=ress+180
    }
    const position = util.positionByAngle(res+angle/2, this.raduis)
    return `translate3d(${(position.x * 0.1)}px, ${(position.y*0.1)}px, 0)`
  }
  getConfigData(labels, datasets, colors) {
    let datas = labels.map(function(item, index){
    // let datas = configData.map(function(item){
      return  [{
        title: datasets.title,
        value: datasets.values[index],
        colors: colors[index]
      }]
    })
    return datas
  }
}

export default Pie
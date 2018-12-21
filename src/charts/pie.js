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

class Pie extends baseCharts {
 
  constructor(arg) {
    super(arg)
    this.raduis = 50 // 半径
    this.width = 400  // svg
    this.height = 400  // svg
    this.svgDom = null
    this.init()
  }
  init() {
    // 计算总数量
    let pieNum = this.getPieNum()
    // 计算每一项的比例
    let pieScale = this.getScale(pieNum)
    // svg path路径
    let svgPath = this.getSvgPath(pieScale)
    // 创建一个svg容器
    this.getContainer()
    // 创建svgpath容器
    this.getPathContainer(svgPath)
    // 渲染 svg
    this.render()

  }
  getPieNum() {
    const {values} = this.configData.datasets[0]
    console.log("数量", values)
    return values.reduce((pre, next) => pre + next)
  }
  getScale(pieNum) {
    const {values} = this.configData.datasets[0]
    return values.map(item => item / pieNum)
  }
  getSvgPath(pieScale) {
    let pathArr = []
    let start = 90
    let end = 90
    pieScale.forEach(element => {
      end = start + element * Math.PI * 2
      var x1 = 200 + this.raduis * Math.sin(start)
      var y1 = 200 - this.raduis * Math.cos(start)
      var x2 = 200 + this.raduis * Math.sin(end)
      var y2 = 200 - this.raduis * Math.cos(end)
      const path = 
      `M200 200
      L ${x1} ${y1}
      A ${this.raduis} ${this.raduis} 0 0 1 ${x2} ${y2}
      Z`
      start = end
      pathArr.push(path)
    })
    
    return pathArr
  }
  render() {
    const {container} = this.config
    container.appendChild(this.svgDom)
  }
  getContainer() {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg:svg')
    svg.setAttribute('width', this.width + '')
    svg.setAttribute('height', this.height + '')
    svg.setAttribute('viewBox', '0 0 ' + this.width + ' ' + this.height)
    this.svgDom = svg
  }
  getPathContainer(svgPath) {
    // <path d="M100 100 A 40 40 0 0 0 140 60" fill="transparent" stroke="#03a9f4" stroke-width="3"/>
    svgPath.forEach((item, index) => {
      let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', item)
      path.setAttribute('stroke-width', '2')
      path.setAttribute('fill', this.config.colors[index])
      this.svgDom.appendChild(path)
    }) 
  }
}

export default Pie
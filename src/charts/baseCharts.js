/**
 * 基础charts
 */
import util from '../util'
class baseCharts {
  constructor(args) {
    console.log("基础组件", args)
    const { data, type, container, title, width, radius} = args
    this.configData = data
    this.labels = data.labels
    this.chartsTitle = title  //charts标题
    this.type = type
    this.chartsWidth = width || 600  //charts宽度
    this.chartsHeight = 400
    this.config = args
    this.containertem = null
    this.mchartsContainer = null
    this.raduis = radius >400? 180: radius
    this.initBaseContainer(container)
    // this.resize()
  }
  initBaseContainer(container) {
    const containerHtml = `
    <div class="chart-container">
      <div class="mcharts-container-chartstitle">${this.chartsTitle}</div>
      <div class="mcharts-container-charts" id="aa"></div>
    </div>`
    container.innerHTML = containerHtml  // 设置外层容器
    this.mchartsContainer = container.querySelector('.mcharts-container-charts')

    if(this.type === 'line') {
      this.createElement()
      
    }
  }
  resize() {
		window.addEventListener('resize', this.resizeDraw.bind(this))
	}
  resizeDraw() {
    let dom = document.getElementById('line-mcharts')
    let domaa = document.getElementById('aa')
    let rect = util.clientRect(dom)
    const {width} = rect
    console.log(`{}}{}}{}{}{}`,rect)
    this.chartsWidth = width
    domaa.removeChild(this.containertem)
    this.createElement()
  }
  createElement() {
    let svgDom = util.createSVG({
      width: this.chartsWidth,
      height: this.chartsHeight,
      xmlns: "http://www.w3.org/2000/svg"
    },'svg')
    this.mchartsContainer.appendChild(svgDom)
    this.containertem = svgDom
  }
}

export default baseCharts
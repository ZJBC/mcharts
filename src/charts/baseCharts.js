/**
 * 基础charts
 */
import util from '../util'
class baseCharts {
  constructor(args) {
    console.log("基础组件", args)
    const { data, type, container, title, width, height} = args
    this.configData = data
    this.labels = data.labels
    this.chartsTitle = title  //charts标题
    this.type = type
    this.chartsWidth = width  //charts宽度
    this.chartsHeight = height || 400
    this.config = args
    this.containertem = null
    this.lineContainer = null

    this.initBaseContainer(container)
  }
  initBaseContainer(container) {
    const containerHtml = `
   
    <div class="chart-container">
      <div class="mcharts-container-chartstitle">${this.chartsTitle}</div>
      <div class="mcharts-container-chartsline"></div>
    </div>`
    container.innerHTML = containerHtml  // 设置外层容器
    this.lineContainer = container.querySelector('.mcharts-container-chartsline')

    if(this.type === 'line') {
      let svgDom = util.createSVG({
        width: this.chartsWidth,
        height: this.chartsHeight,
        xmlns: "http://www.w3.org/2000/svg"
      },'svg')
      this.lineContainer.appendChild(svgDom)
      // container.appendChild(svgDom)
      this.containertem = svgDom
    }

  }
}

export default baseCharts
/**
 * 基础charts
 */
import util from '../util'
class baseCharts {
  constructor(args) {
    console.log("基础组件", args)
    const { data, type, container, title} = args
    this.configData = data
    this.labels = data.labels
    this.chartsTitle = title
    this.type = type
    this.config = args
    this.containertem = null
    this.lineContainer = null

    this.initBaseContainer(container)
  }
  initBaseContainer(container) {
    const containerHtml = `
    <div class="mcharts-container-chartstitle">${this.chartsTitle}</div>
    <div class="chart-container">
      <div class="mcharts-container-chartsline"></div>
    </div>`
    container.innerHTML = containerHtml  // 设置外层容器
    this.lineContainer = container.querySelector('.mcharts-container-chartsline')

    if(this.type === 'line') {
      let svgDom = util.createSVG({
        width: 400,
        height: 400,
        xmlns: "http://www.w3.org/2000/svg"
      },'svg')
      this.lineContainer.appendChild(svgDom)
      // container.appendChild(svgDom)
      this.containertem = svgDom
    }

  }
}

export default baseCharts
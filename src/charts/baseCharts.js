/**
 * 基础charts
 */
import util from '../util'
class baseCharts {
  constructor(args) {
    console.log("基础组件", args)
    const { data, type, container } = args
    this.configData = data
    this.labels = data.labels
    this.title = data.title
    this.type = type
    this.config = args
    this.containertem = container

    // this.initBase()
    if(type === 'line') {
      let svgDom = util.createSVG({
        width: 400,
        height: 400,
        xmlns: "http://www.w3.org/2000/svg"
      },'svg')
      container.appendChild(svgDom)
      this.containertem = svgDom
      
    }
  }
  initBase() {
    console.log('initBase')
  }
}

export default baseCharts
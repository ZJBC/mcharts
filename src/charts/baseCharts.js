/**
 * 基础charts
 */
class baseCharts {
  constructor(args) {
    console.log("基础组件", args)
    const { data, type } = args
    this.configData = data
    this.labels = data.labels
    this.title = data.title
    this.type = type
    this.config = args
    // this.initBase()
  }
  initBase() {
    console.log('initBase')
  }
}

export default baseCharts
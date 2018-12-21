/**
 * 基础charts
 */
class baseCharts {
  constructor(args) {
    console.log("基础组件", args)
    this.configData = args.data
    this.config = args
    // this.initBase()
  }
  initBase() {
    console.log('initBase')
  }
}

export default baseCharts
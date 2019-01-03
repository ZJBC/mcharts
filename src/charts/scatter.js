/**
 * 柱状图 bar
 * 
    
 */
import AxisCharts from './AxisCharts'
import Tooltip from '../component/toolTip'
import util from '../util'
class Scatter extends AxisCharts{
  constructor(arg) {
    super(arg)
    this.init()
  }
  init() {
    console.log("个发生的范德萨是散点图")
  }
}

export default Scatter
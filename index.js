import Pie  from './src/charts/pie'
import Line  from './src/charts/line'
import './src/css/index.css'
export default class Mcharts {
  constructor(args) {
    // 初始化charts
    console.log("图片发的所发生的", args)
    switch (args.type) {
      case 'line': {
        return new Line(args)
      }
      case 'pie': {
        return new Pie(args)
      }
      default:
        break
    }   
  }
}
const mcharts = new Mcharts({
  container: document.getElementById('line-mcharts'),
  title: 'line-mcharts',
  data: {
    labels: ["a1", "a2","a3","a4","a5","a6","a7","a8"],
    // labels: ["12am-3am", "3am-6am"],
    datasets: [
      {
        title: "line",
        values: [47, 27,96,84,35,17,110,63]
      }
    ]
  },
  type: 'line',
  height: 250,
  colors: [ 'red', '#7cd6fd','#743ee2']
})
console.log("发送到发送到发送到", mcharts)
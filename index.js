import Pie  from './src/charts/pie'
import Line  from './src/charts/line'
import Bar  from './src/charts/bar'
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
      case 'bar': {
        return new Bar(args)
      }
      default:
        break
    }   
  }
}
new Mcharts({
  container: document.getElementById('bar-mcharts'),
  title: 'bar-mcharts',
  data: {
    labels: ["a1", "a2","a3","a4","a5","a6","a7","a8"],
    // labels: ["12am-3am", "3am-6am"],
    datasets: [
      {
        title: "line1111",
        values: [80, 47,26,64,53,71,10,83]
      }
      // ,
      // {
      //   title: "line1111",
      //   values: [47, 27,96,84,35,17,110,54]
      // },
      // {
      //   title: "line1111",
      //   values: [90, 27,66,84,75,17,64,63]
      // },
      // {
      //   title: "line1111",
      //   values: [78, 27,46,84,35,17,34,63]
      // },
      // {
      //   title: "line1111",
      //   values: [34, 27,96,84,35,17,110,65]
      // },
      // {
      //   title: "line1111",
      //   values: [63, 27,96,84,35,17,67,76]
      // },
      // {
      //   title: "line1111",
      //   values: [86, 27,96,56,54,17,110,78]
      // },
      // {
      //   title: "line1111",
      //   values: [90, 83,96,84,12,17,110,90]
      // },
      // {
      //   title: "line1111",
      //   values: [47, 27,91,86,37,17,110,84]
      // }
    ]
  },
  width: 600,
  type: 'bar',
  colors: [ 'red']
  
  // type: 'line',
  // colors: [ 'red', '#000', '#7cd6fd', '#000', 'red', '#7cd6fd', '#ccc', 'blue'],
  // radius: 80
})
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
// new Mcharts({
//   container: document.getElementById('line-mcharts'),
//   title: 'line-mcharts',
//   data: {
//     labels: ["a1", "a2","a3","a4","a5","a6","a7","a8"],
//     // labels: ["12am-3am", "3am-6am"],
//     datasets: [
//       {
//         title: "line1",
//         values: [47, 27,96,84,35,17,110,63]
//       },
//       {
//         title: "line2",
//         values: [20, 40,66,35,84,76,10,110]
//       },
//       {
//         title: "line3",
//         values: [10, 50,6,35,84,66,90,70]
//       }
//     ]
//   },
//   // type: 'pie',
//   // colors: [ 'red', '#000', '#7cd6fd']
  
//   type: 'pie',
//   colors: [ 'red', '#000', '#7cd6fd', '#000', 'red', '#7cd6fd', '#ccc', 'blue']
// })
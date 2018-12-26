import Pie  from './src/charts/pie'
import './src/css/index.css'

export default class Mcharts {
  constructor(arg) {
    // 初始化charts
    return new Pie(arg)
  }
}

// const mcharts = new Mcharts({
//   container: document.getElementById('pie-mcharts'),
//   title: 'pie-mcharts',
//   data: {
//     labels: ["12am-3am", "3am-6am", "6am-9am", "9am-12pm",
//     "12pm-3pm", "3pm-6pm", "6pm-9pm", "9pm-11pm"],
//     // labels: ["12am-3am", "3am-6am"],
//     datasets: [
//       {
//         title: "pie",
//         values: [47, 27,96,84,35,17,110,63]
//         // values: [50,50]
//       }
//     ]
//   },
//   type: 'pie',
//   height: 250,
//   colors: [ 'red', '#7cd6fd','#743ee2','#b554ff', '#f0f4f7','yellow',"red","#743ee2"]
// })
// console.log("发送到发送到发送到", mcharts)
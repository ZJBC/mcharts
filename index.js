import Pie  from './src/charts/pie'

export default class Mcharts {
  constructor(arg) {
    // 初始化charts
    return new Pie(arg)
  }
}


const mcharts = new Mcharts({
  container: document.getElementById('root'),
  title: 'pie-mcharts',
  data: {
    labels: [
      '12am-3am',
      '3am-6pm',
      '6am-9am',
      '9am-12am'
    ],
    datasets: [
      {
        values: [25, 25, 25, 25]
      }
    ]
  },
  type: 'pie',
  height: 250,
  colors: ['#7cd6fd', 'violet', 'blue', 'red',  '']
})
console.log("发送到发送到发送到", mcharts)
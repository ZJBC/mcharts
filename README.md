## 步骤
*install 安装
> npm install mcharts


*如何使用
```js
import { Mcharts } from "mcharts"
const mcharts = new Mcharts({
  container: document.getElementById('pie-mcharts'),  // dom 节点,
  title: 'pie-mcharts',  // 标题
  data: {
    labels: ["12am-3am", "3am-6am", "6am-9am", "9am-12pm",
    "12pm-3pm", "3pm-6pm", "6pm-9pm", "9pm-11pm"],  // 所需label
    datasets: [
      {
        title: "pie",
        values: [47, 27,96,84,35,17,110,63]       // 所需数据
      }
    ]
  },
  type: 'pie',   // 类型   pie饼图   line线
  colors: [ 'red', '#7cd6fd','#743ee2','#b554ff', '#f0f4f7','yellow',"red","#743ee2"]   // 对应数据的颜色
})
```
## 本地启动浏览步骤
* 安装
> npm install

* 启动
> npm start    浏览http://0.0.0.0:9000/

* 入口文件
> https://github.com/ZJBC/mcharts/blob/master/index.js



## 在项目中使用
* 安装
>npm install mcharts    

* 如何使用
```js
import { Mcharts } from "mcharts"
  new Mcharts({
    container: document.getElementById('line-mcharts'),
    title: 'line-mcharts',
    data: {
      labels: ["a1", "a2","a3","a4","a5","a6","a7","a8"],  // pie
      // labels: ["12am-3am", "3am-6am"],   // line
      datasets: [
        {
          title: "line1",
          values: [47, 27,96,84,35,17,110,63]
        },
        {
          title: "line2",
          values: [20, 40,66,35,84,76,10,110]
        },
        {
          title: "line3",
          values: [10, 50,6,35,84,66,90,70]
        }
      ]
    },
    // type: 'line',
    // colors: [ 'red', '#000', '#7cd6fd']
    
    type: 'pie', //  现在支持  pie饼图  line 折线图
    colors: [ 'red', '#000', '#7cd6fd', '#000', 'red', '#7cd6fd', '#ccc', 'blue']
  })
})
```
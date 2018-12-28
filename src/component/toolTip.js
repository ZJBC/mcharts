/**
 * 从pie中抽出一个tooltip组件
 */
class Tooltip {
  constructor() {
    this.divDom = document.createElement('div') // 每次经过创建一个div
    this.divDom.className = 'mcharts-tip'
  }
  /**
   * 
   * @param {endX} 坐标x 
   * @param {endY} 坐标Y
   * @param {values} 显示信息
   * @param {container} 添加的容器
   * @param {label} tooltip标题
   */
  getShowTooltip(endX, endY, values, container, label) {
    console.log("加热itueirturereqwen", values)
    this.clearTooltip()
    const tooltipVal = values.map((item) => {
      return `<div class="data-list-nav"><div class="data-list-title">${item.title}:</div><div class="data-list-val"><span class="data-list-circle" style="background:${item.colors}"></span>${item.value}</div></div>`
    })

    this.divDom.innerHTML = `<div>
                                <span class="title">${label}</span>
                                <div class="data-list"></div>
                              </div>`
    this.divDom.style.top = `${endY}px`
    this.divDom.style.left = `${endX}px`
    this.divDom.style.display = 'block'
    this.divDom.querySelector('.data-list').innerHTML = tooltipVal.join('')
    container.appendChild(this.divDom)
  }
  clearTooltip() {
    this.divDom.innerHTML = ''
  }
  getHideTooltip() {
    this.divDom.style.display = 'none'
    this.divDom.style.top = '0'
    this.divDom.style.left = '0'
  }
}
export default Tooltip
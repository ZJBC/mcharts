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
   */
  getShowTooltip(endX, endY, values, container) {
    this.clearTooltip()
    const valueTpls = values.map((item) => {
      return `<div>
                  <p>label:${item.label}</p>
                  <p>value:${item.value}</p>
              </div>`
    })

    this.divDom.innerHTML = `
    <div>
      <span class="title">标题</span>
      <div class="data-list"></div>
    </div>
    `
    this.divDom.style.top = `${endY}px`
    this.divDom.style.left = `${endX}px`
    this.divDom.style.display = 'block'
    this.divDom.querySelector('.data-list').innerHTML = valueTpls
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
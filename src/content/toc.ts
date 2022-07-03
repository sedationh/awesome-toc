import {
  buildNestedTokenDOMs,
  iterateNestedTokenDOMs,
  NestedTokenDOM,
} from './preprocess'
import { $root, initTOCDisplayComponent, reloadTOCDisplayComponent } from './ui'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Options {}

// TODO: 曝光时长统计 -> 颜色
class TOC {
  options: Options
  tokenDOMs: HTMLElement[]
  visible = true

  static singleInstance: TOC | undefined

  static createTOC = (tokenDOMs: HTMLElement[], options: Options) => {
    const instance = new TOC(tokenDOMs, options)
    TOC.singleInstance = instance
    return instance
  }

  constructor(tokenDOMs: HTMLElement[], options: Options) {
    this.tokenDOMs = tokenDOMs
    this.options = options

    const nestedTokenDOMs = buildNestedTokenDOMs(tokenDOMs)
    const treeData = this.adaptTreeDataFromNestedTokenDOMs(nestedTokenDOMs)
    const DOM2keyMap = this.getDOM2keyMap(nestedTokenDOMs)
    if (TOC.singleInstance === undefined) {
      initTOCDisplayComponent(treeData, DOM2keyMap)
    } else {
      reloadTOCDisplayComponent(treeData, DOM2keyMap)
    }
  }

  adaptTreeDataFromNestedTokenDOMs(nestedTokenDOMs) {
    return iterateNestedTokenDOMs(nestedTokenDOMs, (nestedTokenDOM) => {
      nestedTokenDOM.title = nestedTokenDOM.dom.textContent
    })
  }

  getDOM2keyMap(nestedTokenDOMs: NestedTokenDOM[]) {
    const map = new Map()
    iterateNestedTokenDOMs(nestedTokenDOMs, (nestedTokenDOM) => {
      map.set(nestedTokenDOM.dom, nestedTokenDOM.key)
    })
    return map
  }

  toggle() {
    if (this.visible) {
      this.hide()
    } else {
      this.show()
    }
  }

  show() {
    // TODO: show
    this.visible = true
    chrome.runtime.sendMessage('show')
    $root.style.display = 'block'
  }
  hide() {
    // TODO: hide
    this.visible = false
    chrome.runtime.sendMessage('hide')
    $root.style.display = 'none'
  }
}

export { TOC }

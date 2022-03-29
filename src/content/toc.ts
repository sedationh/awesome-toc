import {
  buildNestedTokenDOMs,
  iterateNestedTokenDOMs,
  NestedTokenDOM,
} from './preprocess'
import { initTOCDisplayComponent } from './ui'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Options {}

// TODO: 曝光时长统计 -> 颜色
class TOC {
  options: Options
  tokenDOMs: HTMLElement[]

  constructor(tokenDOMs: HTMLElement[], options: Options) {
    this.tokenDOMs = tokenDOMs
    this.options = options

    const nestedTokenDOMs = buildNestedTokenDOMs(tokenDOMs)
    const treeData = this.adaptTreeDataFromNestedTokenDOMs(nestedTokenDOMs)
    const DOM2keyMap = this.getDOM2keyMap(nestedTokenDOMs)
    initTOCDisplayComponent(treeData, DOM2keyMap)
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

  remove() {
    // TODO: remove
  }
  show() {
    // TODO: show
  }
  hide() {
    // TODO: hide
  }
}

const createTOC = (tokenDOMs: HTMLElement[], options: any) => {
  return new TOC(tokenDOMs, options)
}

export { TOC, createTOC }

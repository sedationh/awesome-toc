import { NodeData, TreeData } from '@sedationh/react-tree'
import {
  buildNestedTokenDOMs,
  iterateNestedTokenDOMs,
  NestedTokenDOM,
} from './preprocess'
import { initTOCDisplayComponent } from './ui'

// TODO: 曝光时长统计 -> 颜色
class TOC {
  options: any
  tokenDOMs: HTMLElement[]

  constructor(tokenDOMs: HTMLElement[], options: any) {
    this.tokenDOMs = tokenDOMs
    this.options = options

    const nestedTokenDOMs = buildNestedTokenDOMs(tokenDOMs)
    const treeData = this.adaptTreeDataFromNestedTokenDOMs(nestedTokenDOMs)
    const DOM2keyMap = this.getDOM2keyMap(nestedTokenDOMs)
    initTOCDisplayComponent(treeData, DOM2keyMap)
  }

  adaptTreeDataFromNestedTokenDOMs(
    nestedTokenDOMs: NestedTokenDOM[],
  ): TreeData {
    return iterateNestedTokenDOMs<NodeData>(
      nestedTokenDOMs,
      (nestedTokenDOM) => {
        nestedTokenDOM.title = nestedTokenDOM.dom.textContent
      },
    )
  }

  getDOM2keyMap(nestedTokenDOMs: NestedTokenDOM[]) {
    const map = new Map()
    iterateNestedTokenDOMs(nestedTokenDOMs, (nestedTokenDOM) => {
      map.set(nestedTokenDOM.dom, nestedTokenDOM.key)
    })
    return map
  }

  remove() {}
  show() {}
  hide() {}
}

const createTOC = (tokenDOMs: HTMLElement[], options: any) => {
  return new TOC(tokenDOMs, options)
}

export { TOC, createTOC }

import { deepClone } from "./utils"

const extractArticle = (): HTMLElement | null => {
  // TODO: 利用权重分析文章的 article element
  return document.querySelector("article") || document.querySelector(".content")
}

const extractTokenDOMs = (articleDOM: HTMLElement | null): HTMLElement[] => {
  if (!articleDOM) return []
  return Array.from(articleDOM.querySelectorAll("h1,h2,h3"))
}

export class NestedTokenDOM {
  dom: HTMLElement
  children: NestedTokenDOM[]
  // 依赖于层级关系生成
  key: string

  constructor(tokenDOM: HTMLElement) {
    this.dom = tokenDOM
    this.children = []
    this.key = ""
  }
}

const buildNestedTokenDOMs = (tokenDOMs: HTMLElement[]): NestedTokenDOM[] => {
  let nestedTokenDOMs: NestedTokenDOM[] = []
  try {
    for (const tokenDOM of tokenDOMs) {
      const currentNestedTokenDOM = new NestedTokenDOM(tokenDOM)
      nestTokenDOMs(nestedTokenDOMs, currentNestedTokenDOM)
    }
  } catch (error) {
    console.log("buildNestedTokenDOMs 失败", error)
  }

  return nestedTokenDOMs
}

function iterateNestedTokenDOMs<T>(
  nestedTokenDOMs: NestedTokenDOM[],
  callback: (nestedTokenDOM: NestedTokenDOM & T) => void
) {
  const clonedNestedTokenDOMs = deepClone(nestedTokenDOMs)
  dfs(clonedNestedTokenDOMs)

  function dfs(nestedTokenDOMs) {
    for (const nestedTokenDOM of nestedTokenDOMs) {
      callback(nestedTokenDOM)
      nestedTokenDOM.children?.length && dfs(nestedTokenDOM.children)
    }
  }

  return clonedNestedTokenDOMs
}

export {
  extractArticle,
  extractTokenDOMs,
  buildNestedTokenDOMs,
  iterateNestedTokenDOMs,
}

function getLastItem(array) {
  return array[array.length - 1]
}
function getLastItemIndex(array) {
  return array.length - 1
}

function getHeadingLevel(nestedTokenDOM: NestedTokenDOM) {
  return +nestedTokenDOM.dom.tagName.split("H").join("")
}

/*
  关键方法，完成每一个新加入的 nestedTokenDOMs 的位置存放
  最终形成嵌套的 NestedTokenDOM[]
  1. 进来的顺序表示了相对位置
  2. 标签的类型代表了层级大小

  input:
  [
    {
      tagName: h1,
      key: 0,
      children: [
        {
          tagName: h3,
        }
      ]
    }
  ]
  {
    tagName: h2
  }
  
  output
  [
    {
      tagName: h1,
      key: 0,
      children: [
        {
          tagName: h3,
        },
        {
          tagName: h2
        }
      ]
    }
  ]
*/
function nestTokenDOMs(
  nestedTokenDOMs: NestedTokenDOM[],
  currentNestedTokenDOM: NestedTokenDOM
) {
  let children = nestedTokenDOMs
  let lastItem = getLastItem(children)
  let lastItemIndex = getLastItemIndex(children)
  const lastItemLevel = lastItem ? getHeadingLevel(lastItem) : Infinity
  const currentLevel = getHeadingLevel(currentNestedTokenDOM)
  let cnt = currentLevel - lastItemLevel
  const keyArray = []

  // 最终定位到要进行添加的children
  while (cnt > 0) {
    lastItem = getLastItem(children)
    lastItemIndex = getLastItemIndex(children)
    if (!lastItem) return
    keyArray.push(lastItemIndex)
    children = lastItem.children
    cnt--
  }

  children.push(currentNestedTokenDOM)
  lastItemIndex = getLastItemIndex(children)
  keyArray.push(lastItemIndex)
  currentNestedTokenDOM.key = keyArray.join("-")
}
/*
  tip:
    textContent returns every element in the node. 
    In contrast, innerText is aware of styling and won't return the text of "hidden" elements.
      Moreover, since innerText takes CSS styles into account, 
      reading the value of innerText triggers a reflow to ensure up-to-date computed styles.
      (Reflows can be computationally expensive, and thus should be avoided when possible.)
*/

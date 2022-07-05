import logger from '../utils/log'
import { extractArticle, extractTokenDOMs } from './preprocess'
import { TOC } from './toc'

let toc: TOC
let cachedLoadPattern = '0'

;(async function () {
  // @ts-ignore
  const { loadPattern } = await chrome.storage.local.get(['loadPattern'])
  logger.info('content script load 前 获得到的用户配置', { loadPattern })
  cachedLoadPattern = loadPattern
  if (loadPattern === '0') return
  load()
})()

function load() {
  const article = extractArticle()
  const tokenDOMs = extractTokenDOMs(article)

  logger.info({ article, tokenDOMs })
  if (!tokenDOMs?.length) {
    logger.info('there is no article / headings')
  }
  toc = TOC.createTOC(tokenDOMs, {})
}

let lastUrl = location.href
setInterval(() => {
  const url = location.href
  if (url === lastUrl) {
    return
  }
  lastUrl = url
  onUrlChange()
}, 200)

function onUrlChange() {
  setTimeout(() => {
    if (cachedLoadPattern === '0') {
      return
    }
    load()
  }, 200)
}

chrome.runtime.onMessage.addListener((command) => {
  logger.info('content script received command', command)
  if (!toc) {
    load()
  } else {
    toc.toggle()
  }
  return true
})

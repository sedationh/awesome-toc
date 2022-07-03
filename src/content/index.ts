import logger from '../utils/log'
import { extractArticle, extractTokenDOMs } from './preprocess'
import { TOC } from './toc'

let toc: TOC
;(async function () {
  // @ts-ignore
  const { loadPattern } = await chrome.storage.local.get(['loadPattern'])
  logger.info('content script load 前 获得到的用户配置', { loadPattern })
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
new MutationObserver(() => {
  const url = location.href
  if (url !== lastUrl) {
    lastUrl = url
    onUrlChange()
  }
}).observe(document, { subtree: true, childList: true })

function onUrlChange() {
  setTimeout(() => {
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

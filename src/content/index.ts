import logger from '../utils/log'
import { TOC } from './toc'
import { loadTOC } from './load'

let toc: TOC
let cachedLoadPattern = '0'

;(async function () {
  // @ts-ignore
  const { loadPattern } = await chrome.storage.local.get(['loadPattern'])
  logger.info('content script load 前 获得到的用户配置', { loadPattern })
  cachedLoadPattern = loadPattern
  if (loadPattern === '0') return
  toc = loadTOC()
})()


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
    loadTOC()
  }, 200)
}

chrome.runtime.onMessage.addListener((command) => {
  logger.info('content script received command', command)
  if (!toc) {
    loadTOC()
  } else {
    toc.toggle()
  }
  return true
})

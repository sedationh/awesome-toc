import logger from '../utils/log'
import { extractArticle, extractTokenDOMs } from './preprocess'
import { createTOC, TOC } from './toc'

let toc: TOC

const start = async () => {
  const article = extractArticle()
  const tokenDOMs = extractTokenDOMs(article)

  logger.info({ article, tokenDOMs })
  if (!tokenDOMs?.length) {
    logger.info('there is no article / headings')
    return
  }
  if (toc) {
    toc.remove()
  }

  const { loadPattern } = await chrome.storage.local.get(['loadPattern'])
  logger.info('content script 插入过程中获得到的用户配置', { loadPattern })
  if (loadPattern === '0') return
  toc = createTOC(tokenDOMs, {})
  toc.show()
}

start()

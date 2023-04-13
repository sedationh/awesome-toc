import logger from "../utils/log"
import { extractArticle, extractTokenDOMs } from "./preprocess"
import { TOC } from "./toc"

export function loadTOC() {
  const article = extractArticle()
  const tokenDOMs = extractTokenDOMs(article)
  logger.info({ article, tokenDOMs })
  if (!tokenDOMs?.length) {
    logger.info('there is no article / headings')
  }

  return TOC.createTOC(tokenDOMs)
}

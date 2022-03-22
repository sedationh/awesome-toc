import { extractArticle, extractTokenDOMs } from "./preprocess"
import { createTOC, TOC } from "./toc"

let toc: TOC

const start = () => {
  const article = extractArticle()
  const tokenDOMs = extractTokenDOMs(article)
  console.log("sedationh", { article, tokenDOMs })
  if (!tokenDOMs?.length) {
    console.log("there is no article / headings")
    return
  }
  if (toc) {
    toc.remove()
  }
  toc = createTOC(tokenDOMs, {})
  toc.show()
}

start()

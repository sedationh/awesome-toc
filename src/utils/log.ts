import { isDev } from './env'

class Logger {
  info(...args) {
    if (!isDev) return
    console.log("[awesome-toc]",...args)
  }
}

const logger = new Logger()

export default logger

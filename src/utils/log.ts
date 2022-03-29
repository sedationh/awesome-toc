import { isDev } from './env'

class Logger {
  info(...args) {
    if (!isDev) return
    console.log(...args)
  }
}

const logger = new Logger()

export default logger

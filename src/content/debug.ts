const isDebugging = false

const log = (...args) => {
  if (!isDebugging) return
  console.log(...args)
}

export { log }

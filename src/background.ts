const loadPattern = '0'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ loadPattern })
  console.log(`Default background loadPattern set ${loadPattern}`)
})

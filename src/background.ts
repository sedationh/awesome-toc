import logger from './utils/log'

const loadPattern = '1'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ loadPattern })
  console.log(`Default background loadPattern set ${loadPattern}`)
})

const getCurrentTab = (cb) => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
    logger.info('getCurrentTab', activeTab)
    cb(activeTab)
  })
}

const execCommandOnCurrentTab = (command) => {
  logger.info('execCommandOnCurrentTab', command)
  getCurrentTab((tab) => {
    chrome.tabs.sendMessage(tab.id, command)
  })
}

// @ts-ignore
chrome.action.onClicked.addListener(() => {
  logger.info('用户点击 触发 toggle action')
  execCommandOnCurrentTab('toggle')
})

// @ts-ignore
chrome.action.setIcon({
  path: 'assets/icon-gray-16.png',
})

getCurrentTab((tab) => {
  chrome.runtime.onMessage.addListener(function (request) {
    if (request == 'show') {
      // @ts-ignore
      chrome.action.setIcon({
        tabId: tab.id,
        path: 'assets/icon-16.png',
      })
    } else if (request === 'hide') {
      // @ts-ignore
      chrome.action.setIcon({
        tabId: tab.id,
        path: 'assets/icon-gray-16.png',
      })
    }
    return true
  })
})

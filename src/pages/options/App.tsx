import React, { useEffect, useState } from 'react'

const App = () => {
  const [loadPattern, setLoadPattern] = useState('9')

  const handleLoadPatternChoice = async (newLoadPattern) => {
    await chrome.storage.local.set({ loadPattern: newLoadPattern })
    setLoadPattern(newLoadPattern)
  }

  useEffect(() => {
    chrome.storage.local.get(['loadPattern'], ({ loadPattern }) => {
      console.log(loadPattern)
      setLoadPattern(loadPattern)
    })
  }, [])

  return (
    <div className="container">
      <h1>Awesome TOC Options / 配置页面</h1>
      <h3>配置后需要刷新页面来启用</h3>
      <div className="section">
        <h2 className="title">Auto Load / 自动加载</h2>
        <div className="content">
          <label className="choice">
            <input
              type="radio"
              value="0"
              checked={loadPattern === '0'}
              onChange={(e) => handleLoadPatternChoice(e.target.value)}
            />
            Disable on All Page / 在所有页面禁用
          </label>
          <label className="choice">
            <input
              type="radio"
              value="1"
              checked={loadPattern === '1'}
              onChange={(e) => handleLoadPatternChoice(e.target.value)}
            />
            Enable on All Page / 在所有页面启用
          </label>
        </div>
      </div>
    </div>
  )
}

export default App

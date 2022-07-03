import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/">Home</Link> | <Link to="/invoices">Invoices</Link> |{' '}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default App

export function Expenses() {
  const [cnt, setCnt] = useState(0)
  useEffect(() => {
    setCnt(cnt + 1)
  }, [])
  return (
    <main style={{ padding: '1rem 0' }}>
      <h2 style={{ marginBottom: '100vh' }}>Expenses</h2>
      <h2 style={{ marginBottom: '100vh' }}>Expenses</h2>
      <h2 style={{ marginBottom: '100vh' }}>Expenses</h2>
      <h2 style={{ marginBottom: '100vh' }}>Expenses</h2>
    </main>
  )
}

export function Invoices() {
  return (
    <main style={{ padding: '1rem 0' }}>
      <h2 style={{ marginBottom: '100vh' }}>Invoices</h2>
      <h2 style={{ marginBottom: '100vh' }}>Invoices</h2>
      <h2 style={{ marginBottom: '100vh' }}>Invoices</h2>
    </main>
  )
}

let lastUrl = location.href
new MutationObserver((e) => {
  console.log(e)
  const url = location.href
  if (url !== lastUrl) {
    lastUrl = url
    onUrlChange()
  }
}).observe(document, { subtree: true, childList: true })

function onUrlChange() {
  console.log('URL changed!', location.href)
}

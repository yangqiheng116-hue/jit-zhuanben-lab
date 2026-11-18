import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import 'katex/dist/katex.min.css'
import './index.css'

const root = document.getElementById('root')
if (!root) throw new Error('找不到根节点')

createRoot(root).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Editor } from './editor/Editor'
import './index.css'

const isEditor = typeof window !== 'undefined' && window.location.pathname.replace(/\/$/, '') === '/rediger'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isEditor ? <Editor /> : <App />}
  </StrictMode>,
)

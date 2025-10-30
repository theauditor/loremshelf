import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Get initial data from SSR
const initialData = (window as any).__INITIAL_DATA__ || {}

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <BrowserRouter>
      <App initialData={initialData} />
    </BrowserRouter>
  </React.StrictMode>
)


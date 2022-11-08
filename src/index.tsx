import React from 'react'
import { HashRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'

import { App } from './components/App'
import { GlobalStyle } from './styles/globalStyles'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <HashRouter>
    <GlobalStyle />
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <App />
    </LocalizationProvider>
  </HashRouter>,
)

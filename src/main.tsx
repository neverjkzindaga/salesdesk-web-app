import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './ui/App'
import './ui/style.css'
import './ui/modern.css'
import './ui/operations.css'
import './ui/login.css'
import './ui/cash-colors.css'

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><QueryClientProvider client={new QueryClient({defaultOptions:{queries:{staleTime:0}}})}><BrowserRouter><App/></BrowserRouter></QueryClientProvider></React.StrictMode>)

import { createRoot } from 'react-dom/client'

import { AllProviders } from '@/app/all-providers'
import { Application } from './app'
import { StrictMode } from 'react'
import './tailwind/connect.css'

const container = document.getElementById('root') as HTMLElement

const root = createRoot(container)

root.render(
  <StrictMode>
    <AllProviders>
      <Application />
    </AllProviders>
  </StrictMode>
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.ts').then(
      registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope)
      },
      err => {
        console.log('ServiceWorker registration failed: ', err)
      }
    )
  })
}

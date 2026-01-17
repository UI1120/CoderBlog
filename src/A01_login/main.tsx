import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../globals.css'

async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
        return
    }

    const { worker } = await import('../mocks/browser')

    // Service Workerの起動待機
    return worker.start({
        onUnhandledRequest: 'bypass', // ハンドリングされていないリクエストはそのまま通す
    })
}

enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    )
})

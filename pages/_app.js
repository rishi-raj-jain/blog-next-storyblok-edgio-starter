import '@/styles/globals.css'
import { useEffect } from 'react'
import { install } from '@layer0/prefetch/window'
import installDevtools from '@layer0/devtools/install'

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    // Enable service worker inside the window
    install()
    // Enable devtools manually, instead of relying on defaults by Layer0
    installDevtools()
  }, [])
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#9a1ab1] via-[#004966] to-[#01B18D]">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp

import '@/styles/globals.css'
import { useEffect } from 'react'
import { install } from '@edgio/prefetch/window'
import installDevtools from '@edgio/devtools/install'

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    // Enable service worker inside the window
    install()
    // Enable devtools manually, instead of relying on defaults by Edgio
    installDevtools()
  }, [])
  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-[#9a1ab1] via-[#004966] to-[#01B18D]">
      <div className="flex w-full max-w-2xl flex-col items-start px-2">
        <Component {...pageProps} />
        <div className="w-full py-5"></div>
        <div className="flex flex-row space-x-2">
          <span className="text-gray-300">Author:</span>
          <a className="font-semibold text-white" target="_blank" href="https://linkedin.com/in/rishi-raj-jain">
            Rishi Raj Jain
          </a>
        </div>
        <div className="w-full py-5"></div>
      </div>
    </div>
  )
}

export default MyApp

import { Router } from '@layer0/core/router'
import { ASSET_CACHE_HANDLER, NEXT_CACHE_HANDLER } from './cache'

const router = new Router()
  .get(
    {
      headers: {
        // Regex to catch multiple hostnames
        // Any deployment will have a L0 permalink
        // Don't allow Google bot to crawl it, read more on:
        // https://docs.layer0.co/guides/cookbook#blocking-search-engine-crawlers
        host: /layer0.link|layer0-perma.link/,
      },
    },
    ({ setResponseHeader }) => {
      setResponseHeader('x-robots-tag', 'noindex')
    }
  )
  // Serve the old Layer0 predefined routes by the latest prefix
  .match('/__xdn__/:path*', ({ redirect }) => {
    redirect('/__layer0__/:path*', 301)
  })
  // Cache the Layer0 devtools css js and other assets served by L0 by default
  .match('/__layer0__/:path*', ({ cache }) => {
    cache({ edge: { maxAgeSeconds: 60 * 60 * 24 * 365 } })
  })
  // Serve the compiled service worker with Layer0 prefetcher working
  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('dist/service-worker.js')
  })
  // The data in Next.js comes through _next/data/project-build-id route.
  // For the route /product/product-slug, cache this SSR route's data
  // it on the edge so that can be prefetched
  .match('/_next/data/:path*', NEXT_CACHE_HANDLER)
  .match('/', NEXT_CACHE_HANDLER)
  .match('/blog/:slug', NEXT_CACHE_HANDLER)
  // Asset caching
  .match('/_next/static/:path*', ASSET_CACHE_HANDLER)
  // Use the default set of Next.js routes
  .fallback(({ renderWithApp }) => {
    renderWithApp()
  })

export default router

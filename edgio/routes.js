import { Router } from '@edgio/core/router'
import { ASSET_CACHE_HANDLER, NEXT_CACHE_HANDLER } from './cache'

const router = new Router()
  .noIndexPermalink()
  // Serve the old Edgio predefined routes by the latest prefix
  .match('/__(xdn|layer0)__/:path*', ({ redirect }) => {
    redirect('/__edgio__/:path*', 301)
  })
  // Serve the compiled service worker with Edgio prefetcher working
  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('dist/service-worker.js')
  })
  // The data in Next.js comes through _next/data/project-build-id route.
  // For the route /product/product-slug, cache this SSR route's data
  // it on the edge so that can be prefetched
  // Asset caching
  .match('/_next/data/:path*', NEXT_CACHE_HANDLER)
  .match('/_next/static/:path*', ASSET_CACHE_HANDLER)
  .match('/', NEXT_CACHE_HANDLER)
  .match('/blog/:slug', NEXT_CACHE_HANDLER)
  // Use the default set of Next.js routes
  .fallback(({ renderWithApp }) => {
    renderWithApp()
  })

export default router

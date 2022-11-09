import { Prefetcher } from '@edgio/prefetch/sw'
import { precacheAndRoute } from 'workbox-precaching'
import { skipWaiting, clientsClaim } from 'workbox-core'

skipWaiting()
clientsClaim()
precacheAndRoute(self.__WB_MANIFEST || [])

new Prefetcher()
  .route()
  // Cache the images coming from any route (including
  // cross-origin) assets that contains `.link` in it
  // Read more on caching cross-origin requests at
  // https://docs.edg.io/docs/api/prefetch/classes/_sw_prefetcher_.prefetcher.html#cache
  .cache(/^https:\/\/(.*?)\.com\/.*/)

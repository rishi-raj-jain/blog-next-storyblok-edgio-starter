export const ASSET_CACHE_HANDLER = ({ removeUpstreamResponseHeader, cache }) => {
  // Remove the cache-control header coming in from the Next.js app,
  // and remove the set-cookie header coming in from the Next.js app,
  // this is to ensure that the response is cacheable
  removeUpstreamResponseHeader('set-cookie')
  removeUpstreamResponseHeader('cache-control')
  // Set the caching values
  cache({
    edge: {
      // Save the response(s) [whether stale or updated] in the edge POP for a year
      maxAgeSeconds: 60 * 60 * 24 * 365,
    },
    browser: {
      // Don't save the response in the browser
      maxAgeSeconds: 0,
      // Save the response in the browser via Layer0 service worker
      serviceWorkerSeconds: 60 * 60 * 24,
    },
  })
}

export const NEXT_CACHE_HANDLER = ({ removeUpstreamResponseHeader, cache }) => {
  // Remove the cache-control header coming in from the Next.js app,
  // this is to ensure that the response is cacheable
  removeUpstreamResponseHeader('cache-control')
  // Set the caching values
  cache({
    browser: {
      // Don't save the response in the browser
      maxAgeSeconds: 0,
      // Save the response in the browser via Layer0 service worker
      serviceWorkerSeconds: 1,
    },
    edge: {
      // Save the response(s) [whether stale or updated] in the edge POP for a year
      maxAgeSeconds: 1,
      // Keep revalidating data per day, i.e. looking for content changes from the Next.js app
      // and update the response in edge
      // More on: https://web.dev/stale-while-revalidate
      // and https://docs.layer0.co/guides/caching#achieving-100-cache-hit-rates
      staleWhileRevalidateSeconds: 60 * 60 * 24,
    },
  })
}

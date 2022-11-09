const { build } = require('esbuild')
const { createDevServer } = require('@edgio/core/dev')

module.exports = function () {
  const appDir = process.cwd()
  build({
    entryPoints: [`${appDir}/sw/service-worker.js`],
    outfile: `${appDir}/dist/service-worker.js`,
    minify: true,
    bundle: true,
    define: {
      'process.env.NODE_ENV': '"production"',
      'process.env.EDGIO_PREFETCH_HEADER_VALUE': '"1"',
      'process.env.EDGIO_PREFETCH_CACHE_NAME': '"prefetch"',
    },
  })
  return createDevServer({
    label: 'Next.js Standalone',
    command: (port) => `PORT=${port} npm run dev`,
    ready: [/started server/i],
  })
}

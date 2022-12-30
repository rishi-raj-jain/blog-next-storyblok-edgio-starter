const { createDevServer } = require('@edgio/core/dev')

module.exports = function () {
  const appDir = process.cwd()
  const builder = new DeploymentBuilder(appDir)
  builder.buildServiceWorker(`${appDir}/sw/service-worker.js`, `${appDir}/dist/service-worker.js`, false)
  return createDevServer({
    label: 'Next.js Standalone',
    command: (port) => `PORT=${port} npm run dev`,
    ready: [/started server/i],
  })
}

const { join } = require('path')
const { exit } = require('process')
const { buildSync } = require('esbuild')
const { DeploymentBuilder } = require('@edgio/core/deploy')

const appDir = process.cwd()
const builder = new DeploymentBuilder(appDir)

module.exports = async function build(options) {
  try {
    builder.clearPreviousBuildOutput()
    let command = 'npm run build'
    await builder.exec(command)
    builder.addJSAsset(join(appDir, '.next', 'standalone'), 'dist')
    builder.addJSAsset(join(appDir, '.next', 'static'), join('dist', '.next', 'static'))
    buildSync({
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
    await builder.build()
  } catch (e) {
    console.log(e)
    exit()
  }
}

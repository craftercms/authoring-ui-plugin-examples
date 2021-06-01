import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import replace from 'rollup-plugin-replace-imports-with-vars'
import json from '@rollup/plugin-json'
import pkg from './package.json'
import copy from 'rollup-plugin-copy'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const globals = {
  jss: 'craftercms.libs.jss',
  react: 'craftercms.libs.React',
  'react-dom': 'craftercms.libs.ReactDOM',
  'react-intl': 'craftercms.libs.ReactIntl',
  '@material-ui/core': 'craftercms.libs.MaterialUI',
  '@craftercms/studio-ui': 'craftercms.libs.StudioUI'
}

export default {
  input: pkg.source,
  output: [
    // {
    //   name: 'sampleCrafterCMSPluginLibrary',
    //   file: pkg.umd,
    //   format: 'umd',
    //   amd: {
    //     define: 'craftercms.define'
    //   },
    //   globals
    // },
    {
      file: pkg.module,
      format: 'es',
      globals
    }
    // {
    //   file: pkg.main,
    //   format: 'cjs',
    //   globals,
    //   exports: 'auto'
    // }
  ],
  // If not using "rollup-plugin-peer-deps-external" plugin
  // external: Object.keys(globals),
  plugins: [
    external(),
    json(),
    typescript(),
    replace({ varType: 'var', replacementLookup: globals }),
    resolve({ extensions }),
    commonjs(),
    copy({
      targets: [
        {
          src: './dist/{script,index.modern,index}.{js,css}',
          dest:
            '/Users/rart/Workspace/craftercms/develop/crafter-authoring/data/repos/sites/editorial/sandbox/config/studio/plugins/apps/library'
        }
      ]
    })
  ]
}

import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import replaceImportsWithVars from 'rollup-plugin-replace-imports-with-vars'
import json from '@rollup/plugin-json'
import pkg from './package.json'
import copy from 'rollup-plugin-copy'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const globals = {
  jss: 'craftercms.libs.jss',
  react: 'craftercms.libs.React',
  '@emotion/css': 'craftercms.libs.EmotionCSS',
  '@emotion/css/create-instance': 'craftercms.libs.createEmotion',
  'react-dom': 'craftercms.libs.ReactDOM',
  'react-intl': 'craftercms.libs.ReactIntl',
  '@mui/material': 'craftercms.libs.MaterialUI',
  '@craftercms/studio-ui': 'craftercms.libs.StudioUI'
}

export default {
  input: pkg.source,
  output: [
    {
      file: pkg.module,
      format: 'es',
      globals
    }
  ],
  // If not using "rollup-plugin-peer-deps-external" plugin
  // external: Object.keys(globals),
  plugins: [
    external(),
    json(),
    typescript(),
    replaceImportsWithVars({ varType: 'var', replacementLookup: globals }),
    resolve({ extensions }),
    commonjs(),
    copy({
      targets: [
        {
          src: './src/{script,index}.{js,css}',
          dest: './dist'
        }
        // {
        //   src: './dist/{script,index.modern,index}.{js,css}',
        //   dest: '{pathToYourCrafterSite}/sandbox/config/studio/plugins/apps/library'
        // }
      ]
    })
  ]
}

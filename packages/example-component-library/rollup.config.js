import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replaceImportsWithVars from 'rollup-plugin-replace-imports-with-vars';
import json from '@rollup/plugin-json';
import pkg from './package.json';
import copy from 'rollup-plugin-copy';
import treeshaking from 'rollup-plugin-ts-treeshaking';
import replace from '@rollup/plugin-replace';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const globals = {
  react: 'craftercms.libs.React',
  rxjs: 'craftercms.libs.rxjs',
  'rxjs/operators': 'craftercms.libs.rxjs',
  '@emotion/css/create-instance': 'craftercms.libs.createEmotion',
  'react-dom': 'craftercms.libs.ReactDOM',
  'react-intl': 'craftercms.libs.ReactIntl',
  'react-redux': 'craftercms.libs.ReactRedux',
  '@mui/material': 'craftercms.libs.MaterialUI',
  '@craftercms/studio-ui': 'craftercms.components',
  '@craftercms/studio-ui/components': 'craftercms.components',
  '@mui/material/utils': 'craftercms.libs.MaterialUI',
  '@reduxjs/toolkit': 'craftercms.libs.ReduxToolkit'
};

const replacementRegExps = {
  '@craftercms/studio-ui/(components|icons|utils|services)/(.+)': (exec) =>
    `craftercms.${exec[1]}.${exec[2].split('/').pop()}`,
  '@mui/material/(.+)': (exec) => `craftercms.libs.MaterialUI.${exec[1]}`
};

export default {
  context: 'this',
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'es',
      globals
    }
  ],
  external: Object.keys(globals).concat(Object.keys(replacementRegExps).map((str) => new RegExp(str))),
  plugins: [
    json(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    typescript({
      tsconfigOverride: { compilerOptions: { declaration: false } }
    }),
    treeshaking(),
    replaceImportsWithVars({
      replacementLookup: globals,
      replacementRegExps
    }),
    resolve({ extensions }),
    commonjs(),
    copy({
      targets: [
        {
          src: './src/misc/{script,index}.{js,css}',
          dest: './dist'
        }
        // {
        //   src: './dist/{script,index.modern,index}.{js,css}',
        //   dest: '{pathToYourCrafterSite}/sandbox/config/studio/plugins/apps/library'
        // }
      ]
    })
  ]
};

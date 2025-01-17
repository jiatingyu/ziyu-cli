// rollup.config.js
const resolve = require('@rollup/plugin-node-resolve')
const babel = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('rollup-plugin-typescript2')
const { terser } = require('rollup-plugin-terser')

/** @type {import('rollup').RollupOptions} */
module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'es',
    },
  ],
  plugins: [
    resolve({ extensions: [ '.js'] }),
    commonjs(),
    typescript(),
    babel({ babelHelpers: 'bundled' }),
    terser(),
  ],
}

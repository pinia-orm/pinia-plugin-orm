import type { Options } from 'tsup'

export default <Options>{
  entryPoints: [
    'src/index.js',
  ],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
}

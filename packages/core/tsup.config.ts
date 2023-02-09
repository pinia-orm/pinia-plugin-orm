import type { Options } from 'tsup'

export default <Options>{
  entryPoints: [
    'src/*.js',
  ],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
}

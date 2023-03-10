import type { Options } from 'tsup'

export default <Options>{
  entryPoints: [
    'src/*.js',
    'src/**/*.js',
  ],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
}

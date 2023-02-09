import type { Options } from 'tsup'

export default <Options>{
  entryPoints: [
    'src/*.ts',
    'src/**/*.ts',
  ],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
}

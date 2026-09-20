import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.js',
    templates: 'src/index2.ts',
    registry: 'src/templates/registry.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  target: 'node18',
  splitting: false,
  treeshake: true,
});

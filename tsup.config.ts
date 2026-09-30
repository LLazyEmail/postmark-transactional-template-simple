import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
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

// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // -----------------------------------------------------------------------
    // Globals: `describe`, `it`, `expect` available without imports.
    // Jest had this on by default; Vitest does NOT. Turn it on so your
    // existing tests don't need `import { describe, it, expect } from 'vitest'`
    // added to every file.
    // -----------------------------------------------------------------------
    globals: true,

    // -----------------------------------------------------------------------
    // Environment. 'node' is correct for a template generator that
    // string-matches HTML. Switch to 'jsdom' or 'happy-dom' only if you
    // test browser-only code.
    // -----------------------------------------------------------------------
    environment: 'node',

    // -----------------------------------------------------------------------
    // Where tests live. Mirrors Jest's default and matches your
    // `tests/` directory.
    // -----------------------------------------------------------------------
    include: ['tests/**/*.{test,spec}.{js,ts}'],
    exclude: ['**/node_modules/**', '**/dist/**'],

    setupFiles: ['./tests/setup.ts'],
    typecheck: { enabled: true },

    // -----------------------------------------------------------------------
    // Coverage — only used when you run `npm run test:coverage`.
    // V8 provider is the default and is faster than Istanbul [citation:6].
    // -----------------------------------------------------------------------
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{js,ts}'],
      exclude: ['src/types/**', '**/*.d.ts'],
    },
  },
});
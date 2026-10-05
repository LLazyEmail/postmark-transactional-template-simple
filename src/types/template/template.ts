import type { ITemplate } from './iTemplate.ts';

/**
 * Convenience helper for declaring a typed template without repeating
 * the generic parameters. Identical to `ITemplate<Props>`.
 */
export type Template<Props> = ITemplate<Props>;

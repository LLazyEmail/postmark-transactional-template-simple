import type { ITemplate } from '../types/template.ts';

/**
 * One renderable template plus the metadata the registry and the CLI need.
 * Adding a template means exporting one of these and listing it in
 * `manifest.ts`. Do not also edit the registry or the generator catalog.
 */
export interface DefinedTemplate<Props> extends ITemplate<Props> {
  /** Id passed to `renderTemplate` and used as the generated filename stem. */
  readonly id: string;
  /** Extra lookup keys (legacy kebab-case aliases, short names). */
  readonly aliases: readonly string[];
  /** Source filename under `src/templates/`, for the generator file listing. */
  readonly file: string;
  /** Named export the module is known by. */
  readonly exportName: string;
  /** Payload the CLI uses when no `--data` file is passed. */
  readonly sample: Props;
}

export interface TemplateRegistration {
  readonly id: string;
  readonly name: string;
  readonly aliases: readonly string[];
  readonly file: string;
  readonly exportName: string;
  readonly sample: unknown;
  render(props: any): string;
}

export function defineTemplate<Props>(config: {
  id: string;
  name: string;
  aliases?: readonly string[];
  file: string;
  exportName: string;
  sample: Props;
  render: (props: Props) => string;
}): DefinedTemplate<Props> {
  return {
    id: config.id,
    name: config.name,
    aliases: config.aliases ?? [],
    file: config.file,
    exportName: config.exportName,
    sample: config.sample,
    render: config.render,
  };
}

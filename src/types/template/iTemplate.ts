import type { HtmlString } from './htmlString.ts';

/**
 * The object shape every typed template implements.
 * `name` doubles as the template's canonical registry ID.
 */
export interface ITemplate<Props> {
  readonly name: string;
  render(props: Props): HtmlString;
}

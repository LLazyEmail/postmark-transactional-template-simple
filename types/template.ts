export interface ITemplate<Props> {
  name: string;
  render(props: Props): string;
}

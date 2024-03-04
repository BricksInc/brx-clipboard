export interface ClipboardPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}

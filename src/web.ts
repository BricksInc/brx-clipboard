import { WebPlugin } from '@capacitor/core';

import type { ClipboardPlugin } from './definitions';

export class ClipboardWeb extends WebPlugin implements ClipboardPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}

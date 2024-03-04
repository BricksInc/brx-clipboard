import { WebPlugin } from '@capacitor/core';

import type { ClipboardPlugin, ReadResult, WriteOptions } from './definitions';

declare global {
  interface Clipboard {
    read(): Promise<any>;
    write(data: any[]): Promise<any>;
  }
}

declare let ClipboardItem: any;

export class ClipboardWeb extends WebPlugin implements ClipboardPlugin {
  async write(options: WriteOptions): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      throw this.unavailable('Clipboard API not available in this browser');
    }

    if (options.html !== undefined) {
      await this.writeHTML(options.html, options.text ?? '');
    } else if (options.text !== undefined) {
      await this.writeText(options.text);
    } else if (options.url !== undefined) {
      await this.writeText(options.url);
    } else if (options.image !== undefined) {
      await this.writeImage(options.image);
    } else {
      throw new Error('Nothing to write');
    }
  }

  async read(): Promise<ReadResult> {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      throw this.unavailable('Clipboard API not available in this browser');
    }

    if (typeof ClipboardItem !== 'undefined') {
      try {
        const clipboardItems = await navigator.clipboard.read();
        const blobs: { type: string, blob: string }[] = [];
        for (const type of clipboardItems[0].types) {
          const clipboardBlob = await clipboardItems[0].getType(type);
          const blob = await this._getBlobData(clipboardBlob, type);
          blobs.push({ type, blob });
        }

        if (blobs.length === 0) {
          return this.readText();
        }

        const htmlBlob = blobs.find(({ type }) => type === 'text/html')?.blob;
        const textBlob = blobs.find(({ type }) => type === 'text/plain')?.blob;

        if (htmlBlob !== undefined) {
          return { type: 'text/html', value: htmlBlob, text: textBlob ?? '' };
        } else if (textBlob !== undefined) {
          return { type: 'text/plain', value: textBlob, text: textBlob };
        } else {
          return { type: blobs[0].type, value: blobs[0].blob, text: '' };
        }
      } catch (err) {
        return this.readText();
      }
    } else {
      return this.readText();
    }
  }

  private async readText(): Promise<ReadResult> {
    if (
      typeof navigator === 'undefined' ||
      !navigator.clipboard ||
      !navigator.clipboard.readText
    ) {
      throw this.unavailable(
        'Reading from clipboard not supported in this browser',
      );
    }

    const text = await navigator.clipboard.readText();
    return { type: 'text/plain', value: text, text };
  }

  private async writeHTML(html: string, text: string) {
    if (
      typeof navigator === 'undefined' ||
      !navigator.clipboard ||
      !navigator.clipboard.write
    ) {
      throw this.unavailable(
        'Writting to clipboard not supported in this browser',
      );
    } else {
      try {
        const clipboardItemInput = new ClipboardItem({ ['text/html']: html, ['text/plain']: text });
        await navigator.clipboard.write([clipboardItemInput]);
      } catch (err) {
        throw new Error('Failed to write html');
      }
    }
  }

  private async writeImage(image: string) {
    if (
      typeof navigator === 'undefined' ||
      !navigator.clipboard ||
      !navigator.clipboard.write
    ) {
      throw this.unavailable(
        'Writting to clipboard not supported in this browser',
      );
    } else {
      try {
        const blob = await (await fetch(image)).blob();
        const clipboardItemInput = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([clipboardItemInput]);
      } catch (err) {
        throw new Error('Failed to write html');
      }
    }
  }

  private async writeText(text: string) {
    if (
      typeof navigator === 'undefined' ||
      !navigator.clipboard ||
      !navigator.clipboard.writeText
    ) {
      throw this.unavailable(
        'Writting to clipboard not supported in this browser',
      );
    }

    await navigator.clipboard.writeText(text);
  }

  private _getBlobData(clipboardBlob: Blob, type: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      if (type.includes('image')) {
        reader.readAsDataURL(clipboardBlob);
      } else {
        reader.readAsText(clipboardBlob);
      }
      reader.onloadend = () => {
        const r = reader.result as string;
        resolve(r);
      };
      reader.onerror = e => {
        reject(e);
      };
    });
  }
}
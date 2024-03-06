import { WebPlugin } from '@capacitor/core';
import type { ClipboardPlugin, ReadResult, WriteOptions } from './definitions';
declare global {
    interface Clipboard {
        read(): Promise<any>;
        write(data: any[]): Promise<any>;
    }
}
export declare class ClipboardWeb extends WebPlugin implements ClipboardPlugin {
    write(options: WriteOptions): Promise<void>;
    read(): Promise<ReadResult>;
    private readText;
    private writeHTML;
    private writeImage;
    private writeText;
    private _getBlobData;
}

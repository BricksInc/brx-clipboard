import { WebPlugin } from '@capacitor/core';
export class ClipboardWeb extends WebPlugin {
    async write(options) {
        var _a;
        if (typeof navigator === 'undefined' || !navigator.clipboard) {
            throw this.unavailable('Clipboard API not available in this browser');
        }
        if (options.html !== undefined) {
            await this.writeHTML(options.html, (_a = options.text) !== null && _a !== void 0 ? _a : '');
        }
        else if (options.text !== undefined) {
            await this.writeText(options.text);
        }
        else if (options.url !== undefined) {
            await this.writeText(options.url);
        }
        else if (options.image !== undefined) {
            await this.writeImage(options.image);
        }
        else {
            throw new Error('Nothing to write');
        }
    }
    async read() {
        var _a, _b;
        if (typeof navigator === 'undefined' || !navigator.clipboard) {
            throw this.unavailable('Clipboard API not available in this browser');
        }
        if (typeof ClipboardItem !== 'undefined') {
            try {
                const clipboardItems = await navigator.clipboard.read();
                const blobs = [];
                for (const type of clipboardItems[0].types) {
                    const clipboardBlob = await clipboardItems[0].getType(type);
                    const blob = await this._getBlobData(clipboardBlob, type);
                    blobs.push({ type, blob });
                }
                if (blobs.length === 0) {
                    return this.readText();
                }
                const htmlBlob = (_a = blobs.find(({ type }) => type === 'text/html')) === null || _a === void 0 ? void 0 : _a.blob;
                const textBlob = (_b = blobs.find(({ type }) => type === 'text/plain')) === null || _b === void 0 ? void 0 : _b.blob;
                if (htmlBlob !== undefined) {
                    return { type: 'text/html', value: htmlBlob, text: textBlob !== null && textBlob !== void 0 ? textBlob : '' };
                }
                else if (textBlob !== undefined) {
                    return { type: 'text/plain', value: textBlob, text: textBlob };
                }
                else {
                    return { type: blobs[0].type, value: blobs[0].blob, text: '' };
                }
            }
            catch (err) {
                return this.readText();
            }
        }
        else {
            return this.readText();
        }
    }
    async readText() {
        if (typeof navigator === 'undefined' ||
            !navigator.clipboard ||
            !navigator.clipboard.readText) {
            throw this.unavailable('Reading from clipboard not supported in this browser');
        }
        const text = await navigator.clipboard.readText();
        return { type: 'text/plain', value: text, text };
    }
    async writeHTML(html, text) {
        if (typeof navigator === 'undefined' ||
            !navigator.clipboard ||
            !navigator.clipboard.write) {
            throw this.unavailable('Writting to clipboard not supported in this browser');
        }
        else {
            try {
                const clipboardItemInput = new ClipboardItem({ ['text/html']: html, ['text/plain']: text });
                await navigator.clipboard.write([clipboardItemInput]);
            }
            catch (err) {
                throw new Error('Failed to write html');
            }
        }
    }
    async writeImage(image) {
        if (typeof navigator === 'undefined' ||
            !navigator.clipboard ||
            !navigator.clipboard.write) {
            throw this.unavailable('Writting to clipboard not supported in this browser');
        }
        else {
            try {
                const blob = await (await fetch(image)).blob();
                const clipboardItemInput = new ClipboardItem({ [blob.type]: blob });
                await navigator.clipboard.write([clipboardItemInput]);
            }
            catch (err) {
                throw new Error('Failed to write html');
            }
        }
    }
    async writeText(text) {
        if (typeof navigator === 'undefined' ||
            !navigator.clipboard ||
            !navigator.clipboard.writeText) {
            throw this.unavailable('Writting to clipboard not supported in this browser');
        }
        await navigator.clipboard.writeText(text);
    }
    _getBlobData(clipboardBlob, type) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            if (type.includes('image')) {
                reader.readAsDataURL(clipboardBlob);
            }
            else {
                reader.readAsText(clipboardBlob);
            }
            reader.onloadend = () => {
                const r = reader.result;
                resolve(r);
            };
            reader.onerror = e => {
                reject(e);
            };
        });
    }
}
//# sourceMappingURL=web.js.map
import { extractChunks } from "./deps.js";
export class PromptLoader {
    constructor(exif) {
        Object.defineProperty(this, "file", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "chunks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "exif", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "loadFile", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (file) => {
                this.file = file;
                this.chunks = extractChunks(new Uint8Array(await file.arrayBuffer()));
            }
        });
        this.exif = exif;
    }
}

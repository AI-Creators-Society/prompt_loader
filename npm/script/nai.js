"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAIPromptLoader = exports.NAISoftwareName = void 0;
const deps_js_1 = require("./deps.js");
const NAIExifTag = ["Title", "Description", "Software", "Source", "Comment"];
exports.NAISoftwareName = "NovelAI";
class NAIPromptLoader {
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
                this.chunks = (0, deps_js_1.extractChunks)(new Uint8Array(await file.arrayBuffer()));
            }
        });
        Object.defineProperty(this, "getPrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const decoded = this.chunks
                    .map((chunk) => (0, deps_js_1.decodeChunk)(chunk))
                    .filter((chunk) => {
                    return NAIExifTag.some((tag) => tag === chunk.keyword);
                });
                const positive = decoded.find((chunk) => chunk.keyword === "Description")?.text;
                const comment = this.exif.Comment;
                if (!comment) {
                    throw new Error("Comment chunk not found");
                }
                const meta = JSON.parse(comment);
                if (!positive) {
                    throw new Error("Description chunk not found");
                }
                const metaInfo = {
                    positive: positive ?? "",
                    negative: meta.uc,
                    size: {
                        width: this.exif.ImageWidth,
                        height: this.exif.ImageHeight,
                    },
                    seed: meta.seed,
                    steps: meta.steps,
                    scale: meta.scale,
                    strength: meta.strength,
                    noise: meta.noise,
                    samplingAlgorithm: meta.sampler,
                };
                return metaInfo;
            }
        });
        this.exif = exif;
    }
}
exports.NAIPromptLoader = NAIPromptLoader;

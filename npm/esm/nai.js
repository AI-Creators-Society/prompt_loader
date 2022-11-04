import { extractChunks, decodeChunk } from "./deps.js";
const NAIExifTag = ["Title", "Description", "Software", "Source", "Comment"];
export const NAISoftwareName = "NovelAI";
export class NAIPromptLoader {
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
        Object.defineProperty(this, "getPrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const decoded = this.chunks
                    .map((chunk) => decodeChunk(chunk))
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

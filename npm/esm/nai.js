import { decodeChunk } from "./deps.js";
import { PromptLoader } from "./prompt.js";
const NAIExifTag = ["Title", "Description", "Software", "Source", "Comment"];
export const NAISoftwareName = "NovelAI";
export class NAIPromptLoader extends PromptLoader {
    constructor() {
        super(...arguments);
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
                if (!positive) {
                    throw new Error("Description chunk not found");
                }
                const comment = decoded.find((chunk) => chunk.keyword === "Comment")?.text;
                if (!comment) {
                    throw new Error("Comment chunk not found");
                }
                const meta = JSON.parse(comment);
                const metaInfo = {
                    model: NAISoftwareName,
                    source: this.exif.Source,
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
    }
}

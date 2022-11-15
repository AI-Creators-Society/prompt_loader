import { decodeChunk } from "./deps.js";
import { PromptLoader } from "./prompt.js";
const WebUIExifTag = ["parameters"];
export class WebUIPromptLoader extends PromptLoader {
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
                    return WebUIExifTag.some((tag) => tag === chunk.keyword);
                });
                const parametersText = decoded.find((chunk) => chunk.keyword === "parameters")?.text;
                if (!parametersText) {
                    throw new Error("parameters chunk not found");
                }
                const configs = new Map();
                const lines = parametersText.split("\n");
                const positive = lines[0];
                const negative = lines[1].split(": ")[1];
                lines
                    .slice(2)
                    .map((l) => l.split(", "))
                    .flat()
                    .forEach((line) => {
                    const [key, value] = line.split(": ");
                    configs.set(key, value);
                });
                // console.log(configs)
                const metaInfo = {
                    raw: parametersText,
                    model: configs.get("Model") ?? "Unknown",
                    source: configs.get("Model hash"),
                    positive: positive ?? "",
                    negative: negative ?? "",
                    size: {
                        width: this.exif.ImageWidth,
                        height: this.exif.ImageHeight,
                    },
                    seed: parseInt(configs.get("Seed")),
                    steps: parseInt(configs.get("Steps")),
                    scale: parseFloat(configs.get("CFG scale")),
                    samplingAlgorithm: configs.get("Sampler"),
                    clipSkip: parseInt(configs.get("Clip skip")),
                };
                return metaInfo;
            }
        });
    }
}

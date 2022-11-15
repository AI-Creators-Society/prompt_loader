import { decodeChunk, Chunk } from "./deps.ts"
import { Prompt, PromptLoader } from "./prompt.ts"

const WebUIExifTag = ["parameters"]
export type WebUIExifTagType = typeof WebUIExifTag[number]

export interface WebUIPrompt extends Prompt {
    clipSkip?: number
}

export interface WebUIChunk extends Chunk {
    keyword: WebUIExifTagType
    text: string
}

export class WebUIPromptLoader extends PromptLoader {
    getPrompt = (): WebUIPrompt => {
        const decoded = this.chunks
            .map((chunk) => decodeChunk(chunk))
            .filter((chunk): chunk is WebUIChunk => {
                return WebUIExifTag.some((tag) => tag === chunk.keyword)
            })

        const parametersText = decoded.find((chunk) => chunk.keyword === "parameters")?.text
        if (!parametersText) {
            throw new Error("parameters chunk not found")
        }

        const configs = new Map<string, string>()

        const lines = parametersText.split("\n")
        const positive = lines[0]
        const negative = lines[1].split(": ")[1]
        lines
            .slice(2)
            .map((l) => l.split(", "))
            .flat()
            .forEach((line) => {
                const [key, value] = line.split(": ")
                configs.set(key, value)
            })

        // console.log(configs)

        const metaInfo: WebUIPrompt = {
            raw: parametersText,
            model: configs.get("Model")! ?? "Unknown",
            source: configs.get("Model hash")!,
            positive: positive ?? "",
            negative: negative ?? "",
            size: {
                width: this.exif.ImageWidth,
                height: this.exif.ImageHeight,
            },
            seed: parseInt(configs.get("Seed")!),
            steps: parseInt(configs.get("Steps")!),
            scale: parseFloat(configs.get("CFG scale")!),
            samplingAlgorithm: configs.get("Sampler")!,
            clipSkip: parseInt(configs.get("Clip skip")!),
        }

        return metaInfo
    }
}

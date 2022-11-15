import { Chunk, extractChunks } from "./deps.ts"

export type ModelName = "NovelAI" | "Unknown" | string // TODO: add more

export interface Prompt extends Record<string, unknown> {
    model: ModelName
    // model hash
    source: string
    positive: string
    negative: string
    size: {
        width: number
        height: number
    }
    seed: number
    steps: number
    scale: number
    samplingAlgorithm: string
}

export class PromptLoader {
    file!: File
    chunks!: Chunk[]
    exif: any

    constructor(exif: any) {
        this.exif = exif
    }

    loadFile = async (file: File) => {
        this.file = file
        this.chunks = extractChunks(new Uint8Array(await file.arrayBuffer()))
    }
}
